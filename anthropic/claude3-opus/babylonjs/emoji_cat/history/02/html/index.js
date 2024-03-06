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
    head.material = new BABYLON.StandardMaterial("headMat", scene);
    head.material.diffuseColor = new BABYLON.Color3(1, 0.8, 0.6);

    // 耳
    var earMat = new BABYLON.StandardMaterial("earMat", scene);
    earMat.diffuseColor = new BABYLON.Color3(1, 0.6, 0.4);
    var earLeft = BABYLON.MeshBuilder.CreateCylinder("earLeft", {height: 4, diameterTop: 0, diameterBottom: 2, tessellation: 3}, scene);
    earLeft.material = earMat;
    earLeft.rotation.z = Math.PI / 2;
    earLeft.position.y = 3;
    earLeft.position.x = -2;
    var earRight = earLeft.clone("earRight");
    earRight.position.x = 2;

    // 目
    var eyeMat = new BABYLON.StandardMaterial("eyeMat", scene);
    eyeMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
    var eyeLeft = BABYLON.MeshBuilder.CreateSphere("eyeLeft", {diameter: 1.5}, scene);
    eyeLeft.material = eyeMat;
    eyeLeft.position.y = 1;
    eyeLeft.position.x = -1.5;
    eyeLeft.position.z = 3;
    var eyeRight = eyeLeft.clone("eyeRight");
    eyeRight.position.x = 1.5;

    // 鼻
    var nose = BABYLON.MeshBuilder.CreateCylinder("nose", {height: 0.7, diameterTop: 0, diameterBottom: 0.7, tessellation: 3}, scene);
    nose.material = new BABYLON.StandardMaterial("noseMat", scene);
    nose.material.diffuseColor = new BABYLON.Color3(1, 0.2, 0.7);
    nose.rotation.x = Math.PI;
    nose.position.y = 0.5;
    nose.position.z = 4;

    // 口
    var mouth = BABYLON.MeshBuilder.CreateLines("mouth", {points: [new BABYLON.Vector3(-1, -0.5, 3), new BABYLON.Vector3(1, -0.5, 3)]}, scene);

    // ひげ
    var whiskersMat = new BABYLON.StandardMaterial("whiskersMat", scene);
    whiskersMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
    var whiskersLeft = BABYLON.MeshBuilder.CreateLines("whiskersLeft", {points: [
        new BABYLON.Vector3(-1.5, 0.5, 3.5), new BABYLON.Vector3(-3.5, 1.5, 3),
        new BABYLON.Vector3(-1.5, 0, 3.5), new BABYLON.Vector3(-3.5, 0, 3), 
        new BABYLON.Vector3(-1.5, -0.5, 3.5), new BABYLON.Vector3(-3.5, -1.5, 3)
    ]}, scene);
    whiskersLeft.color = new BABYLON.Color3(0, 0, 0);
    var whiskersRight = BABYLON.MeshBuilder.CreateLines("whiskersRight", {points: [
        new BABYLON.Vector3(1.5, 0.5, 3.5), new BABYLON.Vector3(3.5, 1.5, 3),
        new BABYLON.Vector3(1.5, 0, 3.5), new BABYLON.Vector3(3.5, 0, 3),
        new BABYLON.Vector3(1.5, -0.5, 3.5), new BABYLON.Vector3(3.5, -1.5, 3)
    ]}, scene);
    whiskersRight.color = new BABYLON.Color3(0, 0, 0);
    
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
