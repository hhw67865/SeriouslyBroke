Clerk.configure do |c|
  c.middleware_cache_store = Rails.cache # if omitted: no caching
end
