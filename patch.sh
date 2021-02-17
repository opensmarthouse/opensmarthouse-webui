#!/bin/bash

refactor() {
   sed -i'.original.diff' "s,$2,$3,g" $1
}

check=0

for arg in "$@"
do
    case "$arg" in
    -check)    check=1
            ;;
    esac
done

# Extract the commit title
title=$(sed '4q;d' $1)
title=${title##*]}

# Extract the openHAB commit reference
commit=$(sed '1q;d' $1)
commit=${commit:5}
commit=${commit:0:40}

# author
author=$(sed '2q;d' $1)
author=${author:5}

# date
commitDate=$(sed '3q;d' $1)
commitDate=${commitDate:5}

# Create a new branch
if [ $check == 0 ]
then
   echo 
   echo
   echo This script will import a patch file from openHAB and migrate it to OpenSmartHouse.
   echo Since this will refactor some bundles, and other changes may have been made to OpenSmartHouse, there may be errors or merge rejections.
   echo You are therfore encouraged to use the "-check" option before performing the patch. This will show any errors or warnings before
   echo actually performing the patch.
   echo

   read -p "Do you wish to continue with the patch? [y/n] " -n 1 -r
   echo    # (optional) move to a new line
   if [[ ! $REPLY =~ ^[Yy]$ ]]
   then
      exit 1
   fi

   git checkout -b $commit
fi

# Preserve the original file
cp $1 $1.tmp

# Patch specific classes that have moved package
#refactor $1 "bundles/org.openhab.core/src/main/java/org/openhab/core/internal/service/BundleResolverImpl.java"                                 "bundles/org.opensmarthouse.core.common/src/main/java/org/openhab/core/internal/common/osgi/BundleResolverImpl.java"



# Patch and refactored bundles - migrating packages to new bundles
#refactor $1 "bundles/org.openhab.core.audio/src/main/java/org/openhab/core/audio/internal/"                               "bundles/org.opensmarthouse.core.audio.core/src/main/java/org/openhab/core/audio/internal/"


# Catch-all. Must be last!
refactor $1 "bundles/org.openhab.ui" "bundles/org.opensmarthouse.ui"

if [ $check == 1 ]
then
    echo Only performing a git check - patch will not be applied
    # Check if the commit will work
    git apply --check $1
else
    echo Applying patch
    # Commit the changes
    git apply --reject $1
fi

# Restore the original file
rm $1
rm $1.original.diff
mv $1.tmp $1

echo --- Patch Information ---
read -p "Automatically add files and create commit? [y/n]" prompt
if [[ $prompt == "y" || $prompt == "Y" || $prompt == "yes" || $prompt == "Yes" ]]; then
  git status|grep -i "modified:\|added:\|deleted:"|grep -v .gitignore|grep -v patch.sh|tr -s '\t' ' '|cut -d ' ' -f 3|xargs git add
  echo "Executing command: git commit --author \"$author\" --date \"$commitDate\" -s"
  # get header from Subject to beginning of diff section, then remove '---' separator line and append OH commit id
  sed -n "/^Subject: /,/---/p" $1 >> .git/commit-msg.txt
  sed -i '$ d' .git/commit-msg.txt
  echo "X-Backport-Id: $commit" >> .git/commit-msg.txt
  git commit --author "$author" --date "$commitDate" -eF .git/commit-msg.txt -s && rm .git/commit-msg.txt
  read -p "Remove $1? [y/n]" cleanup
  if [[ $cleanup == "y" || $cleanup == "Y" || $cleanup == "yes" || $cleanup == "Yes" ]]; then
    rm $1;
  fi;
else
  echo $title
  echo $commit
fi;
