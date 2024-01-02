 #!/usr/bin/env bash
 # exit on error
 set -o errexit

 npm install --prefix client && npm run build --prefix client

 bundle install
 bundle exec rake db:migrate