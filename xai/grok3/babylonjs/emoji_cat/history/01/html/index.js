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

使用モデル：Grok3 beta
https://x.com/i/grok/share/1ogdnC1Fa9sHVajxh9b3jK3kh
https://playground.babylonjs.com/#GUUKC2

*/

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(1, 1, 1, 1); // 背景を白に

    // カメラ
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // ライト
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // 頭部（球体）
    const head = BABYLON.MeshBuilder.CreateSphere("head", { diameter: 3 }, scene);
    head.position.y = 1.5;
    const headMaterial = new BABYLON.StandardMaterial("headMat", scene);
    headMaterial.diffuseColor = new BABYLON.Color3.FromHexString("#A9A9A9"); // 灰色
    head.material = headMaterial;

    // 耳（左右の三角錐）
    const earLeft = BABYLON.MeshBuilder.CreateCylinder("earLeft", { height: 1, diameterTop: 0, diameterBottom: 1 }, scene);
    earLeft.position = new BABYLON.Vector3(-1, 3, 0);
    earLeft.rotation.x = Math.PI / 6;
    const earMaterial = new BABYLON.StandardMaterial("earMat", scene);
    earMaterial.diffuseColor = new BABYLON.Color3.FromHexString("#A9A9A9"); // 灰色
    earLeft.material = earMaterial;

    const earRight = earLeft.clone("earRight");
    earRight.position.x = 1;
    earRight.rotation.x = -Math.PI / 6;

    // 耳の内側（ピンク）
    const earInnerLeft = BABYLON.MeshBuilder.CreateCylinder("earInnerLeft", { height: 0.8, diameterTop: 0, diameterBottom: 0.8 }, scene);
    earInnerLeft.position = new BABYLON.Vector3(-0.95, 2.9, 0.1);
    earInnerLeft.rotation.x = Math.PI / 6;
    const earInnerMaterial = new BABYLON.StandardMaterial("earInnerMat", scene);
    earInnerMaterial.diffuseColor = new BABYLON.Color3.FromHexString("#FFC1CC"); // ピンク
    earInnerLeft.material = earInnerMaterial;

    const earInnerRight = earInnerLeft.clone("earInnerRight");
    earInnerRight.position.x = 0.95;
    earInnerRight.rotation.x = -Math.PI / 6;

    // 目（左右の球体）
    const eyeLeft = BABYLON.MeshBuilder.CreateSphere("eyeLeft", { diameter: 0.5 }, scene);
    eyeLeft.position = new BABYLON.Vector3(-0.7, 1.8, 1.3);
    const eyeMaterial = new BABYLON.StandardMaterial("eyeMat", scene);
    eyeMaterial.diffuseColor = new BABYLON.Color3.FromHexString("#000000"); // 黒
    eyeLeft.material = eyeMaterial;

    const eyeRight = eyeLeft.clone("eyeRight");
    eyeRight.position.x = 0.7;

    // 鼻（小さな球体）
    const nose = BABYLON.MeshBuilder.CreateSphere("nose", { diameter: 0.3 }, scene);
    nose.position = new BABYLON.Vector3(0, 1.2, 1.5);
    const noseMaterial = new BABYLON.StandardMaterial("noseMat", scene);
    noseMaterial.diffuseColor = new BABYLON.Color3.FromHexString("#FFC1CC"); // ピンク
    nose.material = noseMaterial;

    // 口（小さな球体で簡易表現）
    const mouth = BABYLON.MeshBuilder.CreateSphere("mouth", { diameter: 0.2 }, scene);
    mouth.position = new BABYLON.Vector3(0, 0.8, 1.4);
    const mouthMaterial = new BABYLON.StandardMaterial("mouthMat", scene);
    mouthMaterial.diffuseColor = new BABYLON.Color3.FromHexString("#000000"); // 黒
    mouth.material = mouthMaterial;

    // 胴体（楕円形）
    const body = BABYLON.MeshBuilder.CreateSphere("body", { diameterX: 2, diameterY: 3, diameterZ: 2 }, scene);
    body.position.y = -0.5;
    body.material = headMaterial; // 頭と同じ灰色

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
