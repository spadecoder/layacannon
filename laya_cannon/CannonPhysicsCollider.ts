import CannonPhysicsTriggerComponent from './CannonPhysicsTriggerComponent';
export default class CannonPhysicsCollider extends CannonPhysicsTriggerComponent {
    constructor(collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER, canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
        super(collisionGroup, canCollideWith);
        this._enableProcessCollisions = false;
    }

    _addToSimulation() {
        this._simulation._addPhysicsCollider(this, this._collisionGroup, this._canCollideWith);
    }
    _removeFromSimulation() {
        this._simulation._removePhysicsCollider(this);
    }
    // _onTransformChanged(flag) {
    //     let Transform3D = Laya.Transform3D as any;
    //     flag &= Transform3D.TRANSFORM_WORLDPOSITION | Transform3D.TRANSFORM_WORLDQUATERNION | Transform3D.TRANSFORM_WORLDSCALE;
    //     if (flag) {
    //         this._transformFlag |= flag;
    //         if (this._isValid() && this._inPhysicUpdateListIndex === -1)
    //             this._simulation._physicsUpdateList.add(this);
    //     }
    // }
    _parse(data) {
        (data.friction != null) && (this.friction = data.friction);
        (data.rollingFriction != null) && (this.rollingFriction = data.rollingFriction);
        (data.restitution != null) && (this.restitution = data.restitution);
        (data.isTrigger != null) && (this.isTrigger = data.isTrigger);
        super._parse(data);
        this._parseShape(data.shapes);
    }
    _onAdded() {
        // var bt = Physics3D._bullet;
        // var btColObj = bt.btCollisionObject_create();
        // bt.btCollisionObject_setUserIndex(btColObj, this.id);
        // bt.btCollisionObject_forceActivationState(btColObj, PhysicsComponent.ACTIVATIONSTATE_DISABLE_SIMULATION);
        // var flags = bt.btCollisionObject_getCollisionFlags(btColObj);
        // if (this.owner.isStatic) {
        //     if ((flags & PhysicsComponent.COLLISIONFLAGS_KINEMATIC_OBJECT) > 0)
        //         flags = flags ^ PhysicsComponent.COLLISIONFLAGS_KINEMATIC_OBJECT;
        //     flags = flags | PhysicsComponent.COLLISIONFLAGS_STATIC_OBJECT;
        // }
        // else {
        //     if ((flags & PhysicsComponent.COLLISIONFLAGS_STATIC_OBJECT) > 0)
        //         flags = flags ^ PhysicsComponent.COLLISIONFLAGS_STATIC_OBJECT;
        //     flags = flags | PhysicsComponent.COLLISIONFLAGS_KINEMATIC_OBJECT;
        // }
        // bt.btCollisionObject_setCollisionFlags(btColObj, flags);
        // this._btColliderObject = btColObj;
        super._onAdded();
    }
}