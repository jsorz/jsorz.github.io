window.MusicUtil = {
    insertIframe: function (src, width, height) {
        var w = width || 330;
        var h = height || 86;

        var el = document.getElementById('MusicFrameAnchor');
        if (!el) {
            el = document.createElement('div');
            el.setAttribute('id', 'MusicFrameAnchor');
            document.body.appendChild(el);
        }

        el.style.maxWidth = w + 'px';
        el.style.maxHeight = h + 'px';
        el.innerHTML = '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" src="' + src + '"></iframe>';
    }
};
