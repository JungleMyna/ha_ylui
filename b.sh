#!/bin/bash
#--------------------------------------------
# 发布到指定文件夹
#--------------------------------------------
git pull

dirname="/home/www/ylui/"
rm -rf $dirname
mkdir $dirname
cp -r ./build/* $dirname

echo 'success'