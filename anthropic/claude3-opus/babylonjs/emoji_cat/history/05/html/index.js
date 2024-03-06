var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function(engine, canvas) {
    engine.runRenderLoop(function() {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() {
    return new BABYLON.Engine(canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true,
        disableWebGL2Support: false
    });
};

/*
Claude3プロンプト：
Babylon.jsの基本meshを用いて{絵文字}を3Dで表現するサンプルを教えてください。
・まずは{絵文字}をどのように認識しているのか各部品の{形状}や{色}などその特徴を書き出してください。
・その特徴をもとに3Dで表現するようお願いします。
・各部品の{色}は元の絵文字の色を再現してください。
・テクスチャは使わず色を指定してください。
・Babylon.js Playground で動くようにしてください。

3D表現してほしい{絵文字}は🐱です。

*/

var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2.5, -10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // 頭部
    var head = BABYLON.MeshBuilder.CreateSphere("head", {diameter: 4}, scene);
    head.material = new BABYLON.StandardMaterial("headMat", scene);
    head.material.diffuseColor = new BABYLON.Color3(1, 0.5, 0);

    // 耳
    var earLeft = BABYLON.MeshBuilder.CreateCylinder("earLeft", {height: 1.5, diameterTop: 0, diameterBottom: 1.5, tessellation: 3}, scene);
    earLeft.material = new BABYLON.StandardMaterial("earMatLeft", scene);
    earLeft.material.diffuseColor = new BABYLON.Color3(1, 0.5, 0);
    earLeft.rotate(BABYLON.Axis.Z, -Math.PI / 3, BABYLON.Space.LOCAL);
    earLeft.position.set(-1.5, 1.5, 0);

    var earRight = earLeft.clone("earRight");
    earRight.rotate(BABYLON.Axis.Z, 2 * Math.PI / 3, BABYLON.Space.LOCAL);
    earRight.position.set(1.5, 1.5, 0);

    var earInsideLeft = BABYLON.MeshBuilder.CreateCylinder("earInsideLeft", {height: 1, diameterTop: 0, diameterBottom: 1, tessellation: 3}, scene);
    earInsideLeft.material = new BABYLON.StandardMaterial("earInsideMatLeft", scene);
    earInsideLeft.material.diffuseColor = new BABYLON.Color3(1, 0.8, 0.8);
    earInsideLeft.rotate(BABYLON.Axis.Z, -Math.PI / 3, BABYLON.Space.LOCAL);
    earInsideLeft.position.set(-1.5, 1.5, 0.1);

    var earInsideRight = earInsideLeft.clone("earInsideRight");
    earInsideRight.rotate(BABYLON.Axis.Z, 2 * Math.PI / 3, BABYLON.Space.LOCAL);
    earInsideRight.position.set(1.5, 1.5, 0.1);

    // 目
    var eyeLeft = BABYLON.MeshBuilder.CreateSphere("eyeLeft", {diameter: 0.6}, scene);
    eyeLeft.material = new BABYLON.StandardMaterial("eyeMatLeft", scene);
    eyeLeft.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    eyeLeft.position.set(-0.8, 0.5, 1.6);

    var eyeRight = eyeLeft.clone("eyeRight");
    eyeRight.position.set(0.8, 0.5, 1.6);

    // 鼻
    var nose = BABYLON.MeshBuilder.CreateCylinder("nose", {height: 0.3, diameterTop: 0, diameterBottom: 0.3, tessellation: 3}, scene);
    nose.material = new BABYLON.StandardMaterial("noseMat", scene);
    nose.material.diffuseColor = new BABYLON.Color3(1, 0.2, 0.6);  
    nose.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.LOCAL);
    nose.position.set(0, 0.2, 1.8);

    // 口
    var mouth = BABYLON.MeshBuilder.CreateCylinder("mouth", {height: 0.1, diameterTop: 0.6, diameterBottom: 0.6, tessellation: 3}, scene);
    mouth.material = new BABYLON.StandardMaterial("mouthMat", scene);
    mouth.material.diffuseColor = new BABYLON.Color3(1, 0.8, 0.8);
    mouth.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.LOCAL);
    mouth.position.set(0, -0.2, 1.6);

    // 胴体  
    var body = BABYLON.MeshBuilder.CreateSphere("body", {diameter: 3.5, slice: 0.65}, scene);
    body.material = new BABYLON.StandardMaterial("bodyMat", scene);
    body.material.diffuseColor = new BABYLON.Color3(1, 0.5, 0);
    body.position.set(0, -2.5, 0);

    return scene;
};

window.initFunction = async function() {

    var asyncEngineCreation = async function() {
        try {
            return createDefaultEngine();
        } catch (e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return createDefaultEngine();
        }
    }

    window.engine = await asyncEngineCreation();
    if (!engine) throw 'engine should not be null.';
    startRenderLoop(engine, canvas);
    window.scene = createScene();
};
initFunction().then(() => {
    sceneToRender = scene
});

// Resize
window.addEventListener("resize", function() {
    engine.resize();
});
