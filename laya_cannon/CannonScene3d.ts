import CannonSimulation from "./CannonSimulation";
import CannonPhysicsComponent from "./CannonPhysicsComponent";

export default class CannonScene3d extends Laya.Scene3D {
    cannonSimulation: CannonSimulation;

    constructor() {
        super();
        this._init();
    }

    _init() {
        this.cannonSimulation = new CannonSimulation(new Laya.PhysicsSettings(), 0);
    }

    _update() {
        /////////////////////////////////////////////////////
        // 父类方法
        let self = this as any;

        var delta = this.timer.delta / 1000;

        self._time += delta;
        self._shaderValues.setNumber(Laya.Scene3D.TIME, self._time);
        self._input._update();
        self._clearScript();
        self._updateScript();

        let Animator = Laya.Animator as any;

        Animator._update(this);
        self._lateUpdateScript();
        // 父类方法
        /////////////////////////////////////////////////////

        var simulation = this.cannonSimulation;
        simulation._updatePhysicsTransformFromRender();
        CannonPhysicsComponent._addUpdateList = false;
        simulation._simulate(delta);
        simulation._updateCharacters();
        CannonPhysicsComponent._addUpdateList = true;
        simulation._updateCollisions();
        simulation._eventScripts();
    }

    destroy() {
        this.cannonSimulation && this.cannonSimulation._destroy();
    }
}