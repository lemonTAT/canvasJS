/*
* 1、npm install -g fis3
* 2、fis3 release -d ../dist
*
* */

/* md5 */
fis.match('assets/{icons, images, scripts, styles}/**.{js,css,png}', {
    useHash: true
});

fis.match('assets/scripts/**.js', {
    optimizer: fis.plugin('uglify-js')
});

fis.match('assets/styles/**.css', {
    optimizer: fis.plugin('clean-css')
});

fis.match('assets/{icons, images}/**.png', {
    optimizer: fis.plugin('png-compressor')
});