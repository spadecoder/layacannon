import CannonScene3d from './CannonScene3d';
import CannonPhysicsCollider from './CannonPhysicsCollider';
import CannonRigidbody3D from './CannonRigidbody3D';

export default class CannonHelper {
    
    static registCannon() {
        Laya.ClassUtils.regClass("PhysicsCollider", CannonPhysicsCollider);
        Laya.ClassUtils.regClass("Rigidbody3D", CannonRigidbody3D);

        CannonHelper.registCannonScene3d();
    }

    static registCannonScene3d() {
        let Scene3DUtils = Laya.Scene3DUtils as any;

        Scene3DUtils._createSprite3DInstance = function(nodeData, spriteMap, outBatchSprites) {
	        var node;
	        switch (nodeData.type) {
	            case "Scene3D":
	                node = new CannonScene3d();
	                break;
	            case "Sprite3D":
	                node = new Laya.Sprite3D();
	                break;
	            case "MeshSprite3D":
	                node = new Laya.MeshSprite3D();
	                (outBatchSprites && nodeData.props.isStatic) && (outBatchSprites.push(node));
	                break;
	            case "SkinnedMeshSprite3D":
	                node = new Laya.SkinnedMeshSprite3D();
	                break;
	            case "ShuriKenParticle3D":
	                node = new Laya.ShuriKenParticle3D();
	                break;
	            case "Camera":
	                node = new Laya.Camera();
	                break;
	            case "DirectionLight":
	                node = new Laya.DirectionLight();
	                break;
	            case "PointLight":
	                node = new Laya.PointLight();
	                break;
	            case "SpotLight":
	                node = new Laya.SpotLight();
	                break;
	            case "TrailSprite3D":
	                node = new Laya.TrailSprite3D();
	                break;
	            default:
	                throw new Error("Utils3D:unidentified class type in (.lh) file.");
	        }
	        var childData = nodeData.child;
	        if (childData) {
	            for (var i = 0, n = childData.length; i < n; i++) {
	                var child = Scene3DUtils._createSprite3DInstance(childData[i], spriteMap, outBatchSprites);
	                node.addChild(child);
	            }
	        }
	        spriteMap[nodeData.instanceID] = node;
	        return node;
        }
        Scene3DUtils._createNodeByJson = function (nodeData, outBatchSprites) {
	        var node;
	        switch (nodeData.type) {
	            case "Scene3D":
	                node = new CannonScene3d();
	                break;
	            case "Sprite3D":
	                node = new Laya.Sprite3D();
	                break;
	            case "MeshSprite3D":
	                node = new Laya.MeshSprite3D();
	                (outBatchSprites && nodeData.props.isStatic) && (outBatchSprites.push(node));
	                break;
	            case "SkinnedMeshSprite3D":
	                node = new Laya.SkinnedMeshSprite3D();
	                break;
	            case "ShuriKenParticle3D":
	                node = new Laya.ShuriKenParticle3D();
	                break;
	            case "Camera":
	                node = new Laya.Camera();
	                break;
	            case "DirectionLight":
	                node = new Laya.DirectionLight();
	                break;
	            case "PointLight":
	                node = new Laya.PointLight();
	                break;
	            case "SpotLight":
	                node = new Laya.SpotLight();
	                break;
	            case "TrailSprite3D":
	                node = new Laya.TrailSprite3D();
	                break;
	            default:
	                throw new Error("Utils3D:unidentified class type in (.lh) file.");
	        }
	        var childData = nodeData.child;
	        if (childData) {
	            for (var i = 0, n = childData.length; i < n; i++) {
	                var child = Scene3DUtils._createNodeByJson(childData[i], outBatchSprites);
	                node.addChild(child);
	            }
	        }
	        var componentsData = nodeData.components;
	        if (componentsData) {
	            for (var j = 0, m = componentsData.length; j < m; j++) {
	                var data = componentsData[j];
	                var clas = Laya.ClassUtils.getRegClass(data.type);
	                if (clas) {
	                    var component = node.addComponent(clas);
	                    component._parse(data);
	                }
	                else {
	                    console.warn("Unkown component type.");
	                }
	            }
	        }
	        node._parse(nodeData.props, null);
	        return node;
	    }
    }
}