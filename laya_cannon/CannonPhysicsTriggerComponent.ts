import CannonPhysicsComponent from './CannonPhysicsComponent'
export default class CannonPhysicsTriggerComponent extends CannonPhysicsComponent {

    private _isTrigger = false;

    constructor(collisionGroup, canCollideWith) {
        super(collisionGroup, canCollideWith);
        this._isTrigger = false;
    }
    get isTrigger() {
        return this._isTrigger;
    }
    set isTrigger(value) {
        this._isTrigger = value;
        // var bt = Physics3D._bullet;
        // if (this._btColliderObject) {
        //     var flags = bt.btCollisionObject_getCollisionFlags(this._btColliderObject);
        //     if (value) {
        //         if ((flags & PhysicsComponent.COLLISIONFLAGS_NO_CONTACT_RESPONSE) === 0)
        //             bt.btCollisionObject_setCollisionFlags(this._btColliderObject, flags | PhysicsComponent.COLLISIONFLAGS_NO_CONTACT_RESPONSE);
        //     }
        //     else {
        //         if ((flags & PhysicsComponent.COLLISIONFLAGS_NO_CONTACT_RESPONSE) !== 0)
        //             bt.btCollisionObject_setCollisionFlags(this._btColliderObject, flags ^ PhysicsComponent.COLLISIONFLAGS_NO_CONTACT_RESPONSE);
        //     }
        // }
    }
    _onAdded() {
        super._onAdded();
        this.isTrigger = this._isTrigger;
    }
    _cloneTo(dest) {
        super._cloneTo(dest);
        dest.isTrigger = this._isTrigger;
    }
}