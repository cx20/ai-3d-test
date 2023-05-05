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

function createScene(engine, canvas) {
    // 新しいシーンを作成
    var scene = new BABYLON.Scene(engine);

    // シーンの背景色を設定
    scene.clearColor = new BABYLON.Color3(0.8, 0.8, 1);

    // カメラを作成
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 3, 20, BABYLON.Vector3.Zero(), scene);

    // カメラの移動範囲を制限
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = (Math.PI / 2) * 0.9;
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 40;

    // カメラの動きを設定
    camera.attachControl(canvas, true);

    // 地面を作成
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    ground.material.specularColor = new BABYLON.Color3(0, 0, 0);

    // 雪だるまのボディを作成
    var body = BABYLON.MeshBuilder.CreateSphere("body", { diameter: 4 }, scene);
    body.position.y = 2;

    // 雪だるまの頭を作成
    var head = BABYLON.MeshBuilder.CreateSphere("head", { diameter: 2.5 }, scene);
    head.position.y = 5;

    // 雪だるまの目を作成
    var eye1 = BABYLON.MeshBuilder.CreateSphere("eye1", { diameter: 0.5 }, scene);
    eye1.position.x = 0.6;
    eye1.position.y = 5.2;
    eye1.position.z = 1.2;

    var eye2 = BABYLON.MeshBuilder.CreateSphere("eye2", { diameter: 0.5 }, scene);
    eye2.position.x = -0.6;
    eye2.position.y = 5.2;
    eye2.position.z = 1.2;

    // 雪だるまの鼻を作成
    var nose = BABYLON.MeshBuilder.CreateCylinder("nose", { height: 1.5, diameterTop: 0.1, diameterBottom: 0.8 }, scene);
    nose.rotation.x = Math.PI / 2;
    nose.position.y = 4.5;
    nose.position.z = 1.5;
    nose.material = new BABYLON.StandardMaterial("noseMat", scene);
    nose.material.diffuseColor = new BABYLON.Color3(1, 0.5, 0);

    // 雪だるまの帽子を作成
    var hatTop = BABYLON.MeshBuilder.CreateCylinder("hatTop", { height: 2, diameterTop: 1.5, diameterBottom: 2 }, scene);
    hatTop.position.y = 7.5;
    hatTop.material = new BABYLON.StandardMaterial("hatMat", scene);
    hatTop.material.diffuseColor = new BABYLON.Color3(0.5, 0, 0);

    var hatBrim = BABYLON.MeshBuilder.CreateCylinder("hatBrim", { height: 0.5, diameterTop: 1.5, diameterBottom: 1.5 }, scene);
    hatBrim.rotation.x = Math.PI / 2;
    hatBrim.position.y = 6.5;
    hatBrim.material = new BABYLON.StandardMaterial("hatMat", scene);
    hatBrim.material.diffuseColor = new BABYLON.Color3(0.5, 0, 0);

    // 光源を作成
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // シーンを返す
    return scene;

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
