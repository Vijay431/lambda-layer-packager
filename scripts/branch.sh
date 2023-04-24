#!/bin/bash env

readonly source_branch=$1
dest_branch="master"
if [[ $source_branch == "dev" || $source_branch == *"support"* || $source_branch == *"hotfix"* ]]; then
  dest_branch="master"
else
  dest_branch="release"
fi
echo $dest_branch

# call this in build script -> a_value=$(./script_a.bash 3)
