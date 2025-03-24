#!/bin/zsh

DIR_NAME=web-speed-hackathon-2025
USERNAME=root
GIT_USERNAME="your name"
GIT_USEREMAIL="your email address"

echo "Settings"
# os
sudo chown -R ${USERNAME}:${USERNAME} /workspaces/${DIR_NAME}
sudo chsh -s /usr/bin/zsh ${USERNAME}
# date
sudo cp /etc/localtime /etc/localtime.org
sudo ln -sf  /usr/share/zoneinfo/Asia/Tokyo /etc/localtime
strings /etc/localtime
# git
git config --global init.defaultBranch main
git config --global core.ignorecase false
git config --global user.name ${GIT_USERNAME}
git config --global user.email ${GIT_USEREMAIL}

echo "Install packages"
# node
npm i -g corepack pnpm
corepack enable pnpm
corepack use pnpm@latest
pnpm install
pnpm --filter "@wsh-2025/test" exec playwright install chromium
pnpm exec playwright install chrome
pnpm exec playwright install-deps