#!/bin/sh

# A POSIX variable
OPTIND=1         # Reset in case getopts has been used previously in the shell.

function show_help() {
  cat <<EOF
Usage: $(basename $0) [options] [ -p project_name ] [ -o output_directory ]

Options:
  -h        show this help
  -p        set project name
  -o        output directory
EOF
}

# Initialize our own variables:
project_name=""
output_directory="node-api"

while getopts "h?p:o:" opt; do
    case "$opt" in
    h|\?)
        show_help
        exit 0
        ;;
    p)  project_name=$OPTARG
        ;;
    o)  output_directory=$OPTARG
        ;;
    esac
done

shift $((OPTIND-1))

[ "$1" = "--" ] && shift

if [ -d $output_directory ]; then
  echo "Output directory already exists!" 1>&2
  exit -1
fi

mkdir -p $output_directory
git init $output_directory
tar zxf $(dirname $0)/node-api.tar.gz -C $output_directory
pushd $output_directory > /dev/null

cat <<EOF > package.json
{
  "name": "$project_name",
  "version": "0.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "node ./node_modules/mocha/bin/mocha -R spec",
    "start": "node ./app.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "mocha": "^2.2.5",
    "should": "^6.0.3"
  },
  "dependencies": {
    "config-node": "^1.2.2",
    "express": "^4.12.4"
  },
  "private": true
}
EOF

popd > /dev/null

