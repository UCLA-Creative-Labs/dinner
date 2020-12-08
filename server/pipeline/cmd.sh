#!/bin/bash

error() {
  printf "\e[91;5;81m$@\e[0m\n"
}

success() {
  printf "\e[32;5;81m$@\e[0m\n"
}

timestamp() {
  date +"%T"
}

branch=$1

# check if a branch was passed as parameter and if not it makes the main as the default branch
check_branch() {
  if [[ $branch ]]; then
    printf "Branch to sync to is set to ${branch}\n"
  else
    error "Branch to sync to not supplied, using *main* as the default branch to sync\n"
    branch="main"
  fi
}

sync() {
  printf "Fetching updates...\n"
  git fetch origin
  if [ $? -eq 0 ]; then
    success "Merging updates with ${branch}\n"
    echo ">> NEW BUILD $(timestamp) <<" >> log/master.log
    cat log/server.log >> log/master.log
    git merge origin/$branch
  else
    error "Something broke with the command `git fetch origin`"
  fi
}

check_branch
sync