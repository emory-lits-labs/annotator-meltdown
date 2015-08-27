# annotator-meltdown
Meltdown viewer and editor integration for Annotator.js.

Annotator-Meltdown is developed for
[Annotator 2.x](https://github.com/openannotation/annotator/releases),
and is based in part on annotator.ui.markdown.

Includes annotator.meltdown.css to adjust for annotator/meltdown
style interactions.

##Demo
[View a simple demo of Annotator-Meltdown here.](http://emory-lits-labs.github.io/annotator-meltdown/demo/)

##Dependancies
* jQuery 1.8+ (1.9.1 recommended)
* Annotator.js
* [Meltdown](https://github.com/iphands/Meltdown)

##Using Annotator-Meltdown
To use this plugin in your Annotator project, set annotator-meltdown as the
viewer and editor as part of initializing `annotator.ui.main`:

    var app = new annotator.App();
    app.include(annotator.ui.main,{
      viewerExtensions: [
        annotatormeltdown.viewerExtension
      ],
      editorExtensions: [
        annotatormeltdown.getEditorExtension()
      ]
    });

In addition to including the viewer and editor extensions, Annotator-Meltdown
requires several js and css files to work properly.
* meltdown/js
* meltdown/css
* annotator.meltdown.css
* annotator.meltdown.js

See the demo/index.html page for a full example of all required files.

##Configuration options
* `min_width` Sets the min-width of the editor element

    editorExtensions: [
      annotatormeltdown.getEditorExtension({min_width: '500px'})
    ]
