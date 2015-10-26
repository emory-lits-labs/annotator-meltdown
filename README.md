# annotator-meltdown
Meltdown viewer and editor integration for Annotator.js.

Annotator-Meltdown is developed for
[Annotator 2.x](https://github.com/openannotation/annotator/releases),
and is based in part on annotator.ui.markdown.

Includes annotator.meltdown.css to adjust for annotator/meltdown
style interactions.

##Demo
[View a simple demo of Annotator-Meltdown here.](http://emory-lits-labs.github.io/annotator-meltdown/demo/)

##Dependencies
* jQuery 1.8+ (1.9.1 recommended)
* Annotator.js
* [Meltdown](https://github.com/iphands/Meltdown)

##Using Annotator-Meltdown
To use this plugin in your Annotator project, set annotator-meltdown as the
viewer and editor as part of initializing `annotator.ui.main`:

```
    var app = new annotator.App();
    app.include(annotator.ui.main,{
      viewerExtensions: [
        annotatormeltdown.viewerExtension
      ],
      editorExtensions: [
        annotatormeltdown.getEditorExtension()
      ]
    });
```

In addition to including the viewer and editor extensions, Annotator-Meltdown
requires several js and css files to work properly.
* meltdown/js
* meltdown/css
* annotator.meltdown.css
* annotator.meltdown.js

See the demo/index.html page for a full example of all required files.

##Configuration options
* `min_width` Sets the minimum width of the editor element:

```
    editorExtensions: [
      annotatormeltdown.getEditorExtension({min_width: '500px'})
    ]
```

## Developer Notes

This project uses [git-flow](https://github.com/nvie/gitflow) branching conventions.

To view the jekyll site for development, you should do the following:
- make sure you are on the **develop** branch
- make sure you have [jekyll installed](http://jekyllrb.com/docs/installation/)
- run the site via jekyll: ```jekyll serve```

To install grunt utilities for building releases, run: ```npm install```

Released versions are published through GitHub site pages, which are served out from
the gh-pages branch.  Following git-flow conventions, this should be an exact
replica of the master branch.  As a convenience, to update the gh-pages branch
from master and push it to github, you may want to configure the following alias
in your ``.git/config`` for this project:

    [alias]
        publish-pages = "!rm -rf build && git checkout gh-pages && git merge master && grunt && git add 'build/*' && git commit 'build/*' -m 'Latest build' && git push origin gh-pages && git checkout -"

Whenever you tag a new release you want to be available as a version that
can be included from the github pages url, you should do the following (or use
the alias above):
- update the version number in package.json
- use gitflow to tag the release
- checkout gh-pages branch, update from master and run ```grunt```
- add the build version of annotator.meltdown.min.js and css to gh-pages branch

