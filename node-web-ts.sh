#!/bin/sh

# A POSIX variable
OPTIND=1         # Reset in case getopts has been used previously in the shell.

function show_help() {
  cat <<EOF
Usage: $(basename $0) [options] [ -p project_name ] output_directory

Options:
  -h        show this help
  -p        set project name
EOF
}

# Initialize our own variables:
project_name=""

if [ "$#" -lt 1 ]; then
    show_help
    exit 0
fi

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

cp -a $(dirname $0)/node-web-ts $output_directory
git init $output_directory
pushd $output_directory > /dev/null

cat <<EOF > package.json
{
  "name": "$project_name",
  "version": "1.0.0",
  "description": "",
  "scripts": {},
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browserify": "^11.2.0",
    "del": "^2.0.2",
    "gulp": "^3.9.0",
    "gulp-minify-css": "^1.2.1",
    "gulp-rename": "^1.2.2",
    "gulp-replace": "^0.5.4",
    "gulp-sass": "^2.0.4",
    "gulp-uglify": "^1.4.1",
    "jasmine-node": "*",
    "tsify": "^0.12.2",
    "vinyl-source-stream": "^1.1.0"
  },
  "dependencies": {
    "react": "^0.13.3",
    "react-bootstrap": "^0.25.2"
  },
  "private": true
}
EOF

cat <<EOF > bower.json
{
  "name": "$project_name",
  "version": "1.0.0",
  "authors": [],
  "license": "MIT",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
  "dependencies": {
    "bootstrap-sass": "~3.3.5"
  }
}
EOF

popd > /dev/null
