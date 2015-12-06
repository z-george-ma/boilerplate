#!/bin/sh

# A POSIX variable
OPTIND=1         # Reset in case getopts has been used previously in the shell.

function show_help() {
  cat <<EOF
Usage: $(basename $0) [options] [ -p project_name ] [ -d docker_image_name ] output_directory

Options:
  -h        show this help
  -p        set project name
EOF
}

# Initialize our own variables:
project_name=""

while getopts "h?p:" opt; do
    case "$opt" in
    h|\?)
        show_help
        exit 0
        ;;
    p)  project_name=$OPTARG
        ;;
    esac
done

shift $((OPTIND-1))

[ "$1" = "--" ] && shift

output_directory=$1

if [ -d $output_directory ]; then
  echo "Output directory already exists!" 1>&2
  exit -1
fi

cp -a $(dirname $0)/node-api-ts $output_directory
git init $output_directory
pushd $output_directory > /dev/null

cat <<EOF > package.json
{
  "name": "$project_name",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "build": "gulp build",
    "test": "gulp test",
    "prestart": "npm run build",
    "start": "NODE_ENV=production node dist/app"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "del": ">=2.0.2",
    "gulp": ">=3.9.0",
    "gulp-babel": "^5.2.1",
    "gulp-jasmine": "^2.1.0",
    "gulp-tsc": ">=1.1.1",
    "jasmine-spec-reporter": ">=2.4.0",
    "yargs": ">=3.27.0"
  },
  "dependencies": {
    "babel-runtime": "^5.8.34",
    "restify": ">=4.0.3"
  },
  "private": true
}
EOF

popd > /dev/null
