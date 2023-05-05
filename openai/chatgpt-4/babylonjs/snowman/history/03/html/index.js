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

    // カメラを作成し、シーンに追加
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    // ライトを作成し、シーンに追加
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // 雪だるまの材質を作成
    const snowMaterial = new BABYLON.StandardMaterial("snowMaterial", scene);
    snowMaterial.diffuseColor = new BABYLON.Color3(0.9, 0.9, 0.9);

    // 雪だるまの身体を作成
    const body = BABYLON.MeshBuilder.CreateSphere("body", { diameter: 3, segments: 32 }, scene);
    body.position.y = 1.5;
    body.material = snowMaterial;

    // 雪だるまの頭を作成
    const head = BABYLON.MeshBuilder.CreateSphere("head", { diameter: 1.5, segments: 32 }, scene);
    head.position.y = 3.75;
    head.material = snowMaterial;

    // 雪だるまの目を作成
    const eyeMaterial = new BABYLON.StandardMaterial("eyeMaterial", scene);
    eyeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

    const leftEye = BABYLON.MeshBuilder.CreateSphere("leftEye", { diameter: 0.25, segments: 32 }, scene);
    leftEye.position.y = 3.9;
    leftEye.position.x = -0.4;
    leftEye.position.z = 0.7;
    leftEye.material = eyeMaterial;

    const rightEye = BABYLON.MeshBuilder.CreateSphere("rightEye", { diameter: 0.25, segments: 32 }, scene);
    rightEye.position.y = 3.9;
    rightEye.position.x = 0.4;
    rightEye.position.z = 0.7;
    rightEye.material = eyeMaterial;

    // 雪だるまの鼻を作成
    const noseMaterial = new BABYLON.StandardMaterial("noseMaterial", scene);
    noseMaterial.diffuseColor = new BABYLON.Color3(1, 0.4, 0);

    const nose = BABYLON.MeshBuilder.CreateCylinder("nose", { height: 0.1, diameterTop: 0, diameterBottom: 0.2, tessellation: 12 }, scene);
    nose.position.y = 3.75;
    nose.position.z = 1.1;
    nose.rotation.x = Math.PI / 2;
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
