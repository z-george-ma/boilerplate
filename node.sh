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

cp -a $(dirname $0)/node $output_directory
git init $output_directory
pushd $output_directory > /dev/null

cat <<EOF > package.json
{
  "name": "$project_name",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "test": "node ./node_modules/mocha/bin/mocha -R spec",
    "start": "node ./app.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "mocha": "*",
    "should": "*"
  },
  "dependencies": {
  },
  "private": true
}
EOF

popd > /dev/null

