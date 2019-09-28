"use strict";

var includeLoader = function (includedCallback) {
    if (!window.WebFont) {
        var wf = document.createElement('script');
        wf.src = (document.location.protocol === 'https:' ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1.5.6/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        wf.onload = function () { includedCallback(false) };
        wf.onerror = function () { includedCallback(true) };

        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    } else {
        includedCallback();
    }
};

module.exports = function loadFonts (fonts, callback) {
    includeLoader(function (err) {
        if (err) {
            callback();
        } else {
            WebFont.load({
                google: {
                    families: fonts
                },
                active: callback
            });
        }
    });
};
