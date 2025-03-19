class TransitionFromClerkToDevise < ActiveRecord::Migration[7.1]
  def up
    # First, add the email column
    add_column :users, :email, :string

    # Then ensure all users have a unique email
    User.find_each do |user|
      if user.email.blank?
        # Generate a unique email based on clerk_user_id
        base_email = "#{user.clerk_user_id}@temp-migration.com"
        email = base_email
        counter = 1
        while User.exists?(email: email)
          email = "#{user.clerk_user_id}#{counter}@temp-migration.com"
          counter += 1
        end
        user.update_column(:email, email)
      end
    end

    # Make email required and unique
    change_column_null :users, :email, false
    add_index :users, :email, unique: true

    # Set a default password for existing users
    User.find_each do |user|
      user.update_column(:encrypted_password, BCrypt::Password.create('changeme123'))
    end

    # Remove clerk_user_id column
    remove_column :users, :clerk_user_id
  end

  def down
    # Add back clerk_user_id
    add_column :users, :clerk_user_id, :string
  end
end
