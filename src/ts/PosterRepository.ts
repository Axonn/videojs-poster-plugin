///<reference path='../definitions/JQuery.d.ts'/>
///<reference path='../definitions/dustjs-linkedin.d.ts'/>
///<reference path='IPosterRepository.ts'/>
///<reference path='IPosterSpecification.ts'/>
///<reference path='../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts'/>

module Poster {
    export class PosterRepository implements IPosterRepository, VjsPluginComponents.IObservableRepository {
        _baseRepository: VjsPluginComponents.ILayerRepository;
        _player: VjsPluginComponents.IPlayer;

        constructor(baseRepository: VjsPluginComponents.ILayerRepository, player: VjsPluginComponents.IPlayer) {
            this._baseRepository = baseRepository;
            this._player = player;
        }

        createFromSpecification(posterSpecification: IPosterSpecification) {
            var poster = this._baseRepository.createFromSpecification(posterSpecification);

            this._player.on("play", () => { poster.container.addClass("vjsInvisible"); });

            VjsPluginComponents.TriggerEventHooks(posterSpecification.events, "onCreate", { player: this._player, poster: poster });

            return poster;
        }

        create(layer: VjsPluginComponents.ILayer) {
            return this._baseRepository.create(layer);
        }

        on(eventName: string, handler: (args) => void) {
            this._baseRepository.on(eventName, handler);
        }

        trigger(eventName: string, args) {
            this._baseRepository.trigger(eventName, args);
        }

        toList() {
            return <VjsPluginComponents.ILayer[]>this._baseRepository.toList();
        }

        getEntity(id: number) {
            return <VjsPluginComponents.ILayer>this._baseRepository.getEntity(id);
        }

        remove(id: number) {
            var layer = this.getEntity(id);

            layer.container.remove();

            return this._baseRepository.remove(id);
        }

        update(layer: VjsPluginComponents.ILayer) {
            return this._baseRepository.update(layer);
        }

        clear() {
            return this._baseRepository.clear();
        }
    }
}