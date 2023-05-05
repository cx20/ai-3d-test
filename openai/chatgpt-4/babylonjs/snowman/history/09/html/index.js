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

function createScene(engine) {
    var scene = new BABYLON.Scene(engine);

    // カメラの設定
    var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 10, new BABYLON.Vector3(0, 0, 0), scene);
    //camera.attachControl(engine.getRenderingCanvas(), true);
    camera.attachControl(canvas, true);

    // ライトの設定
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // 雪だるまの身体（球体）を作成
    var body = BABYLON.MeshBuilder.CreateSphere("body", {diameter: 4}, scene);
    body.position.y = 2;

    // 雪だるまの頭（球体）を作成
    var head = BABYLON.MeshBuilder.CreateSphere("head", {diameter: 2}, scene);
    head.position.y = 5;

    // 雪だるまの顔の作成（目: シリンダー）
    var eyeMaterial = new BABYLON.StandardMaterial("eyeMaterial", scene);
    eyeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

    var leftEye = BABYLON.MeshBuilder.CreateCylinder("leftEye", {diameter: 0.2, height: 0.5}, scene);
    leftEye.material = eyeMaterial;
    leftEye.position = new BABYLON.Vector3(-0.5, 5.2, 0.9);

    var rightEye = BABYLON.MeshBuilder.CreateCylinder("rightEye", {diameter: 0.2, height: 0.5}, scene);
    rightEye.material = eyeMaterial;
    rightEye.position = new BABYLON.Vector3(0.5, 5.2, 0.9);

    // シーンの背景色を設定
    scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);

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
