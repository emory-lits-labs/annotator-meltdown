/* Meltdown viewer and editor integration for annotatorjs.
   Based in part on annotator.ui.markdown.

   Include annotator.meltdown.css to adjust for annotator/meltdown
   style interactions.
*/

var _t = annotator.util.gettext;

var annotatormeltdown = {

    parser: function(text) {
        // convert markdown into html
        var converter = new showdown.Converter({extensions: [showdown.extensions.footnotes]});
        return converter.makeHtml(text);
    },

    /**
     * Replacement viewer render method.
     * Returns annotation text content parsed as Markdown.
     */
    render: function (annotation) {
        if (annotation.text) {
            return annotatormeltdown.parser(annotation.text);
        } else {
            return "<i>" + _t('No comment') + "</i>";
        }
    },

    /**
     * function:: viewerExtension(viewer)
     *
     * An extension for the :class:`~annotator.ui.viewer.Viewer`. Allows the
     * viewer to interpret annotation text as `Markdown`_ and uses the
     * `showdown`_ library if present in the page to render annotations
     * with Markdown text as HTML.
     *
     * .. _Markdown: https://daringfireball.net/projects/markdown/
     * .. _showdown: https://github.com/showdownjs/showdown
     *
     * **Usage**::
     *
     *     app.include(annotator.ui.main, {
     *         viewerExtensions: [annotatormeltdown.viewerExtension]
     *     });
     */
    viewerExtension: function viewerExtension(viewer) {
        if (!window.showdown || typeof window.showdown !== 'object') {
            console.warn(_t("To use the Meltdown viewer extension, you must " +
                "include showdown in the page."));
            return;
        }
        // only set the renderer when showdown is available
        viewer.setRenderer(annotatormeltdown.render);
    },

    // Editor textarea keyboard shortcuts.
    // Revise default annotator shortcut to map shift+enter to save
    // instead of just enter.
    textarea_keydown: function (event) {
        if (event.which === 27) {
            // "Escape" key => abort.
            this.cancel();
        } else if (event.which === 13 && event.shiftKey) {
            // If "return" was pressed *with*the shift key, we're done.
            this.submit();
        }
    },

    customize_meltdown: function() {
        // add an html5 audio input to the 'kitchen sink' control menu
        $.meltdown.defaults.controls[9].push('audio');
        $.meltdown.controlDefs.audio = {
            label: "Audio",
            altText: "Audio",
            before: "\n<audio controls='controls'>\n<source src='",
            placeholder: "http://",
            after: "' />\n</audio>"
        };

    },

    // Extend Editor show method to initialize meltdown and set minimum
    // width the first time the editor window is shown.
    show: function(position) {
        // use unextended method to handle normal show functionality
        this._pre_meltdown_show(position);
        // enable meltdown on the textarea and set a min-width
        if (! this.meltdown_initialized) {
            annotatormeltdown.customize_meltdown();
            $(this.element).find("textarea").first().meltdown({
                previewCollapses: false,
                openPreview: true,
                parser: annotatormeltdown.parser,
            });

            if (this.meltdown_options.min_width) {
                this.element.find('.annotator-widget')
                    .css('min-width', this.meltdown_options.min_width);
            }
            // if font awesome is configured available, add class for css to pick up on
            if (this.meltdown_options.font_awesome) {
                this.element.find('.meltdown_controls').addClass('fa-avail');
            }
            this.meltdown_initialized = true;
        } else {
            // make sure preview area is updated for current text
            $(this.element).find("textarea").meltdown("update");
        }
        // always ensure textarea has focus for immediate input
        $(this.element).find("textarea").focus();
    },

    /**
     * function:: getEditorExtension(options)
     *
     * Build and return an extension for :class:`~annotator.ui.editor.Editor`.
     * Converts the editor textarea to a `Meltdown`_ input, with preview
     * panel and toolbar
     *
     * .. _Meltdown: https://github.com/iphands/Meltdown
     *
     * **Usage**::
     *
     *     app.include(annotator.ui.main, {
     *         editorExtensions: [annotatormeltdown.getEditorExtension()]
     *     });
     *
     * You can optionally specify a minimum editor window width (by default,
     * minimum width will be set to 375px):
     *
     *     app.include(annotator.ui.main, {
     *         editorExtensions: [annotatormeltdown.getEditorExtension({min_width: '500px'})]
     *     });
     *
     * You can also indicate when FontAwesome is available and should be used
     * for the audio button in the controls by specifying `font_awesome: true`
     * in the options to getEditorExtension.
     *
     */
    getEditorExtension: function getEditorExtension(options) {

        var meltdown_opts = {
            min_width: '375px',  // default minimum width
            font_awesome: false,  // set to true when font awesome is available
        };
        $.extend(meltdown_opts, options);
        return function editorExtension(editor) {
            // Make sure meltdown is available before configuring anything
            if (!jQuery.meltdown || typeof jQuery.meltdown !== 'object') {
                console.warn(_t("To use the Meltdown editor extension, you must " +
                    "include meltdown in the page."));
                return;
            }
            // override editor methods and add options
            editor._onTextareaKeydown = annotatormeltdown.textarea_keydown;
            editor._pre_meltdown_show = editor.show; // preserve unextended show method
            editor.show = annotatormeltdown.show;
            // track meltdown initialization since it only needs to be done once
            editor.meltdown_initialized = false;
            editor.meltdown_options = meltdown_opts;
        };
    },
};
