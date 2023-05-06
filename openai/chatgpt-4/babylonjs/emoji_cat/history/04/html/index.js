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
ChatGPTプロンプト：
Babylon.jsの基本meshを用いて{絵文字}を3Dで表現するサンプルを教えてください。
・まずは{絵文字}をどのように認識しているのか各部品の{形状}や{色}などその特徴を書き出してください。
・その特徴をもとに3Dで表現するようお願いします。
・各部品の{色}は元の絵文字の色を再現してください。
・テクスチャは使わず色を指定してください。
・Babylon.js Playground で動くようにしてください。

3D表現してほしい{絵文字}は🐱です。

*/

// シーンとカメラの設定
var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 4, 6, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    
    // 猫の頭部（球）
    var head = BABYLON.MeshBuilder.CreateSphere("head", { diameter: 1 }, scene);
    var headMaterial = new BABYLON.StandardMaterial("headMaterial", scene);
    headMaterial.diffuseColor = new BABYLON.Color3(1, 0.647, 0); // 橙色
    head.material = headMaterial;
    head.position.y = 0.5;

    // 猫の耳（左）
    var leftEar = BABYLON.MeshBuilder.CreateCylinder("leftEar", { diameterTop: 0, diameterBottom: 0.6, height: 1, tessellation: 3 }, scene);
    leftEar.scaling.x = 0.5;
    var earMaterial = new BABYLON.StandardMaterial("earMaterial", scene);
    earMaterial.diffuseColor = new BABYLON.Color3(1, 0.647, 0); // 橙色
    leftEar.material = earMaterial;
    leftEar.position.y = 1;
    leftEar.position.x = -0.4;
    leftEar.rotation.z = Math.PI / 4;

    // 猫の耳（右）
    var rightEar = leftEar.clone("rightEar");
    rightEar.position.x = 0.4;
    rightEar.rotation.z = -Math.PI / 4;

    // 猫の顔の詳細（目、鼻、口）
    var faceMaterial = new BABYLON.StandardMaterial("faceMaterial", scene);
    faceMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0); // 黒色

    // 左目
    var leftEye = BABYLON.MeshBuilder.CreateSphere("leftEye", { diameter: 0.2 }, scene);
    leftEye.material = faceMaterial;
    leftEye.position.y = 0.7;
    leftEye.position.x = -0.25;
    leftEye.position.z = 0.45;

    // 右目
    var rightEye = BABYLON.MeshBuilder.CreateSphere("rightEye", { diameter: 0.2 }, scene);
    rightEye.material = faceMaterial;
    rightEye.position.y = 0.7;
    rightEye.position.x = 0.25;
    rightEye.position.z = 0.45;

    // 鼻
    var nose = BABYLON.MeshBuilder.CreateCylinder("nose", { diameterTop: 0, diameterBottom: 0.1, height: 0.1, tessellation: 4 }, scene);
    nose.scaling.x = 0.5;
    nose.material = faceMaterial;
    nose.position.y = 0.6;
    nose.position.z = 0.48;
    nose.rotation.x = Math.PI / 2;

    // 口
    var mouth = BABYLON.MeshBuilder.CreateTorus("mouth", { diameter: 0.4, thickness: 0.02, tessellation: 64 }, scene);
    mouth.material = faceMaterial;
    mouth.position.y = 0.45;
    mouth.position.z = 0.4;
    mouth.rotation.x = Math.PI / 2;

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
