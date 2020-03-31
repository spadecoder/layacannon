export default class ColliderShape {
    static SHAPEORIENTATION_UPX = 0;
    static SHAPEORIENTATION_UPY = 1;
    static SHAPEORIENTATION_UPZ = 2;
    static SHAPETYPES_BOX = 0;
    static SHAPETYPES_SPHERE = 1;
    static SHAPETYPES_CYLINDER = 2;
    static SHAPETYPES_CAPSULE = 3;
    static SHAPETYPES_CONVEXHULL = 4;
    static SHAPETYPES_COMPOUND = 5;
    static SHAPETYPES_STATICPLANE = 6;
    static SHAPETYPES_CONE = 7;
    static _tempVector30 = new Laya.Vector3();

   _scale = new Laya.Vector3(1, 1, 1);
   _centerMatrix = new Laya.Matrix4x4();
   _attatched = false;
   _indexInCompound = -1;
   _compoundParent = null;
   _attatchedCollisionObject = null;
   _referenceCount = 0;
   _localOffset = new Laya.Vector3(0, 0, 0);
   _localRotation = new Laya.Quaternion(0, 0, 0, 1);
   needsCustomCollisionCallback = false;

   _type: Number;

   _shapeBody: CANNON.Body;

    constructor() {
        this._scale = new Laya.Vector3(1, 1, 1);
        this._centerMatrix = new Laya.Matrix4x4();
        this._attatched = false;
        this._indexInCompound = -1;
        this._compoundParent = null;
        this._attatchedCollisionObject = null;
        this._referenceCount = 0;
        this._localOffset = new Laya.Vector3(0, 0, 0);
        this._localRotation = new Laya.Quaternion(0, 0, 0, 1);
        this.needsCustomCollisionCallback = false;
    }
    static __init__() {
        // var bt = Physics3D._bullet;
        // ColliderShape._btScale = bt.btVector3_create(1, 1, 1);
        // ColliderShape._btVector30 = bt.btVector3_create(0, 0, 0);
        // ColliderShape._btQuaternion0 = bt.btQuaternion_create(0, 0, 0, 1);
        // ColliderShape._btTransform0 = bt.btTransform_create();
    }
    static _createAffineTransformation(trans, rot, outE) {
        var x = rot.x, y = rot.y, z = rot.z, w = rot.w, x2 = x + x, y2 = y + y, z2 = z + z;
        var xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2;
        var wx = w * x2, wy = w * y2, wz = w * z2;
        outE[0] = (1 - (yy + zz));
        outE[1] = (xy + wz);
        outE[2] = (xz - wy);
        outE[3] = 0;
        outE[4] = (xy - wz);
        outE[5] = (1 - (xx + zz));
        outE[6] = (yz + wx);
        outE[7] = 0;
        outE[8] = (xz + wy);
        outE[9] = (yz - wx);
        outE[10] = (1 - (xx + yy));
        outE[11] = 0;
        outE[12] = trans.x;
        outE[13] = trans.y;
        outE[14] = trans.z;
        outE[15] = 1;
    }
    get type() {
        return this._type;
    }
    get localOffset() {
        return this._localOffset;
    }
    set localOffset(value) {
        this._localOffset = value;
        if (this._compoundParent)
            this._compoundParent._updateChildTransform(this);
    }
    get localRotation() {
        return this._localRotation;
    }
    set localRotation(value) {
        this._localRotation = value;
        if (this._compoundParent)
            this._compoundParent._updateChildTransform(this);
    }
    _setScale(value) {
        if (this._compoundParent) {
            this.updateLocalTransformations();
        }
        else {
            // var bt = Physics3D._bullet;
            // bt.btVector3_setValue(ColliderShape._btScale, value.x, value.y, value.z);
            // bt.btCollisionShape_setLocalScaling(this._shapeBody, ColliderShape._btScale);
            console.log("TODO CANNON SCALE SHAPE");
        }
    }
    _addReference() {
        this._referenceCount++;
    }
    _removeReference() {
        this._referenceCount--;
    }
    updateLocalTransformations() {
        if (this._compoundParent) {
            var offset = ColliderShape._tempVector30;
            Laya.Vector3.multiply(this.localOffset, this._scale, offset);
            ColliderShape._createAffineTransformation(offset, this.localRotation, this._centerMatrix.elements);
        }
        else {
            ColliderShape._createAffineTransformation(this.localOffset, this.localRotation, this._centerMatrix.elements);
        }
    }
    cloneTo(destObject) {
        var destColliderShape = destObject;
        this._localOffset.cloneTo(destColliderShape.localOffset);
        this._localRotation.cloneTo(destColliderShape.localRotation);
        destColliderShape.localOffset = destColliderShape.localOffset;
        destColliderShape.localRotation = destColliderShape.localRotation;
    }
    clone() {
        return null;
    }
    destroy() {
        // if (this._shapeBody) {
        //     Physics3D._bullet.btCollisionShape_destroy(this._shapeBody);
        //     this._shapeBody = null;
        // }
    }
}