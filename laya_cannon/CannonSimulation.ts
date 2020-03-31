import CannonPhysicsComponent from './CannonPhysicsComponent';
import CannonPhysicsCollider from './CannonPhysicsCollider';
import CannonRigidbody3D from './CannonRigidbody3D';
/**
 * <code>Simulation</code> 类用于创建Cannon模拟器。
 */
export default class CannonSimulation {
	/** @internal */
	private static _btTempVector30: number;
	/** @internal */
	private static _btTempVector31: number;
	/** @internal */
	private static _btTempQuaternion0: number;
	/** @internal */
	private static _btTempQuaternion1: number;
	/** @internal */
	private static _btTempTransform0: number;
	/** @internal */
	private static _btTempTransform1: number;
	/** @internal */
	private static _tempVector30: Laya.Vector3 = new Laya.Vector3();

	/*是否禁用所有模拟器。*/
	static disableSimulation: boolean = false;

	/**
	* @internal
	*/
	static __init__(): void {
		// var bt: any = Physics3D._bullet;
		// CannonSimulation._btTempVector30 = bt.btVector3_create(0, 0, 0);
		// CannonSimulation._btTempVector31 = bt.btVector3_create(0, 0, 0);
		// CannonSimulation._btTempQuaternion0 = bt.btQuaternion_create(0, 0, 0, 1);
		// CannonSimulation._btTempQuaternion1 = bt.btQuaternion_create(0, 0, 0, 1);
		// CannonSimulation._btTempTransform0 = bt.btTransform_create();
		// CannonSimulation._btTempTransform1 = bt.btTransform_create();
	}

	/**
	 * 创建限制刚体运动的约束条件。
	 */
	static createConstraint(): void {//TODO: 两种重载函数
		//TODO:
	}

	// /** @internal */
	private _btDiscreteDynamicsWorld: number;
	// /** @internal */
	// private _btCollisionWorld: number;
	// /** @internal */
	// private _btDispatcher: number;
	// /** @internal */
	// private _btCollisionConfiguration: number;
	// /** @internal */
	// private _btBroadphase: number;
	// /** @internal */
	// private _btSolverInfo: number;
	// /** @internal */
	// private _btDispatchInfo: number;
	// /** @internal */
	private _gravity: Laya.Vector3 = new Laya.Vector3(0, -10, 0);

	// /** @internal */
	// private _btVector3Zero: number = Physics3D._bullet.btVector3_create(0, 0, 0);
	// /** @internal */
	// private _btDefaultQuaternion: number = Physics3D._bullet.btQuaternion_create(0, 0, 0, -1);
	// /** @internal */
	// private _btClosestRayResultCallback: number;
	// /** @internal */
	// private _btAllHitsRayResultCallback: number;
	// /** @internal */
	// private _btClosestConvexResultCallback: number;
	// /** @internal */
	// private _btAllConvexResultCallback: number;

	// /** @internal */
	// private _collisionsUtils: CollisionTool = new CollisionTool();
	// /** @internal */
	// private _previousFrameCollisions: Collision[] = [];
	// /** @internal */
	// private _currentFrameCollisions: Collision[] = [];

	// /** @internal */
	_physicsUpdateList: any = new Laya.PhysicsUpdateList();
	// /**@internal	*/
	_characters: CannonPhysicsComponent[] = [];
	// /**@internal	*/
	_updatedRigidbodies: number = 0;

	/**物理引擎在一帧中用于补偿减速的最大次数：模拟器每帧允许的最大模拟次数，如果引擎运行缓慢,可能需要增加该次数，否则模拟器会丢失“时间",引擎间隔时间小于maxSubSteps*fixedTimeStep非常重要。*/
	maxSubSteps: number = 1;
	/**物理模拟器帧的间隔时间:通过减少fixedTimeStep可增加模拟精度，默认是1.0 / 60.0。*/
	fixedTimeStep: number = 1.0 / 60.0;

	world: CANNON.World;

	/**
	 * 是否进行连续碰撞检测。
	 */
	get continuousCollisionDetection(): boolean {
		// return Physics3D._bullet.btCollisionWorld_get_m_useContinuous(this._btDispatchInfo);
		return false;
	}

	set continuousCollisionDetection(value: boolean) {
		// Physics3D._bullet.btCollisionWorld_set_m_useContinuous(this._btDispatchInfo, value);
	}

	/**
	 * 获取重力。
	 */
	get gravity(): Laya.Vector3 {
		if (!this._btDiscreteDynamicsWorld)
			throw "Simulation:Cannot perform this action when the physics engine is set to CollisionsOnly";
		return this._gravity;
	}

	set gravity(value: Laya.Vector3) {
		if (!this._btDiscreteDynamicsWorld)
			throw "Simulation:Cannot perform this action when the physics engine is set to CollisionsOnly";

		this._gravity = value;
		// var bt: any = Physics3D._bullet;
		// var btGravity: number = CannonSimulation._btTempVector30;
		// bt.btVector3_setValue(btGravity, -value.x, value.y, value.z);//TODO:是否先get省一个变量
		// bt.btDiscreteDynamicsWorld_setGravity(this._btDiscreteDynamicsWorld, btGravity);
	}

	/**
	 * @internal
	 */
	get speculativeContactRestitution(): boolean {
		if (!this._btDiscreteDynamicsWorld)
			throw "Simulation:Cannot Cannot perform this action when the physics engine is set to CollisionsOnly";
		// return Physics3D._bullet.btDiscreteDynamicsWorld_getApplySpeculativeContactRestitution(this._btDiscreteDynamicsWorld);
		return false;
	}

	/**
	 * @internal
	 */
	set speculativeContactRestitution(value: boolean) {
		if (!this._btDiscreteDynamicsWorld)
			throw "Simulation:Cannot Cannot perform this action when the physics engine is set to CollisionsOnly";
		// Physics3D._bullet.btDiscreteDynamicsWorld_setApplySpeculativeContactRestitution(this._btDiscreteDynamicsWorld, value);
	}

	/**
	 * @internal
	 * 创建一个 <code>Simulation</code> 实例。
	 */
	constructor(configuration: Laya.PhysicsSettings, flags: number = 0) {
		this.maxSubSteps = configuration.maxSubSteps;
		this.fixedTimeStep = configuration.fixedTimeStep;
		this.createCannonWorld();
	}

	createCannonWorld() {
		let world = new CANNON.World()

        world.gravity.set(0, -9, 0); // m/s²
		
		this.world = world;

		console.log("Cannon init");
	}

	addCannonBody(body:CANNON.Body) {
		console.log("addCannonBody:", body);
		if(body) {
			this.world.addBody(body);
		}
	}

	/**
	 * @internal
	 */
	_simulate(deltaTime: number): void {
		// this._updatedRigidbodies = 0;
		// var bt: any = Physics3D._bullet;
		// if (this._btDiscreteDynamicsWorld)
		// 	bt.btDiscreteDynamicsWorld_stepSimulation(this._btDiscreteDynamicsWorld, deltaTime, this.maxSubSteps, this.fixedTimeStep);
		// else
		// 	bt.PerformDiscreteCollisionDetection(this._btCollisionWorld);

		// var fixedTimeStep = 1.0 / 60.0; // seconds
		// var maxSubSteps = 3;
		
		this.world.step(this.fixedTimeStep,deltaTime,this.maxSubSteps);

		// console.log("Cannon update",this.fixedTimeStep,deltaTime,this.maxSubSteps);
	}

	/**
	 * @internal
	 */
	_destroy(): void {
		// var bt: any = Physics3D._bullet;
		// if (this._btDiscreteDynamicsWorld) {
		// 	bt.btCollisionWorld_destroy(this._btDiscreteDynamicsWorld);
		// 	this._btDiscreteDynamicsWorld = null;
		// } else {
		// 	bt.btCollisionWorld_destroy(this._btCollisionWorld);
		// 	this._btCollisionWorld = null;
		// }

		// bt.btDbvtBroadphase_destroy(this._btBroadphase);
		// this._btBroadphase = null;
		// bt.btCollisionDispatcher_destroy(this._btDispatcher);
		// this._btDispatcher = null;
		// bt.btDefaultCollisionConfiguration_destroy(this._btCollisionConfiguration);
		// this._btCollisionConfiguration = null;
	}

	/**
	 * @internal
	 */
	_addPhysicsCollider(component: CannonPhysicsCollider, group: number, mask: number): void {
		// Physics3D._bullet.btCollisionWorld_addCollisionObject(this._btCollisionWorld, component._btColliderObject, group, mask);
		console.log("Cannon._addPhysicsCollider", component, group, mask);
	}

	/**
	 * @internal
	 */
	_removePhysicsCollider(component: CannonPhysicsCollider): void {
		// Physics3D._bullet.btCollisionWorld_removeCollisionObject(this._btCollisionWorld, component._btColliderObject);
	}

	/**
	 * @internal
	 */
	_addRigidBody(rigidBody: CannonRigidbody3D, group: number, mask: number): void {
		// if (!this._btDiscreteDynamicsWorld)
		// 	throw "Simulation:Cannot perform this action when the physics engine is set to CollisionsOnly";
		// Physics3D._bullet.btDiscreteDynamicsWorld_addRigidBody(this._btCollisionWorld, rigidBody._btColliderObject, group, mask);
	}

	/**
	 * @internal
	 */
	_removeRigidBody(rigidBody: CannonRigidbody3D): void {
		// if (!this._btDiscreteDynamicsWorld)
		// 	throw "Simulation:Cannot perform this action when the physics engine is set to CollisionsOnly";
		// Physics3D._bullet.btDiscreteDynamicsWorld_removeRigidBody(this._btCollisionWorld, rigidBody._btColliderObject);
	}

	/**
	 * @internal
	 */
	_addCharacter(character: Laya.CharacterController, group: number, mask: number): void {
		if (!this._btDiscreteDynamicsWorld)
			throw "Simulation:Cannot perform this action when the physics engine is set to CollisionsOnly";
		// var bt: any = Physics3D._bullet;
		// bt.btCollisionWorld_addCollisionObject(this._btCollisionWorld, character._btColliderObject, group, mask);
		// bt.btDynamicsWorld_addAction(this._btCollisionWorld, character._btKinematicCharacter);
	}

	/**
	 * @internal
	 */
	_removeCharacter(character: Laya.CharacterController): void {
		if (!this._btDiscreteDynamicsWorld)
			throw "Simulation:Cannot perform this action when the physics engine is set to CollisionsOnly";
		// var bt: any = Physics3D._bullet;
		// bt.btCollisionWorld_removeCollisionObject(this._btCollisionWorld, character._btColliderObject);
		// bt.btDynamicsWorld_removeAction(this._btCollisionWorld, character._btKinematicCharacter);
	}

	/**
	 * 射线检测第一个碰撞物体。
	 * @param	from 起始位置。
	 * @param	to 结束位置。
	 * @param	out 碰撞结果。
	 * @param   collisonGroup 射线所属碰撞组。
	 * @param   collisionMask 与射线可产生碰撞的组。
	 * @return 	是否成功。
	 */
	raycastFromTo(from: Laya.Vector3, to: Laya.Vector3, out: Laya.HitResult = null, collisonGroup: number = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, collisionMask: number = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER): boolean {
		let fromCanon 	= new CANNON.Vec3(from.x, from.y, from.z);
		let toCanon 	= new CANNON.Vec3(to.x, to.y, to.z);
		let hitResult 	= new CANNON.RaycastResult();
		
		let options 	= {
			collisionFilterMask: collisionMask,
			collisionFilterGroup: collisonGroup,
			skipBackFaces: false,
			checkCollisionResponse: false,
		}
		
		this.world.raycastClosest(fromCanon, toCanon, options, hitResult);

		if(hitResult.hasHit) {
			if(out) {
				let hitPoint = hitResult.hitPointWorld;
				let hitNormalWorld = hitResult.hitNormalWorld;

				out.point.x = hitPoint.x;
				out.point.y = hitPoint.y;
				out.point.z = hitPoint.z;

				out.normal.x = hitNormalWorld.x;
				out.normal.y = hitNormalWorld.y;
				out.normal.z = hitNormalWorld.z;

				out.succeeded = true;

				// out.hitFraction TODO

				out.collider = CannonPhysicsComponent._physicObjectsMap[hitResult.body.id];
			}
			return true;
		}
		if (out)
			out.succeeded = false;

		return false;
	}

	/**
	 * 射线检测所有碰撞的物体。
	 * @param	from 起始位置。
	 * @param	to 结束位置。
	 * @param	out 碰撞结果[数组元素会被回收]。
	 * @param   collisonGroup 射线所属碰撞组。
	 * @param   collisionMask 与射线可产生碰撞的组。
	 * @return 	是否成功。
	 */
	raycastAllFromTo(from: Laya.Vector3, to: Laya.Vector3, out: Laya.HitResult[], collisonGroup: number = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, collisionMask: number = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER): boolean {
		// var bt: any = Physics3D._bullet;
		// var rayResultCall: number = this._btAllHitsRayResultCallback;
		// var rayFrom: number = CannonSimulation._btTempVector30;
		// var rayTo: number = CannonSimulation._btTempVector31;

		// out.length = 0;
		// bt.btVector3_setValue(rayFrom, -from.x, from.y, from.z);
		// bt.btVector3_setValue(rayTo, -to.x, to.y, to.z);
		// bt.AllHitsRayResultCallback_set_m_rayFromWorld(rayResultCall, rayFrom);
		// bt.AllHitsRayResultCallback_set_m_rayToWorld(rayResultCall, rayTo);
		// bt.RayResultCallback_set_m_collisionFilterGroup(rayResultCall, collisonGroup);
		// bt.RayResultCallback_set_m_collisionFilterMask(rayResultCall, collisionMask);

		// //rayResultCall.set_m_collisionObject(null);//还原默认值
		// //rayResultCall.set_m_closestHitFraction(1);//还原默认值
		// var collisionObjects: number = bt.AllHitsRayResultCallback_get_m_collisionObjects(rayResultCall);
		// var btPoints: number = bt.AllHitsRayResultCallback_get_m_hitPointWorld(rayResultCall);
		// var btNormals: number = bt.AllHitsRayResultCallback_get_m_hitNormalWorld(rayResultCall);
		// var btFractions: number = bt.AllHitsRayResultCallback_get_m_hitFractions(rayResultCall);
		// bt.tBtCollisionObjectArray_clear(collisionObjects);//清空检测队列
		// bt.tVector3Array_clear(btPoints);
		// bt.tVector3Array_clear(btNormals);
		// bt.tScalarArray_clear(btFractions);
		// bt.btCollisionWorld_rayTest(this._btCollisionWorld, rayFrom, rayTo, rayResultCall);
		// var count: number = bt.tBtCollisionObjectArray_size(collisionObjects);
		// if (count > 0) {
		// 	this._collisionsUtils.recoverAllHitResultsPool();
		// 	for (var i: number = 0; i < count; i++) {
		// 		var hitResult: Laya.HitResult = this._collisionsUtils.getHitResult();
		// 		out.push(hitResult);
		// 		hitResult.succeeded = true;
		// 		hitResult.collider = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(bt.tBtCollisionObjectArray_at(collisionObjects, i))];
		// 		hitResult.hitFraction = bt.tScalarArray_at(btFractions, i);
		// 		var btPoint: number = bt.tVector3Array_at(btPoints, i);//取出后需要立即赋值,防止取出法线时被覆盖
		// 		var pointE: Laya.Vector3 = hitResult.point;
		// 		pointE.x = -bt.btVector3_x(btPoint);
		// 		pointE.y = bt.btVector3_y(btPoint);
		// 		pointE.z = bt.btVector3_z(btPoint);
		// 		var btNormal: number = bt.tVector3Array_at(btNormals, i);
		// 		var normal: Laya.Vector3 = hitResult.normal;
		// 		normal.x = -bt.btVector3_x(btNormal);
		// 		normal.y = bt.btVector3_y(btNormal);
		// 		normal.z = bt.btVector3_z(btNormal);
		// 	}
		// 	return true;
		// } else {
		// 	return false;
		// }
		return false;
	}

	/**
	 *  射线检测第一个碰撞物体。
	 * @param  	ray        射线
	 * @param  	outHitInfo 与该射线发生碰撞的第一个碰撞器的碰撞信息
	 * @param  	distance   射线长度,默认为最大值
	 * @param   collisonGroup 射线所属碰撞组。
	 * @param   collisionMask 与射线可产生碰撞的组。
	 * @return 	是否检测成功。
	 */
	rayCast(ray: Laya.Ray, outHitResult: Laya.HitResult = null, distance: number = 2147483647/*Int.MAX_VALUE*/, collisonGroup: number = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, collisionMask: number = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER): boolean {
		var from: Laya.Vector3 = ray.origin;
		var to: Laya.Vector3 = CannonSimulation._tempVector30;
		Laya.Vector3.normalize(ray.direction, to);
		Laya.Vector3.scale(to, distance, to);
		Laya.Vector3.add(from, to, to);
		return this.raycastFromTo(from, to, outHitResult, collisonGroup, collisionMask);
	}

	/**
	 * 射线检测所有碰撞的物体。
	 * @param  	ray        射线
	 * @param  	out 碰撞结果[数组元素会被回收]。
	 * @param  	distance   射线长度,默认为最大值
	 * @param   collisonGroup 射线所属碰撞组。
	 * @param   collisionMask 与射线可产生碰撞的组。
	 * @return 	是否检测成功。
	 */
	rayCastAll(ray: Laya.Ray, out: Laya.HitResult[], distance: number = 2147483647/*Int.MAX_VALUE*/, collisonGroup: number = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, collisionMask: number = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER): boolean {
		var from: Laya.Vector3 = ray.origin;
		var to: Laya.Vector3 = CannonSimulation._tempVector30;
		Laya.Vector3.normalize(ray.direction, to);
		Laya.Vector3.scale(to, distance, to);
		Laya.Vector3.add(from, to, to);
		return this.raycastAllFromTo(from, to, out, collisonGroup, collisionMask);
	}

	/**
	 * 形状检测第一个碰撞的物体。
	 * @param   shape 形状。
	 * @param	fromPosition 世界空间起始位置。
	 * @param	toPosition 世界空间结束位置。
	 * @param	out 碰撞结果。
	 * @param	fromRotation 起始旋转。
	 * @param	toRotation 结束旋转。
	 * @param   collisonGroup 射线所属碰撞组。
	 * @param   collisionMask 与射线可产生碰撞的组。
	 * @return 	是否成功。
	 */
	shapeCast(shape: Laya.ColliderShape, fromPosition: Laya.Vector3, toPosition: Laya.Vector3, out: Laya.HitResult = null, fromRotation: Laya.Quaternion = null, toRotation: Laya.Quaternion = null, collisonGroup: number = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, collisionMask: number = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, allowedCcdPenetration: number = 0.0): boolean {
		// var bt: any = Physics3D._bullet;
		// var convexResultCall: number = this._btClosestConvexResultCallback;
		// var convexPosFrom: number = CannonSimulation._btTempVector30;
		// var convexPosTo: number = CannonSimulation._btTempVector31;
		// var convexRotFrom: number = CannonSimulation._btTempQuaternion0;
		// var convexRotTo: number = CannonSimulation._btTempQuaternion1;
		// var convexTransform: number = CannonSimulation._btTempTransform0;
		// var convexTransTo: number = CannonSimulation._btTempTransform1;

		// var sweepShape: number = shape._btShape;

		// bt.btVector3_setValue(convexPosFrom, -fromPosition.x, fromPosition.y, fromPosition.z);
		// bt.btVector3_setValue(convexPosTo, -toPosition.x, toPosition.y, toPosition.z);
		// //convexResultCall.set_m_convexFromWorld(convexPosFrom);
		// //convexResultCall.set_m_convexToWorld(convexPosTo);
		// bt.ConvexResultCallback_set_m_collisionFilterGroup(convexResultCall, collisonGroup);
		// bt.ConvexResultCallback_set_m_collisionFilterMask(convexResultCall, collisionMask);

		// bt.btTransform_setOrigin(convexTransform, convexPosFrom);
		// bt.btTransform_setOrigin(convexTransTo, convexPosTo);

		// if (fromRotation) {
		// 	bt.btQuaternion_setValue(convexRotFrom, -fromRotation.x, fromRotation.y, fromRotation.z, -fromRotation.w);
		// 	bt.btTransform_setRotation(convexTransform, convexRotFrom);
		// } else {
		// 	bt.btTransform_setRotation(convexTransform, this._btDefaultQuaternion);
		// }
		// if (toRotation) {
		// 	bt.btQuaternion_setValue(convexRotTo, -toRotation.x, toRotation.y, toRotation.z, -toRotation.w);
		// 	bt.btTransform_setRotation(convexTransTo, convexRotTo);
		// } else {
		// 	bt.btTransform_setRotation(convexTransTo, this._btDefaultQuaternion);
		// }

		// bt.ClosestConvexResultCallback_set_m_hitCollisionObject(convexResultCall, null);//还原默认值
		// bt.ConvexResultCallback_set_m_closestHitFraction(convexResultCall, 1);//还原默认值
		// bt.btCollisionWorld_convexSweepTest(this._btCollisionWorld, sweepShape, convexTransform, convexTransTo, convexResultCall, allowedCcdPenetration);
		// if (bt.ConvexResultCallback_hasHit(convexResultCall)) {
		// 	if (out) {
		// 		out.succeeded = true;
		// 		out.collider = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(bt.ClosestConvexResultCallback_get_m_hitCollisionObject(convexResultCall))];
		// 		out.hitFraction = bt.ConvexResultCallback_get_m_closestHitFraction(convexResultCall);
		// 		var btPoint: number = bt.ClosestConvexResultCallback_get_m_hitPointWorld(convexResultCall);
		// 		var btNormal: number = bt.ClosestConvexResultCallback_get_m_hitNormalWorld(convexResultCall);
		// 		var point: Laya.Vector3 = out.point;
		// 		var normal: Laya.Vector3 = out.normal;
		// 		point.x = -bt.btVector3_x(btPoint);
		// 		point.y = bt.btVector3_y(btPoint);
		// 		point.z = bt.btVector3_z(btPoint);
		// 		normal.x = -bt.btVector3_x(btNormal);
		// 		normal.y = bt.btVector3_y(btNormal);
		// 		normal.z = bt.btVector3_z(btNormal);
		// 	}
		// 	return true;
		// } else {
		// 	if (out)
		// 		out.succeeded = false;
		// 	return false;
		// }

		return false;
	}

	/**
	 * 形状检测所有碰撞的物体。
	 * @param   shape 形状。
	 * @param	fromPosition 世界空间起始位置。
	 * @param	toPosition 世界空间结束位置。
	 * @param	out 碰撞结果[数组元素会被回收]。
	 * @param	fromRotation 起始旋转。
	 * @param	toRotation 结束旋转。
	 * @param   collisonGroup 射线所属碰撞组。
	 * @param   collisionMask 与射线可产生碰撞的组。
	 * @return 	是否成功。
	 */
	shapeCastAll(shape: Laya.ColliderShape, fromPosition: Laya.Vector3, toPosition: Laya.Vector3, out: Laya.HitResult[], fromRotation: Laya.Quaternion = null, toRotation: Laya.Quaternion = null, collisonGroup: number = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, collisionMask: number = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, allowedCcdPenetration: number = 0.0): boolean {
		// var bt: any = Physics3D._bullet;
		// var convexResultCall: number = this._btAllConvexResultCallback;
		// var convexPosFrom: number = CannonSimulation._btTempVector30;
		// var convexPosTo: number = CannonSimulation._btTempVector31;
		// var convexRotFrom: number = CannonSimulation._btTempQuaternion0;
		// var convexRotTo: number = CannonSimulation._btTempQuaternion1;
		// var convexTransform: number = CannonSimulation._btTempTransform0;
		// var convexTransTo: number = CannonSimulation._btTempTransform1;

		// var sweepShape: number = shape._btShape;

		// out.length = 0;
		// bt.btVector3_setValue(convexPosFrom, -fromPosition.x, fromPosition.y, fromPosition.z);
		// bt.btVector3_setValue(convexPosTo, -toPosition.x, toPosition.y, toPosition.z);

		// //convexResultCall.set_m_convexFromWorld(convexPosFrom);
		// //convexResultCall.set_m_convexToWorld(convexPosTo);

		// bt.ConvexResultCallback_set_m_collisionFilterGroup(convexResultCall, collisonGroup);
		// bt.ConvexResultCallback_set_m_collisionFilterMask(convexResultCall, collisionMask);

		// bt.btTransform_setOrigin(convexTransform, convexPosFrom);
		// bt.btTransform_setOrigin(convexTransTo, convexPosTo);
		// if (fromRotation) {
		// 	bt.btQuaternion_setValue(convexRotFrom, -fromRotation.x, fromRotation.y, fromRotation.z, -fromRotation.w);
		// 	bt.btTransform_setRotation(convexTransform, convexRotFrom);
		// } else {
		// 	bt.btTransform_setRotation(convexTransform, this._btDefaultQuaternion);
		// }
		// if (toRotation) {
		// 	bt.btQuaternion_setValue(convexRotTo, -toRotation.x, toRotation.y, toRotation.z, -toRotation.w);
		// 	bt.btTransform_setRotation(convexTransTo, convexRotTo);
		// } else {
		// 	bt.btTransform_setRotation(convexTransTo, this._btDefaultQuaternion);
		// }

		// var collisionObjects: number = bt.AllConvexResultCallback_get_m_collisionObjects(convexResultCall);
		// bt.tBtCollisionObjectArray_clear(collisionObjects);//清空检测队列
		// bt.btCollisionWorld_convexSweepTest(this._btCollisionWorld, sweepShape, convexTransform, convexTransTo, convexResultCall, allowedCcdPenetration);
		// var count: number = bt.tBtCollisionObjectArray_size(collisionObjects);
		// if (count > 0) {
		// 	var btPoints: number = bt.AllConvexResultCallback_get_m_hitPointWorld(convexResultCall);
		// 	var btNormals: number = bt.AllConvexResultCallback_get_m_hitNormalWorld(convexResultCall);
		// 	var btFractions: number = bt.AllConvexResultCallback_get_m_hitFractions(convexResultCall);
		// 	for (var i: number = 0; i < count; i++) {
		// 		var hitResult: Laya.HitResult = this._collisionsUtils.getHitResult();
		// 		out.push(hitResult);
		// 		hitResult.succeeded = true;
		// 		hitResult.collider = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(bt.tBtCollisionObjectArray_at(collisionObjects, i))];
		// 		hitResult.hitFraction = bt.tScalarArray_at(btFractions, i);
		// 		var btPoint: number = bt.tVector3Array_at(btPoints, i);
		// 		var point: Laya.Vector3 = hitResult.point;
		// 		point.x = -bt.btVector3_x(btPoint);
		// 		point.y = bt.btVector3_y(btPoint);
		// 		point.z = bt.btVector3_z(btPoint);
		// 		var btNormal: number = bt.tVector3Array_at(btNormals, i);
		// 		var normal: Laya.Vector3 = hitResult.normal;
		// 		normal.x = -bt.btVector3_x(btNormal);
		// 		normal.y = bt.btVector3_y(btNormal);
		// 		normal.z = bt.btVector3_z(btNormal);
		// 	}
		// 	return true;
		// } else {
		// 	return false;
		// }
		return false;
	}

	/**
	 * 添加刚体运动的约束条件。
	 * @param constraint 约束。
	 * @param disableCollisionsBetweenLinkedBodies 是否禁用
	 */
	addConstraint(constraint: Laya.Constraint3D, disableCollisionsBetweenLinkedBodies: boolean = false): void {
		if (!this._btDiscreteDynamicsWorld)
			throw "Cannot perform this action when the physics engine is set to CollisionsOnly";
		// this._nativeDiscreteDynamicsWorld.addConstraint(constraint._nativeConstraint, disableCollisionsBetweenLinkedBodies);
		// constraint._simulation = this;
	}

	/**
	 * 移除刚体运动的约束条件。
	 */
	removeConstraint(constraint: Laya.Constraint3D): void {
		if (!this._btDiscreteDynamicsWorld)
			throw "Cannot perform this action when the physics engine is set to CollisionsOnly";
		// this._nativeDiscreteDynamicsWorld.removeConstraint(constraint._nativeConstraint);
	}

	/**
	 * @internal
	 */
	_updatePhysicsTransformFromRender(): void {
		var elements: any = this._physicsUpdateList.elements;
		for (var i: number = 0, n: number = this._physicsUpdateList.length; i < n; i++) {
			var physicCollider: CannonPhysicsComponent = elements[i];
			physicCollider._derivePhysicsTransformation(false);
			physicCollider._inPhysicUpdateListIndex = -1;//置空索引
		}
		this._physicsUpdateList.length = 0;//清空物理更新队列
	}

	/**
	 * @internal
	 */
	_updateCharacters(): void {
		for (var i: number = 0, n: number = this._characters.length; i < n; i++) {
			var character: CannonPhysicsComponent = this._characters[i];
			// character._updateTransformComponent(Physics3D._bullet.btCollisionObject_getWorldTransform(character._btColliderObject));
			character._updateTransformComponent(null);
		}
	}

	/**
	 * @internal
	 */
	_updateCollisions(): void {
		// this._collisionsUtils.recoverAllContactPointsPool();
		// var previous: Collision[] = this._currentFrameCollisions;
		// this._currentFrameCollisions = this._previousFrameCollisions;
		// this._currentFrameCollisions.length = 0;
		// this._previousFrameCollisions = previous;
		// var loopCount: number = Stat.loopCount;
		// var bt: any = Physics3D._bullet;
		// var numManifolds: number = bt.btDispatcher_getNumManifolds(this._btDispatcher);
		// for (var i: number = 0; i < numManifolds; i++) {
		// 	var contactManifold: number = bt.btDispatcher_getManifoldByIndexInternal(this._btDispatcher, i);//1.可能同时返回A和B、B和A 2.可能同时返回A和B多次(可能和CCD有关)
		// 	var componentA: PhysicsTriggerComponent = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(bt.btPersistentManifold_getBody0(contactManifold))];
		// 	var componentB: PhysicsTriggerComponent = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(bt.btPersistentManifold_getBody1(contactManifold))];
		// 	var collision: Collision = null;
		// 	var isFirstCollision: boolean;//可能同时返回A和B多次,需要过滤
		// 	var contacts: ContactPoint[] = null;
		// 	var isTrigger: boolean = componentA.isTrigger || componentB.isTrigger;
		// 	if (isTrigger && (((<Sprite3D>componentA.owner))._needProcessTriggers || ((<Sprite3D>componentB.owner))._needProcessTriggers)) {
		// 		var numContacts: number = bt.btPersistentManifold_getNumContacts(contactManifold);
		// 		for (var j: number = 0; j < numContacts; j++) {
		// 			var pt: number = bt.btPersistentManifold_getContactPoint(contactManifold, j);
		// 			var distance: number = bt.btManifoldPoint_getDistance(pt);
		// 			if (distance <= 0) {
		// 				collision = this._collisionsUtils.getCollision(componentA, componentB);
		// 				contacts = collision.contacts;
		// 				isFirstCollision = collision._updateFrame !== loopCount;
		// 				if (isFirstCollision) {
		// 					collision._isTrigger = true;
		// 					contacts.length = 0;
		// 				}
		// 				break;
		// 			}
		// 		}
		// 	} else if (((<Sprite3D>componentA.owner))._needProcessCollisions || ((<Sprite3D>componentB.owner))._needProcessCollisions) {
		// 		if (componentA._enableProcessCollisions || componentB._enableProcessCollisions) {//例：A和B均为运动刚体或PhysicCollider
		// 			numContacts = bt.btPersistentManifold_getNumContacts(contactManifold);
		// 			for (j = 0; j < numContacts; j++) {
		// 				pt = bt.btPersistentManifold_getContactPoint(contactManifold, j);
		// 				distance = bt.btManifoldPoint_getDistance(pt)
		// 				if (distance <= 0) {
		// 					var contactPoint: ContactPoint = this._collisionsUtils.getContactPoints();
		// 					contactPoint.colliderA = componentA;
		// 					contactPoint.colliderB = componentB;
		// 					contactPoint.distance = distance;
		// 					var btNormal: number = bt.btManifoldPoint_get_m_normalWorldOnB(pt);
		// 					var normal: Laya.Vector3 = contactPoint.normal;
		// 					normal.x = -bt.btVector3_x(btNormal);
		// 					normal.y = bt.btVector3_y(btNormal);
		// 					normal.z = bt.btVector3_z(btNormal);
		// 					var btPostionA: number = bt.btManifoldPoint_get_m_positionWorldOnA(pt);
		// 					var positionOnA: Laya.Vector3 = contactPoint.positionOnA;
		// 					positionOnA.x = -bt.btVector3_x(btPostionA);
		// 					positionOnA.y = bt.btVector3_y(btPostionA);
		// 					positionOnA.z = bt.btVector3_z(btPostionA);
		// 					var btPostionB: number = bt.btManifoldPoint_get_m_positionWorldOnB(pt);
		// 					var positionOnB: Laya.Vector3 = contactPoint.positionOnB;
		// 					positionOnB.x = -bt.btVector3_x(btPostionB);
		// 					positionOnB.y = bt.btVector3_y(btPostionB);
		// 					positionOnB.z = bt.btVector3_z(btPostionB);

		// 					if (!collision) {
		// 						collision = this._collisionsUtils.getCollision(componentA, componentB);
		// 						contacts = collision.contacts;
		// 						isFirstCollision = collision._updateFrame !== loopCount;
		// 						if (isFirstCollision) {
		// 							collision._isTrigger = false;
		// 							contacts.length = 0;
		// 						}
		// 					}
		// 					contacts.push(contactPoint);
		// 				}
		// 			}
		// 		}
		// 	}
		// 	if (collision && isFirstCollision) {
		// 		this._currentFrameCollisions.push(collision);
		// 		collision._setUpdateFrame(loopCount);
		// 	}
		// }
	}

	/**
	 * @internal
	 */
	_eventScripts(): void {

		this.world.emitTriggeredEvents();
        this.world.emitCollisionEvents();

		// var loopCount: number = Stat.loopCount;
		// for (var i: number = 0, n: number = this._currentFrameCollisions.length; i < n; i++) {
		// 	var curFrameCol: Collision = this._currentFrameCollisions[i];
		// 	var colliderA: PhysicsComponent = curFrameCol._colliderA;
		// 	var colliderB: PhysicsComponent = curFrameCol._colliderB;
		// 	if (colliderA.destroyed || colliderB.destroyed)//前一个循环可能会销毁后面循环的同一物理组件
		// 		continue;
		// 	if (loopCount - curFrameCol._lastUpdateFrame === 1) {
		// 		var ownerA: Sprite3D = (<Sprite3D>colliderA.owner);
		// 		var scriptsA: Script3D[] = ownerA._scripts;
		// 		if (scriptsA) {
		// 			if (curFrameCol._isTrigger) {
		// 				if (ownerA._needProcessTriggers) {
		// 					for (var j: number = 0, m: number = scriptsA.length; j < m; j++)
		// 						scriptsA[j].onTriggerStay(colliderB);
		// 				}
		// 			} else {
		// 				if (ownerA._needProcessCollisions) {
		// 					for (j = 0, m = scriptsA.length; j < m; j++) {
		// 						curFrameCol.other = colliderB;
		// 						scriptsA[j].onCollisionStay(curFrameCol);
		// 					}
		// 				}
		// 			}
		// 		}
		// 		var ownerB: Sprite3D = (<Sprite3D>colliderB.owner);
		// 		var scriptsB: Script3D[] = ownerB._scripts;
		// 		if (scriptsB) {
		// 			if (curFrameCol._isTrigger) {
		// 				if (ownerB._needProcessTriggers) {
		// 					for (j = 0, m = scriptsB.length; j < m; j++)
		// 						scriptsB[j].onTriggerStay(colliderA);
		// 				}
		// 			} else {
		// 				if (ownerB._needProcessCollisions) {
		// 					for (j = 0, m = scriptsB.length; j < m; j++) {
		// 						curFrameCol.other = colliderA;
		// 						scriptsB[j].onCollisionStay(curFrameCol);
		// 					}
		// 				}
		// 			}
		// 		}
		// 	} else {
		// 		ownerA = (<Sprite3D>colliderA.owner);
		// 		scriptsA = ownerA._scripts;
		// 		if (scriptsA) {
		// 			if (curFrameCol._isTrigger) {
		// 				if (ownerA._needProcessTriggers) {
		// 					for (j = 0, m = scriptsA.length; j < m; j++)
		// 						scriptsA[j].onTriggerEnter(colliderB);
		// 				}
		// 			} else {
		// 				if (ownerA._needProcessCollisions) {
		// 					for (j = 0, m = scriptsA.length; j < m; j++) {
		// 						curFrameCol.other = colliderB;
		// 						scriptsA[j].onCollisionEnter(curFrameCol);
		// 					}
		// 				}
		// 			}
		// 		}
		// 		ownerB = (<Sprite3D>colliderB.owner);
		// 		scriptsB = ownerB._scripts;
		// 		if (scriptsB) {
		// 			if (curFrameCol._isTrigger) {
		// 				if (ownerB._needProcessTriggers) {
		// 					for (j = 0, m = scriptsB.length; j < m; j++)
		// 						scriptsB[j].onTriggerEnter(colliderA);
		// 				}
		// 			} else {
		// 				if (ownerB._needProcessCollisions) {
		// 					for (j = 0, m = scriptsB.length; j < m; j++) {
		// 						curFrameCol.other = colliderA;
		// 						scriptsB[j].onCollisionEnter(curFrameCol);
		// 					}
		// 				}

		// 			}
		// 		}
		// 	}
		// }

		// for (i = 0, n = this._previousFrameCollisions.length; i < n; i++) {
		// 	var preFrameCol: Collision = this._previousFrameCollisions[i];
		// 	var preColliderA: PhysicsComponent = preFrameCol._colliderA;
		// 	var preColliderB: PhysicsComponent = preFrameCol._colliderB;
		// 	if (preColliderA.destroyed || preColliderB.destroyed)
		// 		continue;
		// 	if (loopCount - preFrameCol._updateFrame === 1) {
		// 		this._collisionsUtils.recoverCollision(preFrameCol);//回收collision对象
		// 		ownerA = (<Sprite3D>preColliderA.owner);
		// 		scriptsA = ownerA._scripts;
		// 		if (scriptsA) {
		// 			if (preFrameCol._isTrigger) {
		// 				if (ownerA._needProcessTriggers) {
		// 					for (j = 0, m = scriptsA.length; j < m; j++)
		// 						scriptsA[j].onTriggerExit(preColliderB);
		// 				}
		// 			} else {
		// 				if (ownerA._needProcessCollisions) {
		// 					for (j = 0, m = scriptsA.length; j < m; j++) {
		// 						preFrameCol.other = preColliderB;
		// 						scriptsA[j].onCollisionExit(preFrameCol);
		// 					}
		// 				}
		// 			}
		// 		}
		// 		ownerB = (<Sprite3D>preColliderB.owner);
		// 		scriptsB = ownerB._scripts;
		// 		if (scriptsB) {
		// 			if (preFrameCol._isTrigger) {
		// 				if (ownerB._needProcessTriggers) {
		// 					for (j = 0, m = scriptsB.length; j < m; j++)
		// 						scriptsB[j].onTriggerExit(preColliderA);
		// 				}
		// 			} else {
		// 				if (ownerB._needProcessCollisions) {
		// 					for (j = 0, m = scriptsB.length; j < m; j++) {
		// 						preFrameCol.other = preColliderA;
		// 						scriptsB[j].onCollisionExit(preFrameCol);
		// 					}
		// 				}
		// 			}
		// 		}
		// 	}
		// }
	}

	emitEvent(colliderA, colliderB, event:string) {
		var ownerA = colliderA.owner;
		var scriptsA: Laya.Script3D[] = ownerA._scripts;
		if (scriptsA) {
			for (var j: number = 0, m: number = scriptsA.length; j < m; j++)
				scriptsA[j][event](colliderB);
		}
		var ownerB = colliderB.owner;
		var scriptsB: Laya.Script3D[] = ownerB._scripts;
		if (scriptsB) {
			for (j = 0, m = scriptsB.length; j < m; j++)
				scriptsB[j][event](colliderA);
		}
	}

	/**
	 * 清除力。
	 */
	clearForces(): void {
		if (!this._btDiscreteDynamicsWorld)
			throw "Cannot perform this action when the physics engine is set to CollisionsOnly";
		// Physics3D._bullet.btDiscreteDynamicsWorld_clearForces(this._btDiscreteDynamicsWorld);
	}

}


