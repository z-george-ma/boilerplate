#!/bin/sh

function show_help() {
  cat <<EOF
Usage: $(basename $0) [options] [ -p project_name ] output_directory

Options:
  -h        show this help
  -p        set project name
  -g        run git init in output_directory
EOF
}

# Initialise variables:
project_name=''
output_directory=''
git_init=0

# main
if [ "$#" -lt 1 ]; then
    show_help
    exit 0
fi

filename=$(basename -- "$0")
template_path="$(dirname -- $0)/${filename%.*}"

# A POSIX variable
OPTIND=1         # Reset in case getopts has been used previously in the shell.

while getopts "h?gp:" opt; do
    case "$opt" in
    h|\?)
        show_help
        exit 0
        ;;
    g)  git_init=1
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

cp -a $template_path $output_directory
export project_name
envsubst < $template_path/package.json > $output_directory/package.json

[ $git_init -eq 1 ] && git init $output_directory