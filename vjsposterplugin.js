var Poster;
(function (Poster) {
    var PosterRepository = (function () {
        function PosterRepository(baseRepository, player) {
            this._baseRepository = baseRepository;
            this._player = player;
        }
        PosterRepository.prototype.createFromSpecification = function (posterSpecification) {
            var poster = this._baseRepository.createFromSpecification(posterSpecification);

            this._player.on("play", function () {
                poster.container.addClass("vjsInvisible");
            });

            VjsPluginComponents.TriggerEventHooks(posterSpecification.events, "onCreate", { player: this._player, poster: poster });

            return poster;
        };

        PosterRepository.prototype.create = function (layer) {
            return this._baseRepository.create(layer);
        };

        PosterRepository.prototype.on = function (eventName, handler) {
            this._baseRepository.on(eventName, handler);
        };

        PosterRepository.prototype.trigger = function (eventName, args) {
            this._baseRepository.trigger(eventName, args);
        };

        PosterRepository.prototype.toList = function () {
            return this._baseRepository.toList();
        };

        PosterRepository.prototype.getEntity = function (id) {
            return this._baseRepository.getEntity(id);
        };

        PosterRepository.prototype.remove = function (id) {
            var layer = this.getEntity(id);

            layer.container.remove();

            return this._baseRepository.remove(id);
        };

        PosterRepository.prototype.update = function (layer) {
            return this._baseRepository.update(layer);
        };

        PosterRepository.prototype.clear = function () {
            return this._baseRepository.clear();
        };
        return PosterRepository;
    })();
    Poster.PosterRepository = PosterRepository;
})(Poster || (Poster = {}));
var Poster;
(function (Poster) {
    var Plugin = (function () {
        function Plugin(player) {
            this._player = new VjsPluginComponents.Player(player);
        }
        Plugin.prototype.enable = function (posters) {
            var _this = this;
            var applyServiceToPlayer = VjsPluginComponents.ApplySingleService(this._player);

            var layerRepository = applyServiceToPlayer("LayerRepository")(function () {
                return new VjsPluginComponents.LayerRepository(new VjsPluginComponents.ObservableRepository(new VjsPluginComponents.Observable()), dust, VjsPluginComponents.ContainerBuilder(_this._player.el())("vjsPoster"));
            });

            var posterRepository = applyServiceToPlayer("PosterRepository")(function () {
                return new Poster.PosterRepository(layerRepository, _this._player);
            });

            for (var i = 0; i < posters.length; i++) {
                posterRepository.createFromSpecification(posters[i]);
            }
        };
        return Plugin;
    })();
    Poster.Plugin = Plugin;
})(Poster || (Poster = {}));
_V_.plugin("posterPlugin", function (options) {
    var plugin = new Poster.Plugin(this);
    plugin.enable(options.posters);
});
//# sourceMappingURL=file:////home/travis/build/Axonn/videojs-poster-plugin/build/js/vjsposterplugin.js.map
