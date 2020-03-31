import CannonSimulation from './CannonSimulation';
import BoxColliderShape from './shape/BoxColliderShape';
import SphereColliderShape from './shape/SphereColliderShape';
import MeshColliderShape from './shape/MeshColliderShape';
import CannonScene3d from './CannonScene3d';
export default class CannonPhysicsComponent extends Laya.Component {
    protected _restitution = 0.0;
    protected _friction = 0.5;
    protected _rollingFriction = 0.0;
    protected _ccdMotionThreshold = 0.0;
    protected _ccdSweptSphereRadius = 0.0;
    protected _collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER;
    protected _canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER;
    protected _colliderShape: BoxColliderShape;
    protected _transformFlag = 2147483647;
    protected _enableProcessCollisions = true;
    public _inPhysicUpdateListIndex = -1;
    canScaleShape = true;
    protected _enabled = true;
    protected _simulation: CannonSimulation;

    static _physicObjectsMap = {};

    constructor(collisionGroup, canCollideWith) {
        super();
        this._restitution = 0.0;
        this._friction = 0.5;
        this._rollingFriction = 0.0;
        this._ccdMotionThreshold = 0.0;
        this._ccdSweptSphereRadius = 0.0;
        this._collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER;
        this._canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER;
        this._colliderShape = null;
        this._transformFlag = 2147483647;
        this._enableProcessCollisions = true;
        this._inPhysicUpdateListIndex = -1;
        this.canScaleShape = true;
        this._collisionGroup = collisionGroup;
        this._canCollideWith = canCollideWith;
    }
    static __init__() {
        // var bt = Physics3D._bullet;
        // CannonPhysicsComponent._btVector30 = bt.btVector3_create(0, 0, 0);
        // CannonPhysicsComponent._btQuaternion0 = bt.btQuaternion_create(0, 0, 0, 1);
    }
    static _createAffineTransformationArray(tranX, tranY, tranZ, rotX, rotY, rotZ, rotW, scale, outE) {
        var x2 = rotX + rotX, y2 = rotY + rotY, z2 = rotZ + rotZ;
        var xx = rotX * x2, xy = rotX * y2, xz = rotX * z2, yy = rotY * y2, yz = rotY * z2, zz = rotZ * z2;
        var wx = rotW * x2, wy = rotW * y2, wz = rotW * z2, sx = scale[0], sy = scale[1], sz = scale[2];
        outE[0] = (1 - (yy + zz)) * sx;
        outE[1] = (xy + wz) * sx;
        outE[2] = (xz - wy) * sx;
        outE[3] = 0;
        outE[4] = (xy - wz) * sy;
        outE[5] = (1 - (xx + zz)) * sy;
        outE[6] = (yz + wx) * sy;
        outE[7] = 0;
        outE[8] = (xz + wy) * sz;
        outE[9] = (yz - wx) * sz;
        outE[10] = (1 - (xx + yy)) * sz;
        outE[11] = 0;
        outE[12] = tranX;
        outE[13] = tranY;
        outE[14] = tranZ;
        outE[15] = 1;
    }
    static _creatShape(shapeData, mass?:number) {
        var colliderShape;
        switch (shapeData.type) {
            case "BoxColliderShape":
                var sizeData = shapeData.size;
                colliderShape = sizeData ? new BoxColliderShape(sizeData[0], sizeData[1], sizeData[2], mass) : new BoxColliderShape();
                break;
            case "SphereColliderShape":
                colliderShape = new SphereColliderShape(shapeData.radius, mass);
                break;
            // case "CapsuleColliderShape":
            //     colliderShape = new CapsuleColliderShape(shapeData.radius, shapeData.height, shapeData.orientation);
            //     break;
            case "MeshColliderShape":
                var meshCollider = new MeshColliderShape(mass);
                shapeData.mesh && (meshCollider.mesh = Laya.Loader.getRes(shapeData.mesh));
                colliderShape = meshCollider;
                break;
            // case "ConeColliderShape":
            //     colliderShape = new ConeColliderShape(shapeData.radius, shapeData.height, shapeData.orientation);
            //     break;
            // case "CylinderColliderShape":
            //     colliderShape = new CylinderColliderShape(shapeData.radius, shapeData.height, shapeData.orientation);
            //     break;
            default:
                throw "unknown shape type.";
        }
        if (shapeData.center) {
            var localOffset = colliderShape.localOffset;
            localOffset.fromArray(shapeData.center);
            colliderShape.localOffset = localOffset;
        }
        return colliderShape;
    }
    static physicVector3TransformQuat(source, qx, qy, qz, qw, out) {
        var x = source.x, y = source.y, z = source.z, ix = qw * x + qy * z - qz * y, iy = qw * y + qz * x - qx * z, iz = qw * z + qx * y - qy * x, iw = -qx * x - qy * y - qz * z;
        out.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        out.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        out.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    }
    static physicQuaternionMultiply(lx, ly, lz, lw, right, out) {
        var rx = right.x;
        var ry = right.y;
        var rz = right.z;
        var rw = right.w;
        var a = (ly * rz - lz * ry);
        var b = (lz * rx - lx * rz);
        var c = (lx * ry - ly * rx);
        var d = (lx * rx + ly * ry + lz * rz);
        out.x = (lx * rw + rx * lw) + a;
        out.y = (ly * rw + ry * lw) + b;
        out.z = (lz * rw + rz * lw) + c;
        out.w = lw * rw - d;
    }
    get restitution() {
        return this._restitution;
    }
    set restitution(value) {
        this._restitution = value;
        // this._btColliderObject && Physics3D._bullet.btCollisionObject_setRestitution(this._btColliderObject, value);
    }
    get friction() {
        return this._friction;
    }
    set friction(value) {
        this._friction = value;
        // this._btColliderObject && Physics3D._bullet.btCollisionObject_setFriction(this._btColliderObject, value);
    }
    get rollingFriction() {
        return this._rollingFriction;
    }
    set rollingFriction(value) {
        this._rollingFriction = value;
        // this._btColliderObject && Physics3D._bullet.btCollisionObject_setRollingFriction(this._btColliderObject, value);
    }
    get ccdMotionThreshold() {
        return this._ccdMotionThreshold;
    }
    set ccdMotionThreshold(value) {
        this._ccdMotionThreshold = value;
        // this._btColliderObject && Physics3D._bullet.btCollisionObject_setCcdMotionThreshold(this._btColliderObject, value);
    }
    get ccdSweptSphereRadius() {
        return this._ccdSweptSphereRadius;
    }
    set ccdSweptSphereRadius(value) {
        this._ccdSweptSphereRadius = value;
        // this._btColliderObject && Physics3D._bullet.btCollisionObject_setCcdSweptSphereRadius(this._btColliderObject, value);
    }
    get isActive() {
        // return this._btColliderObject ? Physics3D._bullet.btCollisionObject_isActive(this._btColliderObject) : false;
        return false;
    }
    get enabled() {
        return super.enabled;
    }
    set enabled(value) {
        if (this._enabled != value) {
            if (this._simulation && this._colliderShape) {
                if (value) {
                    this._derivePhysicsTransformation(true);
                    this._addToSimulation();
                }
                else {
                    this._removeFromSimulation();
                }
            }
            super.enabled = value;
        }
    }
    get colliderShape() {
        return this._colliderShape;
    }
    set colliderShape(value) {
        var lastColliderShape = this._colliderShape;
        if (lastColliderShape) {
            lastColliderShape._attatched = false;
            lastColliderShape._attatchedCollisionObject = null;
        }
        this._colliderShape = value;
        if (value) {
            if (value._attatched) {
                throw "CannonPhysicsComponent: this shape has attatched to other entity.";
            }
            else {
                value._attatched = true;
                value._attatchedCollisionObject = this;
            }
            // if (this._btColliderObject) {
            //     Physics3D._bullet.btCollisionObject_setCollisionShape(this._btColliderObject, value._btShape);
            //     var canInSimulation = this._simulation && this._enabled;
            //     (canInSimulation && lastColliderShape) && (this._removeFromSimulation());
            //     this._onShapeChange(value);
            //     if (canInSimulation) {
            //         this._derivePhysicsTransformation(true);
            //         this._addToSimulation();
            //     }
            // }
        }
        else {
            // if (this._simulation && this._enabled)
            //     lastColliderShape && this._removeFromSimulation();
        }
    }
    get simulation() {
        return this._simulation;
    }
    get collisionGroup() {
        return this._collisionGroup;
    }
    set collisionGroup(value) {
        if (this._collisionGroup !== value) {
            this._collisionGroup = value;
            if (this._simulation && this._colliderShape && this._enabled) {
                this._removeFromSimulation();
                this._addToSimulation();

                this.colliderShape._shapeBody.collisionFilterGroup = this._collisionGroup;
            }
        }

        console.log("set collisionGroup", this._colliderShape, this._collisionGroup);
    }
    get canCollideWith() {
        return this._canCollideWith;
    }
    set canCollideWith(value) {
        if (this._canCollideWith !== value) {
            this._canCollideWith = value;
            if (this._simulation && this._colliderShape && this._enabled) {
                this._removeFromSimulation();
                this._addToSimulation();

                this.colliderShape._shapeBody.collisionFilterMask = this._canCollideWith;
            }
        }

        console.log("set collisionFilterMask", this._colliderShape, this._canCollideWith);
    }
    _parseShape(shapesData, mass?:number) {
        var shapeCount = shapesData.length;
        if (shapeCount === 1) {
            var shape = CannonPhysicsComponent._creatShape(shapesData[0], mass);
            this.colliderShape = shape;
        }
        else {
            console.log("TODO: CompoundColliderShape");
            // var compoundShape = new CompoundColliderShape();
            // for (var i = 0; i < shapeCount; i++) {
            //     shape = CannonPhysicsComponent._creatShape(shapesData[i]);
            //     compoundShape.addChildShape(shape);
            // }
            // this.colliderShape = compoundShape;
        }

        CannonPhysicsComponent._physicObjectsMap[this.colliderShape._shapeBody.id] = this;
    }
    _onScaleChange(scale) {
        this._colliderShape._setScale(scale);
    }
    _onEnable() {
        let scene = this.owner.scene as CannonScene3d;

        this._simulation = scene.cannonSimulation;

        // Physics3D._bullet.btCollisionObject_setContactProcessingThreshold(this._btColliderObject, 1e30);
        // if (this._colliderShape && this._enabled) {
        //     this._derivePhysicsTransformation(true);
        //     this._addToSimulation();
        // }

        this._simulation.addCannonBody(this.colliderShape._shapeBody);
        this._bodyInit();
    }
    _bodyInit() {
        let owner = this.owner as any;
        let position = owner.transform.position;
        let rotation = owner.transform.rotation;

        let shapeBody = this.colliderShape._shapeBody;

        shapeBody.position = new CANNON.Vec3(position.x, position.y, position.z);
        shapeBody.quaternion = new CANNON.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
        shapeBody.computeAABB();

        shapeBody.hasTrigger = true;
        shapeBody.collisionResponse = true;

        let funcTriggered   = this._onTriggered.bind(this);
        let funcCollide     = this._onCollde.bind(this);

        for(let i=0; i<shapeBody.shapes.length; i++) {
            shapeBody.shapes[i].addEventListener("triggered", funcTriggered);
        }

        shapeBody.addEventListener("collide", funcCollide);
    }
    _onTriggered(e) {
        // console.log("triggered" ,e.event, e);

        let selfCollider    = CannonPhysicsComponent._physicObjectsMap[e.selfShape.body.id];
        let otherCollider   = CannonPhysicsComponent._physicObjectsMap[e.otherShape.body.id];

        this.simulation.emitEvent(selfCollider, otherCollider, e.event);
    }
    _onCollde(e) {
        // console.log("collide", e.event, e);

        let selfCollider    = CannonPhysicsComponent._physicObjectsMap[e.selfShape.body.id];
        let otherCollider   = CannonPhysicsComponent._physicObjectsMap[e.otherShape.body.id];

        this.simulation.emitEvent(selfCollider, otherCollider, e.event);
    }
    _onDisable() {
        if (this._colliderShape && this._enabled) {
            this._removeFromSimulation();
            (this._inPhysicUpdateListIndex !== -1) && (this._simulation._physicsUpdateList.remove(this));
        }
        this._simulation = null;
    }
    _onDestroy() {
        delete CannonPhysicsComponent._physicObjectsMap[this._colliderShape._shapeBody.id];

        // Physics3D._bullet.btCollisionObject_destroy(this._btColliderObject);
        // this._colliderShape.destroy();
        
        // super._onDestroy();

        // this._btColliderObject = null;

        this._colliderShape = null;
        this._simulation = null;

        let owner = this.owner as Laya.Sprite3D;
        owner.transform.off(Laya.Event.TRANSFORM_CHANGED, this, this._onTransformChanged);
    }
    _isValid() {
        return this._simulation && this._colliderShape && this._enabled;
    }
    _parse(data) {
        (data.collisionGroup != null) && (this.collisionGroup = data.collisionGroup);
        (data.canCollideWith != null) && (this.canCollideWith = data.canCollideWith);
        (data.ccdMotionThreshold != null) && (this.ccdMotionThreshold = data.ccdMotionThreshold);
        (data.ccdSweptSphereRadius != null) && (this.ccdSweptSphereRadius = data.ccdSweptSphereRadius);
    }
    _setTransformFlag(type, value) {
        if (value)
            this._transformFlag |= type;
        else
            this._transformFlag &= ~type;
    }
    _getTransformFlag(type) {
        return (this._transformFlag & type) != 0;
    }
    _addToSimulation() {
    }
    _removeFromSimulation() {
    }

    // static _btVector30 = new Laya.Vector3();
    // static _tempVector30 = new Laya.Vector3();
    // static _btQuaternion0 = new Laya.Vector4();
    // static _tempQuaternion0 = new Laya.Vector4();

    _derivePhysicsTransformation(force) {
        this._innerDerivePhysicsTransformationCannon(force);
    }
    _innerDerivePhysicsTransformationCannon(force) {
        var owner = this.owner as any;
        let Transform3D = Laya.Transform3D as any;

        var transform = owner._transform;

        let shapeBody = this.colliderShape._shapeBody;

        if (force || this._getTransformFlag(Transform3D.TRANSFORM_WORLDPOSITION)) {
            var shapeOffset = this._colliderShape.localOffset;
            var position = transform.position;

            if (shapeOffset.x !== 0 || shapeOffset.y !== 0 || shapeOffset.z !== 0) {
            }
            else {
            }

            shapeBody.position = new CANNON.Vec3(position.x, position.y, position.z);

            this._setTransformFlag(Transform3D.TRANSFORM_WORLDPOSITION, false);
        }
        if (force || this._getTransformFlag(Transform3D.TRANSFORM_WORLDQUATERNION)) {
            var shapeRotation = this._colliderShape.localRotation;
            var rotation = transform.rotation;

            if (shapeRotation.x !== 0 || shapeRotation.y !== 0 || shapeRotation.z !== 0 || shapeRotation.w !== 1) {
            }
            else {
            }

            shapeBody.quaternion = new CANNON.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);

            this._setTransformFlag(Transform3D.TRANSFORM_WORLDQUATERNION, false);
        }
        if (force || this._getTransformFlag(Transform3D.TRANSFORM_WORLDSCALE)) {
            this._onScaleChange(transform.getWorldLossyScale());
            this._setTransformFlag(Transform3D.TRANSFORM_WORLDSCALE, false);
        }

        shapeBody.computeAABB();
    }
    _updateTransformComponent(physicsTransform) {
        let owner = this.owner as any;

        let cannonPositon = this._colliderShape._shapeBody.position;
        let cannonQuaternion = this._colliderShape._shapeBody.quaternion;

        var localOffset = this._colliderShape.localOffset;

        var transform = owner._transform;
        var position = transform.position;
        var rotation = transform.rotation;

        position.x = localOffset.x + cannonPositon.x;
        position.y = localOffset.y + cannonPositon.y;
        position.z = localOffset.z + cannonPositon.z;

        rotation.x = cannonQuaternion.x;
        rotation.y = cannonQuaternion.y;
        rotation.z = cannonQuaternion.z;
        rotation.w = cannonQuaternion.w;

        transform.position = position;
        transform.rotation = rotation;
    }
    _onShapeChange(colShape) {
        // var btColObj = this._btColliderObject;
        // var bt = Physics3D._bullet;
        // var flags = bt.btCollisionObject_getCollisionFlags(btColObj);
        // if (colShape.needsCustomCollisionCallback) {
        //     if ((flags & CannonPhysicsComponent.COLLISIONFLAGS_CUSTOM_MATERIAL_CALLBACK) === 0)
        //         bt.btCollisionObject_setCollisionFlags(btColObj, flags | CannonPhysicsComponent.COLLISIONFLAGS_CUSTOM_MATERIAL_CALLBACK);
        // }
        // else {
        //     if ((flags & CannonPhysicsComponent.COLLISIONFLAGS_CUSTOM_MATERIAL_CALLBACK) > 0)
        //         bt.btCollisionObject_setCollisionFlags(btColObj, flags ^ CannonPhysicsComponent.COLLISIONFLAGS_CUSTOM_MATERIAL_CALLBACK);
        // }
    }
    _onAdded() {
        this.enabled = this._enabled;
        this.restitution = this._restitution;
        this.friction = this._friction;
        this.rollingFriction = this._rollingFriction;
        this.ccdMotionThreshold = this._ccdMotionThreshold;
        this.ccdSweptSphereRadius = this._ccdSweptSphereRadius;

        let owner = this.owner as any;

        // owner.transform.on(Laya.Event.TRANSFORM_CHANGED, this, this._onTransformChanged);
        
        console.log("CannonPhysicsComponent.onAdded", this.owner);

        owner.transform.on(Laya.Event.TRANSFORM_CHANGED, this, this._onTransformChanged);
    }

    static _addUpdateList = true; //TODO

    _onTransformChanged(flag) {
        if (CannonPhysicsComponent._addUpdateList) {
            let Transform3D = Laya.Transform3D as any;
            flag &= Transform3D.TRANSFORM_WORLDPOSITION | Transform3D.TRANSFORM_WORLDQUATERNION | Transform3D.TRANSFORM_WORLDSCALE;
            if (flag) {
                this._transformFlag |= flag;
                if (this._isValid() && this._inPhysicUpdateListIndex === -1)
                    this._simulation._physicsUpdateList.add(this);
            }
        }
    }
    _cloneTo(dest) {
        var destPhysicsComponent = dest;
        destPhysicsComponent.restitution = this._restitution;
        destPhysicsComponent.friction = this._friction;
        destPhysicsComponent.rollingFriction = this._rollingFriction;
        destPhysicsComponent.ccdMotionThreshold = this._ccdMotionThreshold;
        destPhysicsComponent.ccdSweptSphereRadius = this._ccdSweptSphereRadius;
        destPhysicsComponent.collisionGroup = this._collisionGroup;
        destPhysicsComponent.canCollideWith = this._canCollideWith;
        destPhysicsComponent.canScaleShape = this.canScaleShape;
        (this._colliderShape) && (destPhysicsComponent.colliderShape = this._colliderShape.clone());
    }
}