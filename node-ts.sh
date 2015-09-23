#!/bin/sh

# A POSIX variable
OPTIND=1         # Reset in case getopts has been used previously in the shell.

function show_help() {
  cat <<EOF
Usage: $(basename $0) [options] [ -p project_name ] [ -d docker_image_name ] output_directory

Options:
  -h        show this help
  -p        set project name
  -d        set docker image name
EOF
}

# Initialize our own variables:
project_name=""
docker_image_name=""

while getopts "h?p:d:" opt; do
    case "$opt" in
    h|\?)
        show_help
        exit 0
        ;;
    p)  project_name=$OPTARG
        ;;
    d)  docker_image_name=$OPTARG
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
    "build": "rm -rf build && tsc --removeComments --module commonjs --outDir build src/app.ts",
    "build-test": "rm -rf build-test && tsc --removeComments --module commonjs --outDir build-test src/test/*",
    "pretest": "npm run build-test",
    "test": "./node_modules/jasmine-node/bin/jasmine-node --verbose build-test/",
    "predocker-build": "npm run build",
    "docker-build": "cp Dockerfile package.json build/ && sh docker-build.sh -d build $docker_image_name",
    "docker-push": "docker push $docker_image_name:latest",
    "docker-run": "docker run $docker_image_name",
    "prestart": "npm run build",
    "start": "NODE_ENV=production node build/app"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jasmine-node": "*"
  },
  "dependencies": {
  },
  "private": true
}
EOF

popd > /dev/null
