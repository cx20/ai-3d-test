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

function createScene() {
    // シーンを作成
    const scene = new BABYLON.Scene(engine);

    // カメラを作成
    //const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    //camera.setTarget(BABYLON.Vector3.Zero());
    const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // ライトを作成
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // 地面を作成
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

    // 雪だるまのボディを作成
    const body = BABYLON.MeshBuilder.CreateSphere("body", { diameter: 2 }, scene);
    body.position.y = 1;

    // 雪だるまの頭を作成
    const head = BABYLON.MeshBuilder.CreateSphere("head", { diameter: 1.5 }, scene);
    head.position.y = 3;

    // 雪だるまの目を作成
    const leftEye = BABYLON.MeshBuilder.CreateSphere("leftEye", { diameter: 0.2 }, scene);
    leftEye.position.x = -0.5;
    leftEye.position.y = 3.2;
    leftEye.position.z = 0.8;

    const rightEye = leftEye.clone("rightEye");
    rightEye.position.x = 0.5;

    // 雪だるまのノーズを作成
    const nose = BABYLON.MeshBuilder.CreateCylinder("nose", { diameterTop: 0, diameterBottom: 0.3, height: 0.7 }, scene);
    nose.rotation.z = Math.PI / 2;
    nose.position.x = 0;
    nose.position.y = 2.8;
    nose.position.z = 0.9;

    // 雪だるまのボタンを作成
    const button1 = BABYLON.MeshBuilder.CreateSphere("button1", { diameter: 0.3 }, scene);
    button1.position.y = 2;
    const button2 = button1.clone("button2");
    button2.position.y = 1.5;
    const button3 = button1.clone("button3");
    button3.position.y = 1;

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
