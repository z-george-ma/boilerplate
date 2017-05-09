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

cp -a $(dirname $0)/node-ts $output_directory
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
    "pretest": "npm run build",
    "test": "jasmine JASMINE_CONFIG_PATH=jasmine.json",
    "prestart": "npm run build && npm run test",
    "start": "node dist/app",
    "postinstall": "npm run typings",
    "typings": "cd src && node ../node_modules/typings/dist/bin.js install"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jasmine": "^2.5.2",
    "typings": "^2.1.1"
  },
  "dependencies": {
  },
  "private": true
}
EOF

popd > /dev/null
