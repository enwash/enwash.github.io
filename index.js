/* Detect scrolling and use it to navigate pages */

var pages = ['home', 'services', 'shop', 'contact'];
var page = 'home';

window.addEventListener('wheel', function(e) {
    if (e.deltaY > 0) {
        if (pages.indexOf(page)+1 < 4) {
            page = pages[pages.indexOf(page)+1];
            show(page);
        }
    }
    else {
        if (pages.indexOf(page)+1 > 1) {
            page = pages[pages.indexOf(page) - 1];
            show(page);
        }
    }
}, false);