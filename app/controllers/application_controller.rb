class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include ActionController::HttpAuthentication::Token::ControllerMethods
  respond_to :json
  
  before_action :authenticate_user!

  private

  def authenticate_user!
    if request.headers['Authorization'].present?
      authenticate_or_request_with_http_token do |token|
        begin
          jwt_payload = JWT.decode(token, Rails.application.credentials.secret_key_base).first
          @current_user = User.find(jwt_payload['sub'])
        rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
          head :unauthorized
        end
      end
    else
      head :unauthorized
    end
  end

  def current_user
    @current_user
  end
end
