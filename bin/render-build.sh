 #!/usr/bin/env bash
 # exit on error
 set -o errexit

 cd client
 npm install --prefix client && npm run build --prefix client
 cd ..

 bundle install
 bundle exec rake db:migrate