/// <reference path="../src/definitions/Jasmine.d.ts" />
/// <reference path="../src/definitions/JQuery.d.ts" />
/// <reference path="../src/ts/PosterRepository.ts" />
///<reference path='../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts'/>
/// <chutzpah_reference path="../../../lib/JQuery/jquery-1.9.1.js" />

describe("posterPlugin", () => {
    var player,
        layerRepository,
        createFromSpecSpy,
        playerEventSpy,
        playerEventOffSpy,
        playerTriggerSpy,
        playerCurrentTimeSpy,
        durationSpy,
        callbackSpy;

    var curriedGetFunctionFromSpy = (spy: jasmine.Spy) => {
        return (functionName: string) => {
            for (var i = 0; i < spy.argsForCall.length; i++) {
                if (spy.argsForCall[i][0] === functionName) {
                    return spy.argsForCall[i][1];
                };
            }
        };
    }

    beforeEach(() => {
        playerEventSpy = jasmine.createSpy('playerEvent');
        playerTriggerSpy = jasmine.createSpy('playerTrigger');
        playerCurrentTimeSpy = jasmine.createSpy('playerCurrentTime');
        callbackSpy = jasmine.createSpy('callback');
        durationSpy = jasmine.createSpy('player.duration');
        playerEventOffSpy = jasmine.createSpy('player.off');

        player = {
            id: jasmine.createSpy("player.id"),
            on: playerEventSpy,
            trigger: playerTriggerSpy,
            currentTime: playerCurrentTimeSpy,
            dispose: jasmine.createSpy("player.dispose"),
            createEl: jasmine.createSpy("player.createEl"),
            el: jasmine.createSpy("player.el"),
            addChild: jasmine.createSpy("player.addChild"),
            children: jasmine.createSpy("player.children"),
            off: playerEventOffSpy,
            one: jasmine.createSpy("player.one"),
            show: jasmine.createSpy("player.show"),
            hide: jasmine.createSpy("player.hide"),
            width: jasmine.createSpy("player.width"),
            height: jasmine.createSpy("player.height"),
            dimensions: jasmine.createSpy("player.dimensions"),
            techName: jasmine.createSpy("player.techName"),
            play: jasmine.createSpy("player.play"),
            lockShowing: jasmine.createSpy("player.lockShowing"),
            unlockShowing: jasmine.createSpy("player.unlockShowing"),
            currentSrc: jasmine.createSpy("player.currentSrc"),
            duration: durationSpy,
            toOriginal: jasmine.createSpy("player.duration"),
            sources: jasmine.createSpy("player.sources"),
            options: jasmine.createSpy("player.options"),
        };

        createFromSpecSpy = jasmine.createSpy('layerRepo.createFromSpecification');

        layerRepository = {
            remove: jasmine.createSpy('layerRepo.remove'),
            getEntity: jasmine.createSpy('layerRepo.getEntity'),
            create: jasmine.createSpy('layerRepo.create'),
            trigger: jasmine.createSpy('layerRepo.trigger'),
            on: jasmine.createSpy('layerRepo.on'),
            toList: jasmine.createSpy('layerRepo.toList'),
            update: jasmine.createSpy('layerRepo.update'),
            createFromSpecification: createFromSpecSpy,
            clear: jasmine.createSpy('layerRepo.clear'),
        }
    });

    it("Calls duration set when duration changes", () => {
        var posterSpecification = { events: {} };

        var sut = new Poster.PosterRepository(layerRepository, player);
        sut.createFromSpecification(posterSpecification);
        expect(createFromSpecSpy).toHaveBeenCalledWith(posterSpecification);
        expect(playerEventSpy).toHaveBeenCalled();
    });
});