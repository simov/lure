#!/bin/bash

VERSION=$1

# before
mkdir -p dist/

# transpile app
babel \
  --presets es2015 \
  --no-comments \
  --compact \
  --minified \
  -o dist/lure.js \
  -- \
  mithril/form.js \
  mithril/index.js

echo "Transpile Complete"

# minify app
uglifyjs \
  dist/lure.js \
  --compress \
  --mangle \
  --screw-ie8 \
  --output dist/lure.min.js

# minify app css
csso \
  --input config/lure.css \
  --output dist/lure.min.css

echo "Minification Complete"
