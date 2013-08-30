///<reference path='../../../definitions/JQuery.d.ts'/>
///<reference path='../../../definitions/dustjs-linkedin.d.ts'/>
///<reference path='../vjsplugin/TimeBasedEventManager.ts'/>
///<reference path='../vjsplugin/PlayObserver.ts'/>
///<reference path='../vjsplugin/Player.ts'/>
///<reference path='../vjsplugin/DurationSetEmitter.ts'/>
///<reference path='../vjsplugin/ObservableRepository.ts'/>
///<reference path='../vjsplugin/WalkableList.ts'/>
///<reference path='../vjsplugin/EventSortingFunction.ts'/>
///<reference path='../vjsplugin/ITemplate.ts'/>
///<reference path='../vjsplugin/OverlayRepository.ts'/>
///<reference path='../vjsplugin/IOverlaySpecification.ts'/>
///<reference path='../vjsplugin/ContainerBuilder.ts'/>
///<reference path='../vjsplugin/LayerRepository.ts'/>
///<reference path='../vjsplugin/ILayerRepository.ts'/>
///<reference path='../vjsplugin/OverlayManager.ts'/>
///<reference path='../vjsplugin/SinglePointEventRepository.ts'/>
///<reference path='../vjsplugin/TimeBasedEventRepository.ts'/>
///<reference path='../vjsplugin/ApplySingleService.ts'/>
///<reference path='../vjsplugin/ObservableSubRepository.ts'/>
///<reference path='../vjsplugin/TriggerEventHooks.ts'/>
///<reference path='IPosterSpecification.ts'/>

module Poster {
    export class Plugin {
        _player: VjsPlugin.IPlayer;

        constructor(player) {
            this._player = new VjsPlugin.Player(player);
        }

        enable(posters: IPosterSpecification[]) {

            var applyServiceToPlayer = VjsPlugin.ApplySingleService(this._player);

            var layerRepository: VjsPlugin.ILayerRepository = applyServiceToPlayer("PosterLayerRepository")(() => {
                return new VjsPlugin.LayerRepository(new VjsPlugin.ObservableRepository(new VjsPlugin.Observable()), dust, VjsPlugin.ContainerBuilder(this._player.el())("vjsPoster"));
            });

            var addInvisibleClass = (poster) => {
                this._player.on("play", () => { poster.container.addClass("vjsInvisible"); });
            }

            for (var i = 0; i < posters.length; i++) {
                var poster = layerRepository.createFromSpecification(posters[i]);
                addInvisibleClass(poster);
                VjsPlugin.TriggerEventHooks(posters[i].events, "onCreate", { player: this._player, poster: poster });
            }
        }
    }
}