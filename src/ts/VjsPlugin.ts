///<reference path='Plugin.ts'/>
///<reference path='../../../definitions/VideoJS.d.ts'/>

_V_.plugin("posterPlugin", function (options) {
    var plugin = new Poster.Plugin(this);
    plugin.enable(options.posters);
});