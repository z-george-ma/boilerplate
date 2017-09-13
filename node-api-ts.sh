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

cp -a $(dirname $0)/node-api-ts $output_directory
git init $output_directory
pushd $output_directory > /dev/null

cat <<EOF > package.json
{
  "name": "$project_name",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "prebuild": "rm -rf ./dist",
    "build": "tsc",
    "test": "jasmine JASMINE_CONFIG_PATH=jasmine.json",
    "watch:build": "tsc -w",
    "watch:start": "nodemon --watch dist --exec \"npm run test && node dist/app\"",
    "watch": "parallelshell \"npm run watch:start\" \"npm run watch:build\"",
    "prestart": "npm run build && npm run test",
    "start": "node dist/app"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "hippie": "^0.4.0",
    "jasmine": "^2.7.0",
    "nodemon": "^1.11.0",
    "parallelshell": "^3.0.1",
    "typings": "^2.1.1"
  },
  "dependencies": {
    "restify": "^4.3.0",
    "@types/jasmine": "^2.5.54",
    "@types/node": "^8.0.28"
  },
  "private": true
}
EOF

popd > /dev/null
