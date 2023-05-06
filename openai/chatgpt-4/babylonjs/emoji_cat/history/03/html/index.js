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

var createScene = function () {

    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Head
    var head = BABYLON.MeshBuilder.CreateSphere("head", {diameter: 1}, scene);
    var headMaterial = new BABYLON.StandardMaterial("headMaterial", scene);
    headMaterial.diffuseColor = new BABYLON.Color3(1, 0.6, 0);
    head.material = headMaterial;

    // Ears
    var earMaterial = new BABYLON.StandardMaterial("earMaterial", scene);
    earMaterial.diffuseColor = new BABYLON.Color3(1, 0.6, 0);
    var leftEar = BABYLON.MeshBuilder.CreateCylinder("leftEar", {diameterTop: 0, diameterBottom: 0.5, height: 1, tessellation: 3}, scene);
    leftEar.rotation.z = Math.PI / 2;
    leftEar.position.x = -0.5;
    leftEar.position.y = 0.5;
    leftEar.material = earMaterial;

    var rightEar = leftEar.clone("rightEar");
    rightEar.position.x = 0.5;
    rightEar.position.y = 0.5;

    // Eyes
    var eyeMaterial = new BABYLON.StandardMaterial("eyeMaterial", scene);
    eyeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    var leftEye = BABYLON.MeshBuilder.CreateSphere("leftEye", {diameter: 0.2}, scene);
    leftEye.position.x = -0.25;
    leftEye.position.y = 0.15;
    leftEye.position.z = 0.4;
    leftEye.material = eyeMaterial;

    var rightEye = leftEye.clone("rightEye");
    rightEye.position.x = 0.25;
    rightEye.position.y = 0.15;
    rightEye.position.z = 0.4;
    
    // Nose
    var nose = BABYLON.MeshBuilder.CreateSphere("nose", {diameter: 0.1}, scene);
    var noseMaterial = new BABYLON.StandardMaterial("noseMaterial", scene);
    noseMaterial.diffuseColor = new BABYLON.Color3(1, 0.5, 0.5);
    nose.material = noseMaterial;

    // Mouth
    var mouth = BABYLON.MeshBuilder.CreateCylinder("mouth", {diameterTop: 0, diameterBottom: 0.1, height: 0.1, tessellation: 12}, scene);
    var mouthMaterial = new BABYLON.StandardMaterial("mouthMaterial", scene);
    mouthMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    mouth.rotation.x = Math.PI / 2;
    mouth.position.y = -0.2;
    mouth.material = mouthMaterial;

    // Parenting
    leftEar.parent = head;
    rightEar.parent = head;
    leftEye.parent = head;
    rightEye.parent = head;
    nose.parent = head;
    mouth.parent = head;

    return scene;
}

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
