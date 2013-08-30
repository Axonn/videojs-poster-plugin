///<reference path='../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts'/>
module Poster {
    export interface IPosterRepository extends VjsPluginComponents.IObservableRepository {
        createFromSpecification(posterSpecification: IPosterSpecification): VjsPluginComponents.ILayer;
    }
}