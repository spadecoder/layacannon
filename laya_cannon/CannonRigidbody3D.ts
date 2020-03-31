import CannonPhysicsTriggerComponent from './CannonPhysicsTriggerComponent';
export default class CannonRigidbody3D extends CannonPhysicsTriggerComponent {

    static TYPE_STATIC = 0;
    static TYPE_DYNAMIC = 1;
    static TYPE_KINEMATIC = 2;
    static _BT_DISABLE_WORLD_GRAVITY = 1;
    static _BT_ENABLE_GYROPSCOPIC_FORCE = 2;

    _isKinematic = false;
    _mass = 1.0;
    _gravity = new Laya.Vector3(0, -10, 0);
    _angularDamping = 0.0;
    _linearDamping = 0.0;
    _overrideGravity = false;
    _totalTorque = new Laya.Vector3(0, 0, 0);
    _totalForce = new Laya.Vector3(0, 0, 0);
    _linearVelocity = new Laya.Vector3();
    _angularVelocity = new Laya.Vector3();
    _linearFactor = new Laya.Vector3(1, 1, 1);
    _angularFactor = new Laya.Vector3(1, 1, 1);
    _detectCollisions = true;

    constructor(collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER, canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
        super(collisionGroup, canCollideWith);
        this._isKinematic = false;
        this._mass = 1.0;
        this._gravity = new Laya.Vector3(0, -10, 0);
        this._angularDamping = 0.0;
        this._linearDamping = 0.0;
        this._overrideGravity = false;
        this._totalTorque = new Laya.Vector3(0, 0, 0);
        this._totalForce = new Laya.Vector3(0, 0, 0);
        this._linearVelocity = new Laya.Vector3();
        this._angularVelocity = new Laya.Vector3();
        this._linearFactor = new Laya.Vector3(1, 1, 1);
        this._angularFactor = new Laya.Vector3(1, 1, 1);
        this._detectCollisions = true;
    }
    static __init__() {
        // var bt = Physics3D._bullet;
        // Rigidbody3D._btTempVector30 = bt.btVector3_create(0, 0, 0);
        // Rigidbody3D._btTempVector31 = bt.btVector3_create(0, 0, 0);
        // Rigidbody3D._btVector3Zero = bt.btVector3_create(0, 0, 0);
        // Rigidbody3D._btInertia = bt.btVector3_create(0, 0, 0);
        // Rigidbody3D._btImpulse = bt.btVector3_create(0, 0, 0);
        // Rigidbody3D._btImpulseOffset = bt.btVector3_create(0, 0, 0);
        // Rigidbody3D._btGravity = bt.btVector3_create(0, 0, 0);
    }
    get mass() {
        return this._mass;
    }
    set mass(value) {
        value = Math.max(value, 1e-07);
        this._mass = value;
        (this._isKinematic) || (this._updateMass(value));
    }
    get isKinematic() {
        return this._isKinematic;
    }
    set isKinematic(value) {
        this._isKinematic = value;
        // var bt = Physics3D._bullet;
        // var canInSimulation = !!(this._simulation && this._enabled && this._colliderShape);
        // canInSimulation && this._removeFromSimulation();
        // var natColObj = this._btColliderObject;
        // var flags = bt.btCollisionObject_getCollisionFlags(natColObj);
        // if (value) {
        //     flags = flags | PhysicsComponent.COLLISIONFLAGS_KINEMATIC_OBJECT;
        //     bt.btCollisionObject_setCollisionFlags(natColObj, flags);
        //     bt.btCollisionObject_forceActivationState(this._btColliderObject, PhysicsComponent.ACTIVATIONSTATE_DISABLE_DEACTIVATION);
        //     this._enableProcessCollisions = false;
        //     this._updateMass(0);
        // }
        // else {
        //     if ((flags & PhysicsComponent.COLLISIONFLAGS_KINEMATIC_OBJECT) > 0)
        //         flags = flags ^ PhysicsComponent.COLLISIONFLAGS_KINEMATIC_OBJECT;
        //     bt.btCollisionObject_setCollisionFlags(natColObj, flags);
        //     bt.btCollisionObject_setActivationState(this._btColliderObject, PhysicsComponent.ACTIVATIONSTATE_ACTIVE_TAG);
        //     this._enableProcessCollisions = true;
        //     this._updateMass(this._mass);
        // }
        // var btZero = Rigidbody3D._btVector3Zero;
        // bt.btCollisionObject_setInterpolationLinearVelocity(natColObj, btZero);
        // bt.btRigidBody_setLinearVelocity(natColObj, btZero);
        // bt.btCollisionObject_setInterpolationAngularVelocity(natColObj, btZero);
        // bt.btRigidBody_setAngularVelocity(natColObj, btZero);
        // canInSimulation && this._addToSimulation();
    }
    get linearDamping() {
        return this._linearDamping;
    }
    set linearDamping(value) {
        this._linearDamping = value;
        // if (this._btColliderObject)
        //     Physics3D._bullet.btRigidBody_setDamping(this._btColliderObject, value, this._angularDamping);
    }
    get angularDamping() {
        return this._angularDamping;
    }
    set angularDamping(value) {
        this._angularDamping = value;
        // if (this._btColliderObject)
        //     Physics3D._bullet.btRigidBody_setDamping(this._btColliderObject, this._linearDamping, value);
    }
    get overrideGravity() {
        return this._overrideGravity;
    }
    set overrideGravity(value) {
        this._overrideGravity = value;
        // var bt = Physics3D._bullet;
        // if (this._btColliderObject) {
        //     var flag = bt.btRigidBody_getFlags(this._btColliderObject);
        //     if (value) {
        //         if ((flag & Rigidbody3D._BT_DISABLE_WORLD_GRAVITY) === 0)
        //             bt.btRigidBody_setFlags(this._btColliderObject, flag | Rigidbody3D._BT_DISABLE_WORLD_GRAVITY);
        //     }
        //     else {
        //         if ((flag & Rigidbody3D._BT_DISABLE_WORLD_GRAVITY) > 0)
        //             bt.btRigidBody_setFlags(this._btColliderObject, flag ^ Rigidbody3D._BT_DISABLE_WORLD_GRAVITY);
        //     }
        // }
    }
    get gravity() {
        return this._gravity;
    }
    set gravity(value) {
        this._gravity = value;
        // var bt = Physics3D._bullet;
        // bt.btVector3_setValue(Rigidbody3D._btGravity, -value.x, value.y, value.z);
        // bt.btRigidBody_setGravity(this._btColliderObject, Rigidbody3D._btGravity);
    }
    get totalForce() {
        // if (this._btColliderObject) {
        //     var btTotalForce = Physics3D._bullet.btRigidBody_getTotalForce(this._btColliderObject);
        //     Utils3D._convertToLayaVec3(btTotalForce, this._totalForce, true);
        //     return this._totalForce;
        // }
        return null;
    }
    get linearFactor() {
        return this._linearFactor;
    }
    set linearFactor(value) {
        this._linearFactor = value;
        // var btValue = Rigidbody3D._btTempVector30;
        // Utils3D._convertToBulletVec3(value, btValue, false);
        // Physics3D._bullet.btRigidBody_setLinearFactor(this._btColliderObject, btValue);
    }
    get linearVelocity() {
        // if (this._btColliderObject)
        //     Utils3D._convertToLayaVec3(Physics3D._bullet.btRigidBody_getLinearVelocity(this._btColliderObject), this._linearVelocity, true);
        return this._linearVelocity;
    }
    set linearVelocity(value) {
        this._linearVelocity = value;
        // if (this._btColliderObject) {
        //     var btValue = Rigidbody3D._btTempVector30;
        //     Utils3D._convertToBulletVec3(value, btValue, true);
        //     (this.isSleeping) && (this.wakeUp());
        //     Physics3D._bullet.btRigidBody_setLinearVelocity(this._btColliderObject, btValue);
        // }
    }
    get angularFactor() {
        return this._angularFactor;
    }
    set angularFactor(value) {
        this._angularFactor = value;
        // var btValue = Rigidbody3D._btTempVector30;
        // Utils3D._convertToBulletVec3(value, btValue, false);
        // Physics3D._bullet.btRigidBody_setAngularFactor(this._btColliderObject, btValue);
    }
    get angularVelocity() {
        // if (this._btColliderObject)
        //     Utils3D._convertToLayaVec3(Physics3D._bullet.btRigidBody_getAngularVelocity(this._btColliderObject), this._angularVelocity, true);
        return this._angularVelocity;
    }
    set angularVelocity(value) {
        this._angularVelocity = value;
        // if (this._btColliderObject) {
        //     var btValue = Rigidbody3D._btTempVector30;
        //     Utils3D._convertToBulletVec3(value, btValue, true);
        //     (this.isSleeping) && (this.wakeUp());
        //     Physics3D._bullet.btRigidBody_setAngularVelocity(this._btColliderObject, btValue);
        // }
    }
    get totalTorque() {
        // if (this._btColliderObject) {
        //     var btTotalTorque = Physics3D._bullet.btRigidBody_getTotalTorque(this._btColliderObject);
        //     Utils3D._convertToLayaVec3(btTotalTorque, this._totalTorque, true);
        //     return this._totalTorque;
        // }
        return null;
    }
    get detectCollisions() {
        return this._detectCollisions;
    }
    set detectCollisions(value) {
        if (this._detectCollisions !== value) {
            this._detectCollisions = value;
            if (this._colliderShape && this._enabled && this._simulation) {
                this._simulation._removeRigidBody(this);
                this._simulation._addRigidBody(this, this._collisionGroup, value ? this._canCollideWith : 0);
            }
        }
    }
    get isSleeping() {
        // if (this._btColliderObject)
        //     return Physics3D._bullet.btCollisionObject_getActivationState(this._btColliderObject) === PhysicsComponent.ACTIVATIONSTATE_ISLAND_SLEEPING;
        return false;
    }
    get sleepLinearVelocity() {
        // return Physics3D._bullet.btRigidBody_getLinearSleepingThreshold(this._btColliderObject);
        return null;
    }
    set sleepLinearVelocity(value) {
    //     var bt = Physics3D._bullet;
    //     bt.btRigidBody_setSleepingThresholds(this._btColliderObject, value, bt.btRigidBody_getAngularSleepingThreshold(this._btColliderObject));
    }
    get sleepAngularVelocity() {
        // return Physics3D._bullet.btRigidBody_getAngularSleepingThreshold(this._btColliderObject);
        return null;
    }
    set sleepAngularVelocity(value) {
        // var bt = Physics3D._bullet;
        // bt.btRigidBody_setSleepingThresholds(this._btColliderObject, bt.btRigidBody_getLinearSleepingThreshold(this._btColliderObject), value);
    }
    _updateMass(mass) {
        // if (this._btColliderObject && this._colliderShape) {
            // var bt = Physics3D._bullet;
            // bt.btCollisionShape_calculateLocalInertia(this._colliderShape._btShape, mass, Rigidbody3D._btInertia);
            // bt.btRigidBody_setMassProps(this._btColliderObject, mass, Rigidbody3D._btInertia);
            // bt.btRigidBody_updateInertiaTensor(this._btColliderObject);
        // }
        if(this._colliderShape) {
            this._colliderShape._shapeBody.mass = mass;
        }
    }
    _onScaleChange(scale) {
        super._onScaleChange(scale);
        this._updateMass(this._isKinematic ? 0 : this._mass);
    }
    _onAdded() {
        // var bt = Physics3D._bullet;
        // var motionState = bt.layaMotionState_create();
        // bt.layaMotionState_set_rigidBodyID(motionState, this._id);
        // this._btLayaMotionState = motionState;
        // var constructInfo = bt.btRigidBodyConstructionInfo_create(0.0, motionState, null, Rigidbody3D._btVector3Zero);
        // var btRigid = bt.btRigidBody_create(constructInfo);
        // bt.btCollisionObject_setUserIndex(btRigid, this.id);
        // this._btColliderObject = btRigid;
        super._onAdded();
        this.mass = this._mass;
        this.linearFactor = this._linearFactor;
        this.angularFactor = this._angularFactor;
        this.linearDamping = this._linearDamping;
        this.angularDamping = this._angularDamping;
        this.overrideGravity = this._overrideGravity;
        this.gravity = this._gravity;
        this.isKinematic = this._isKinematic;
        // bt.btRigidBodyConstructionInfo_destroy(constructInfo);
    }
    _onEnable() {
        super._onEnable();
        this._simulation._characters.push(this);
    }
    _onShapeChange(colShape) {
        super._onShapeChange(colShape);
        if (this._isKinematic) {
            this._updateMass(0);
        }
        else {
            // var bt = Physics3D._bullet;
            // bt.btRigidBody_setCenterOfMassTransform(this._btColliderObject, bt.btCollisionObject_getWorldTransform(this._btColliderObject));
            this._updateMass(this._mass);
        }
    }
    _parse(data) {
        (data.friction != null) && (this.friction = data.friction);
        (data.rollingFriction != null) && (this.rollingFriction = data.rollingFriction);
        (data.restitution != null) && (this.restitution = data.restitution);
        (data.isTrigger != null) && (this.isTrigger = data.isTrigger);
        (data.mass != null) && (this.mass = data.mass);
        (data.isKinematic != null) && (this.isKinematic = data.isKinematic);
        (data.linearDamping != null) && (this.linearDamping = data.linearDamping);
        (data.angularDamping != null) && (this.angularDamping = data.angularDamping);
        (data.overrideGravity != null) && (this.overrideGravity = data.overrideGravity);
        if (data.linearFactor != null) {
            var linFac = this.linearFactor;
            linFac.fromArray(data.linearFactor);
            this.linearFactor = linFac;
        }
        if (data.angularFactor != null) {
            var angFac = this.angularFactor;
            angFac.fromArray(data.angularFactor);
            this.angularFactor = angFac;
        }
        if (data.gravity) {
            this.gravity.fromArray(data.gravity);
            this.gravity = this.gravity;
        }
        super._parse(data);
        this._parseShape(data.shapes, this._mass);
    }
    _onDestroy() {
        // Physics3D._bullet.btMotionState_destroy(this._btLayaMotionState);
        super._onDestroy();
        // this._btLayaMotionState = null;
        this._gravity = null;
        this._totalTorque = null;
        this._linearVelocity = null;
        this._angularVelocity = null;
        this._linearFactor = null;
        this._angularFactor = null;
    }
    _addToSimulation() {
        this._simulation._addRigidBody(this, this._collisionGroup, this._detectCollisions ? this._canCollideWith : 0);
    }
    _removeFromSimulation() {
        this._simulation._removeRigidBody(this);
    }
    _cloneTo(dest) {
        super._cloneTo(dest);
        var destRigidbody3D = dest;
        destRigidbody3D.isKinematic = this._isKinematic;
        destRigidbody3D.mass = this._mass;
        destRigidbody3D.gravity = this._gravity;
        destRigidbody3D.angularDamping = this._angularDamping;
        destRigidbody3D.linearDamping = this._linearDamping;
        destRigidbody3D.overrideGravity = this._overrideGravity;
        destRigidbody3D.linearVelocity = this._linearVelocity;
        destRigidbody3D.angularVelocity = this._angularVelocity;
        destRigidbody3D.linearFactor = this._linearFactor;
        destRigidbody3D.angularFactor = this._angularFactor;
        destRigidbody3D.detectCollisions = this._detectCollisions;
    }
    applyForce(force, localOffset = null) {
        // if (this._btColliderObject == null)
        //     throw "Attempted to call a Physics function that is avaliable only when the Entity has been already added to the Scene.";
        // var bt = Physics3D._bullet;
        // var btForce = Rigidbody3D._btTempVector30;
        // bt.btVector3_setValue(btForce, -force.x, force.y, force.z);
        // if (localOffset) {
        //     var btOffset = Rigidbody3D._btTempVector31;
        //     bt.btVector3_setValue(btOffset, -localOffset.x, localOffset.y, localOffset.z);
        //     bt.btRigidBody_applyForce(this._btColliderObject, btForce, btOffset);
        // }
        // else {
        //     bt.btRigidBody_applyCentralForce(this._btColliderObject, btForce);
        // }
    }
    applyTorque(torque) {
        // if (this._btColliderObject == null)
        //     throw "Attempted to call a Physics function that is avaliable only when the Entity has been already added to the Scene.";
        // var bullet = Physics3D._bullet;
        // var btTorque = Rigidbody3D._btTempVector30;
        // bullet.btVector3_setValue(btTorque, -torque.x, torque.y, torque.z);
        // bullet.btRigidBody_applyTorque(this._btColliderObject, btTorque);
    }
    applyImpulse(impulse, localOffset = null) {
        // if (this._btColliderObject == null)
        //     throw "Attempted to call a Physics function that is avaliable only when the Entity has been already added to the Scene.";
        // var bt = Physics3D._bullet;
        // bt.btVector3_setValue(Rigidbody3D._btImpulse, -impulse.x, impulse.y, impulse.z);
        // if (localOffset) {
        //     bt.btVector3_setValue(Rigidbody3D._btImpulseOffset, -localOffset.x, localOffset.y, localOffset.z);
        //     bt.btRigidBody_applyImpulse(this._btColliderObject, Rigidbody3D._btImpulse, Rigidbody3D._btImpulseOffset);
        // }
        // else {
        //     bt.btRigidBody_applyCentralImpulse(this._btColliderObject, Rigidbody3D._btImpulse);
        // }
    }
    applyTorqueImpulse(torqueImpulse) {
        // if (this._btColliderObject == null)
        //     throw "Attempted to call a Physics function that is avaliable only when the Entity has been already added to the Scene.";
        // var bt = Physics3D._bullet;
        // var btTorqueImpulse = Rigidbody3D._btTempVector30;
        // bt.btVector3_setValue(btTorqueImpulse, -torqueImpulse.x, torqueImpulse.y, torqueImpulse.z);
        // bt.btRigidBody_applyTorqueImpulse(this._btColliderObject, btTorqueImpulse);
    }
    wakeUp() {
        // this._btColliderObject && (Physics3D._bullet.btCollisionObject_activate(this._btColliderObject, false));
    }
    clearForces() {
        // var rigidBody = this._btColliderObject;
        // if (rigidBody == null)
        //     throw "Attempted to call a Physics function that is avaliable only when the Entity has been already added to the Scene.";
        // var bt = Physics3D._bullet;
        // bt.btRigidBody_clearForces(rigidBody);
        // var btZero = Rigidbody3D._btVector3Zero;
        // bt.btCollisionObject_setInterpolationLinearVelocity(rigidBody, btZero);
        // bt.btRigidBody_setLinearVelocity(rigidBody, btZero);
        // bt.btCollisionObject_setInterpolationAngularVelocity(rigidBody, btZero);
        // bt.btRigidBody_setAngularVelocity(rigidBody, btZero);
    }
}