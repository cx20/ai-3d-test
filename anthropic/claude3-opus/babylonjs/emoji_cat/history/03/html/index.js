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
    var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, -15, new BABYLON.Vector3(0, 0, 0));
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
    var ear1 = BABYLON.MeshBuilder.CreateCylinder("ear1", {height: 4, diameterTop: 0, diameterBottom: 2, tessellation: 3}, scene);
    ear1.material = earMat;
    ear1.rotation.z = Math.PI / 2;
    ear1.position.y = 3;
    ear1.position.x = -2;
    ear1.parent = head;
    var ear2 = ear1.clone("ear2");
    ear2.position.x = 2;

    // 目
    var eyeMat = new BABYLON.StandardMaterial("eyeMat", scene);
    eyeMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
    var eye1 = BABYLON.MeshBuilder.CreateSphere("eye1", {diameter: 1.5}, scene);
    eye1.material = eyeMat;
    eye1.position.y = 1;
    eye1.position.x = -1.5;
    eye1.position.z = 3;
    eye1.parent = head;
    var eye2 = eye1.clone("eye2");
    eye2.position.x = 1.5;

    // 鼻
    var nose = BABYLON.MeshBuilder.CreateCylinder("nose", {height: 1, diameterTop: 0, diameterBottom: 0.8, tessellation: 3}, scene);
    nose.material = earMat;
    nose.rotation.x = -Math.PI / 2;
    nose.position.y = 0;
    nose.position.z = 4;
    nose.parent = head;

    // 口
    var mouth = BABYLON.MeshBuilder.CreateLines("mouth", {points: [new BABYLON.Vector3(-1, -1, 3), new BABYLON.Vector3(1, -1, 3)]}, scene);
    mouth.color = new BABYLON.Color3(0, 0, 0);
    mouth.parent = head;

    // 髭
    var whisker1 = BABYLON.MeshBuilder.CreateLines("whisker1", {points: [new BABYLON.Vector3(-1, -0.5, 3.5), new BABYLON.Vector3(-3, 0, 3.5)]}, scene);
    whisker1.color = new BABYLON.Color3(0, 0, 0);
    whisker1.parent = head;
    var whisker2 = BABYLON.MeshBuilder.CreateLines("whisker2", {points: [new BABYLON.Vector3(-1, -0.5, 3.5), new BABYLON.Vector3(-3, -1, 3.5)]}, scene);
    whisker2.color = new BABYLON.Color3(0, 0, 0);
    whisker2.parent = head;
    var whisker3 = whisker1.clone("whisker3");
    whisker3.rotation.y = Math.PI;
    var whisker4 = whisker2.clone("whisker4");
    whisker4.rotation.y = Math.PI;
    
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
