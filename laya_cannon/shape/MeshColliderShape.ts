import ColliderShape from './ColliderShape';
export default class MeshColliderShape extends ColliderShape {
    _convex = false;

    _mesh: Laya.Mesh;
    _mass: number;

    constructor(mass?:number) {
        super();
        this._mesh = null;
        this._convex = false;
        this._mass = mass ? mass : 0;
    }
    get mesh() {
        return this._mesh;
    }
    set mesh(value) {
        if (this._mesh !== value) {
            // var bt = Physics3D._bullet;
            if (this._mesh) {
                // bt.destroy(this._shapeBody);
            }
            if (value) {
                // this._shapeBody = bt.btGImpactMeshShape_create(value._getPhysicMesh());
                // bt.btGImpactShapeInterface_updateBound(this._shapeBody);

                var positions = [];
                value.getPositions(positions);
        
                let indices = value.getIndices();

                console.log("-->vertices", positions.length);
                console.log("-->indices", indices.length);

                let mesh = value as any;

                let cannonVertices = [];
                for(let i=0; i<positions.length; i++) {
                    let pos = positions[i];
                    // let posCannon = new CANNON.Vec3(pos.x, pos.y, pos.z);
                    cannonVertices.push(pos.x, pos.y, pos.z);
                }

                let cannonIndices = [];
                for(let i=0; i<indices.length; i+=3) {
                    cannonIndices.push(indices[i],indices[i+2],indices[i+1]);
                }

                let Trimesh = CANNON.Trimesh as any;

                // let shape = new CANNON.ConvexPolyhedron(cannonVertices,cannonIndices);
                let shape = new Trimesh(cannonVertices,cannonIndices);

                this._shapeBody = new CANNON.Body( {
                    mass: this._mass,
                    shape: shape,
                } );

                // console.log("O_O_O_O_O mesh", shape);
            }
            this._mesh = value;
        }
    }
    get convex() {
        return this._convex;
    }
    set convex(value) {
        this._convex = value;
    }
    _setScale(value) {
        if (this._compoundParent) {
            this.updateLocalTransformations();
        }
        else {
            // var bt = Physics3D._bullet;
            // bt.btVector3_setValue(ColliderShape._btScale, value.x, value.y, value.z);
            // bt.btCollisionShape_setLocalScaling(this._shapeBody, ColliderShape._btScale);
            // bt.btGImpactShapeInterface_updateBound(this._shapeBody);
        }
    }
    cloneTo(destObject) {
        var destMeshCollider = destObject;
        destMeshCollider.convex = this._convex;
        destMeshCollider.mesh = this._mesh;
        super.cloneTo(destObject);
    }
    clone() {
        var dest = new MeshColliderShape();
        this.cloneTo(dest);
        return dest;
    }
    destroy() {
        if (this._shapeBody) {
            // Physics3D._bullet.btCollisionShape_destroy(this._shapeBody);
            this._shapeBody = null;
        }
    }
}