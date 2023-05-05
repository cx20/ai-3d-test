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

const createScene = function() {
    // シーンの作成
    const scene = new BABYLON.Scene(engine);

    // カメラの作成と設定
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(0, 1, 0), scene);
    camera.attachControl(canvas, true);

    // ライトの作成
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // 雪だるまのボディ部分を作成
    const body = BABYLON.MeshBuilder.CreateSphere("body", {diameter: 1.5}, scene);
    body.position.y = 0.75;

    // 雪だるまの頭部分を作成
    const head = BABYLON.MeshBuilder.CreateSphere("head", {diameter: 1}, scene);
    head.position.y = 2.25;

    // 雪だるまの左アームを作成
    const leftArm = BABYLON.MeshBuilder.CreateCylinder("leftArm", {height: 0.1, diameterTop: 0.05, diameterBottom: 0.05}, scene);
    leftArm.position.y = 1.5;
    leftArm.position.x = 0.8;
    leftArm.rotation.z = Math.PI / 4;

    // 雪だるまの右アームを作成
    const rightArm = BABYLON.MeshBuilder.CreateCylinder("rightArm", {height: 0.1, diameterTop: 0.05, diameterBottom: 0.05}, scene);
    rightArm.position.y = 1.5;
    rightArm.position.x = -0.8;
    rightArm.rotation.z = -Math.PI / 4;

    // 地面の作成
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 10}, scene);

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
