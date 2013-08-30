///<reference path='../definitions/JQuery.d.ts'/>
///<reference path='../definitions/dustjs-linkedin.d.ts'/>
///<reference path='../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts'/>
///<reference path='IPosterSpecification.ts'/>
///<reference path='PosterRepository.ts'/>

module Poster {
    export class Plugin {
        _player: VjsPluginComponents.IPlayer;

        constructor(player) {
            this._player = new VjsPluginComponents.Player(player);
        }

        enable(posters: IPosterSpecification[]) {

            var applyServiceToPlayer = VjsPluginComponents.ApplySingleService(this._player);

            var layerRepository: VjsPluginComponents.ILayerRepository = applyServiceToPlayer("LayerRepository")(() => {
                return new VjsPluginComponents.LayerRepository(new VjsPluginComponents.ObservableRepository(new VjsPluginComponents.Observable()), dust, VjsPluginComponents.ContainerBuilder(this._player.el())("vjsPoster"));
            });

            var posterRepository: IPosterRepository = applyServiceToPlayer("PosterRepository")(() => {
                return new Poster.PosterRepository(layerRepository, this._player);
            });

            for (var i = 0; i < posters.length; i++) {
                posterRepository.createFromSpecification(posters[i]);
            }
        }
    }
}