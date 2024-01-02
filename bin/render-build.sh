 #!/usr/bin/env bash
 # exit on error
 set -o errexit

 cd client
 bun install && bun run build
 cd ..

 bundle install
 bundle exec rake db:migrate