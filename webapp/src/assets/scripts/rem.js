(function(win) {
    var doc = win.document,
        docEl = doc.documentElement,
        dpr = 0,
        timer;

    if (doc.readyState === 'complete') {
        refreshRem();
    } else {
        doc.addEventListener('DOMContentLoaded', function() {
            refreshRem()
        }, false);
    }

    win.addEventListener('resize', function() {
        clearTimeout(timer);
        timer = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(timer);
            timer = setTimeout(refreshRem, 300);
        }
    }, false);

    function refreshRem() {
        var deviceWidth = docEl.clientWidth;
        /*实际数值就等于设计图除以100，例如：设计稿上面是14px的话，计算成0.14rem */
        if (deviceWidth > 750) deviceWidth = 750;
        docEl.style.fontSize = deviceWidth / 7.5 + 'px';
        doc.body.style.fontSize = '12px';
    }

    if (!dpr) {
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            dpr = 1;
        }
    }

    docEl.setAttribute('data-dpr', dpr.toString());
})(window)