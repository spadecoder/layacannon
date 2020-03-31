import ColliderShape from './ColliderShape';
export default class BoxColliderShape extends ColliderShape {
    _sizeX = 0;
    _sizeY = 0;
    _sizeZ = 0;
    static __init__() {
        // BoxColliderShape._btSize = Physics3D._bullet.btVector3_create(0, 0, 0);
    }
    get sizeX() {
        return this._sizeX;
    }
    get sizeY() {
        return this._sizeY;
    }
    get sizeZ() {
        return this._sizeZ;
    }
    constructor(sizeX = 1.0, sizeY = 1.0, sizeZ = 1.0, mass?:number) {
        super();
        this._sizeX = sizeX;
        this._sizeY = sizeY;
        this._sizeZ = sizeZ;
        this._type = ColliderShape.SHAPETYPES_BOX;

        // var bt = Physics3D._bullet;
        // bt.btVector3_setValue(BoxColliderShape._btSize, sizeX / 2, sizeY / 2, sizeZ / 2);
        // this._btShape = bt.btBoxShape_create(BoxColliderShape._btSize);

        var body = new CANNON.Body({
            mass: mass ? mass : 0,
            shape: new CANNON.Box(new CANNON.Vec3(sizeX/2, sizeY/2, sizeZ/2)),
         });

        this._shapeBody = body;

        // console.log("BoxColliderShape init", sizeX, sizeY, sizeZ);
    }
    clone() {
        var dest = new BoxColliderShape(this._sizeX, this._sizeY, this._sizeZ);
        this.cloneTo(dest);
        return dest;
    }
}