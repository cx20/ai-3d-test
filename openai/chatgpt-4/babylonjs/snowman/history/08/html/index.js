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
ChatGPT プロンプト：
Babylon.jsで雪だるまを作るサンプルを教えてください。
条件は以下とします。
・CreateScene関数の部分のみ提示ください。
*/

const createScene = function () {
    // シーンを作成
    const scene = new BABYLON.Scene(engine);

    // カメラを作成
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    // ライトを作成
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // 雪だるまの身体を作成
    const body = BABYLON.MeshBuilder.CreateSphere("body", {diameter: 3}, scene);
    body.position.y = 1.5;

    // 雪だるまの頭を作成
    const head = BABYLON.MeshBuilder.CreateSphere("head", {diameter: 1.5}, scene);
    head.position.y = 3.25;

    // 雪だるまの左目を作成
    const leftEye = BABYLON.MeshBuilder.CreateSphere("leftEye", {diameter: 0.2}, scene);
    leftEye.position.y = 3.35;
    leftEye.position.x = -0.35;
    leftEye.position.z = 0.7;

    // 雪だるまの右目を作成
    const rightEye = BABYLON.MeshBuilder.CreateSphere("rightEye", {diameter: 0.2}, scene);
    rightEye.position.y = 3.35;
    rightEye.position.x = 0.35;
    rightEye.position.z = 0.7;

    // 雪だるまの鼻を作成
    const nose = BABYLON.MeshBuilder.CreateCylinder("nose", {height: 0.5, diameterTop: 0, diameterBottom: 0.2, tessellation: 16}, scene);
    nose.position.y = 3.25;
    nose.position.z = 1;
    nose.rotation.x = Math.PI / 2;

    // マテリアルを作成
    const bodyMaterial = new BABYLON.StandardMaterial("bodyMaterial", scene);
    bodyMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
    body.material = bodyMaterial;

    const headMaterial = new BABYLON.StandardMaterial("headMaterial", scene);
    headMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
    head.material = headMaterial;

    const eyeMaterial = new BABYLON.StandardMaterial("eyeMaterial", scene);
    eyeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    leftEye.material = eyeMaterial;
    rightEye.material = eyeMaterial;

    const noseMaterial = new BABYLON.StandardMaterial("noseMaterial", scene);
    noseMaterial.diffuseColor = new BABYLON.Color3(1, 0.5, 0);
    nose.material = noseMaterial;

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
