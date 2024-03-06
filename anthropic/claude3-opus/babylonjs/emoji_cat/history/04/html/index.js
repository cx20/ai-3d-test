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
    var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, -15, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // 頭部
    var head = BABYLON.MeshBuilder.CreateSphere("head", {diameter: 8}, scene);
    head.material = new BABYLON.StandardMaterial("headMaterial", scene);
    head.material.diffuseColor = new BABYLON.Color3(1, 1, 0);

    // 耳
    var earLeft = BABYLON.MeshBuilder.CreateCylinder("earLeft", {height: 4, diameter: 0, tessellation: 3}, scene);
    earLeft.material = new BABYLON.StandardMaterial("earMaterial", scene);
    earLeft.material.diffuseColor = new BABYLON.Color3(1, 0.75, 0.8);
    earLeft.rotation.z = Math.PI / 3;
    earLeft.position.y = 3;
    earLeft.position.x = -2;

    var earRight = earLeft.clone("earRight");
    earRight.rotation.z = -Math.PI / 3;
    earRight.position.x = 2;

    // 目
    var eyeLeft = BABYLON.MeshBuilder.CreateSphere("eyeLeft", {diameter: 1.5}, scene);
    eyeLeft.material = new BABYLON.StandardMaterial("eyeMaterial", scene);
    eyeLeft.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    eyeLeft.position.y = 1;
    eyeLeft.position.x = -1.5;
    eyeLeft.position.z = 3.5;

    var eyeRight = eyeLeft.clone("eyeRight");
    eyeRight.position.x = 1.5;

    // 口
    var mouth = BABYLON.MeshBuilder.CreateCylinder("mouth", {height: 1, diameter: 0, tessellation: 3}, scene);
    mouth.material = new BABYLON.StandardMaterial("mouthMaterial", scene);
    mouth.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    mouth.rotation.z = Math.PI;
    mouth.position.y = -0.5;
    mouth.position.z = 3.5;

    // 髭
    var whiskerLeft = BABYLON.MeshBuilder.CreateLines("whiskerLeft", {points: [
        new BABYLON.Vector3(-1.5, 0.5, 4),
        new BABYLON.Vector3(-3, 0, 4),
        new BABYLON.Vector3(-1.5, -0.5, 4),
        new BABYLON.Vector3(-3, -1, 4)
    ]}, scene);
    whiskerLeft.color = new BABYLON.Color3(0, 0, 0);

    var whiskerRight = BABYLON.MeshBuilder.CreateLines("whiskerRight", {points: [
        new BABYLON.Vector3(1.5, 0.5, 4),
        new BABYLON.Vector3(3, 0, 4),
        new BABYLON.Vector3(1.5, -0.5, 4),
        new BABYLON.Vector3(3, -1, 4)
    ]}, scene);
    whiskerRight.color = new BABYLON.Color3(0, 0, 0);

    // 鼻
    var nose = BABYLON.MeshBuilder.CreateSphere("nose", {diameter: 0.7}, scene);
    nose.material = new BABYLON.StandardMaterial("noseMaterial", scene);
    nose.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    nose.position.y = 0;
    nose.position.z = 4;

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
