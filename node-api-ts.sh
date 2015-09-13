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
output_directory="output"

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

cp -a $(dirname $0)/node-api-ts $output_directory
git init $output_directory
pushd $output_directory > /dev/null

cat <<EOF > package.json
{
  "name": "$project_name",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "build": "rm -rf build && tsc --removeComments --module commonjs --outDir build src/app.ts",
    "build-test": "rm -rf build-test && tsc --removeComments --module commonjs --outDir build-test src/test/*",
    "pretest": "npm run build-test",
    "test": "./node_modules/jasmine-node/bin/jasmine-node --verbose build-test/",
    "prestart": "npm run build",
    "start": "NODE_ENV=production node build/app"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jasmine-node": "*"
  },
  "dependencies": {
    "express": "*"
  },
  "private": true
}
EOF

popd > /dev/null

