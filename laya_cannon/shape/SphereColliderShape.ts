import ColliderShape from './ColliderShape';
export default class SphereColliderShape extends ColliderShape {
    private _radius = 0;
    get radius() {
        return this._radius;
    }
    constructor(radius = 0.5,mass?:number) {
        super();
        this._radius = radius;
        this._type = ColliderShape.SHAPETYPES_SPHERE;
        
        // this._btShape = Physics3D._bullet.btSphereShape_create(radius);

        var body = new CANNON.Body({
            mass: mass ? mass : 0,
            shape: new CANNON.Sphere(radius),
         });

        this._shapeBody = body;

        console.log("SphereColliderShape init", radius);
    }
    clone() {
        var dest = new SphereColliderShape(this._radius);
        this.cloneTo(dest);
        return dest;
    }
}