/// <reference path="../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts" />
/// <reference path="../../src/definitions/JQuery.d.ts" />
/// <reference path="../../src/definitions/dustjs-linkedin.d.ts" />
/// <reference path="../../src/definitions/VideoJS.d.ts" />
declare module Poster {
    interface IPosterRepository extends VjsPluginComponents.IObservableRepository {
        createFromSpecification(posterSpecification: Poster.IPosterSpecification): VjsPluginComponents.ILayer;
    }
}
declare module Poster {
    interface IPosterSpecification extends VjsPluginComponents.ILayerSpecification {
        events: {};
    }
}
declare module Poster {
    class PosterRepository implements Poster.IPosterRepository, VjsPluginComponents.IObservableRepository {
        public _baseRepository: VjsPluginComponents.ILayerRepository;
        public _player: VjsPluginComponents.IPlayer;
        constructor(baseRepository: VjsPluginComponents.ILayerRepository, player: VjsPluginComponents.IPlayer);
        public createFromSpecification(posterSpecification: Poster.IPosterSpecification): VjsPluginComponents.ILayer;
        public create(layer: VjsPluginComponents.ILayer): VjsPluginComponents.IEntity;
        public on(eventName: string, handler: (args: any) => void): void;
        public trigger(eventName: string, args): void;
        public toList(): VjsPluginComponents.ILayer[];
        public getEntity(id: number): VjsPluginComponents.ILayer;
        public remove(id: number): boolean;
        public update(layer: VjsPluginComponents.ILayer): boolean;
        public clear(): boolean;
    }
}
declare module Poster {
    class Plugin {
        public _player: VjsPluginComponents.IPlayer;
        constructor(player);
        public enable(posters: Poster.IPosterSpecification[]): void;
    }
}
