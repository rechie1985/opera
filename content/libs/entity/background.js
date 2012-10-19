(function (window) {
    'use strict';
    if (window.Wiz) {
        var Wiz = window.Wiz;
    } else {
        console.error('could not find Wiz object');
    }

    

    var CONTEXTMENU_NAME = 'save to wiznote';
    function onLoadHandler() {
        Wiz.opera.addToolbarButton();
        Wiz.opera.addContextMenuButton(CONTEXTMENU_NAME, contextMenuClickHandler);
    }

    function contextMenuClickHandler(event) {
        //test  request originating tab to preview
        event.source.postMessage({'message': 'preview'});
    }

    window.addEventListener("load", onLoadHandler, false);

})(window);

