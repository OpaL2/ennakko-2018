#!/bin/bash

#!/bin/bash

gulp build

now=$(date +%y-%m-%d)
name="reaktor-ennakko-$now"
mkdir -p $name/frontend/build/public $name/config

#Copying required resources
cp -R backend $name/
cp -R db $name/
cp -R doc $name/
cp -R frontend/build/public/* $name/frontend/build/public/
cp frontend/index.html $name/frontend/
cp config/config-sample.js $name/config

cp app.js $name/
cp LICENSE $name/
cp package.json $name/
cp README.md $name/

cd $name
npm install --production
cd ..

#creating tarball

tar cJvf "$name.tar.xz" $name

#cleaning up

rm -r $name