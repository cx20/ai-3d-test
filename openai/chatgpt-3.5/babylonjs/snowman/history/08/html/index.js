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

var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // カメラを作成する
    var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 5, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    // ライトを作成する
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // 雪だるまのマテリアルを作成する
    var snowMat = new BABYLON.StandardMaterial("snowMat", scene);
    snowMat.diffuseColor = new BABYLON.Color3(1, 1, 1);
    snowMat.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    snowMat.specularPower = 64;

    // 雪だるまのボディを作成する
    var body = BABYLON.MeshBuilder.CreateSphere("body", { diameter: 1 }, scene);
    body.material = snowMat;

    // 雪だるまの頭を作成する
    var head = BABYLON.MeshBuilder.CreateSphere("head", { diameter: 0.6 }, scene);
    head.material = snowMat;
    head.position.y = 0.8;
    head.position.z = 0.3;

    // 雪だるまの目を作成する
    var eye1 = BABYLON.MeshBuilder.CreateSphere("eye1", { diameter: 0.1 }, scene);
    eye1.material = new BABYLON.StandardMaterial("eyeMat1", scene);
    eye1.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    eye1.position.x = -0.2;
    eye1.position.y = 0.9;
    eye1.position.z = 0.45;

    var eye2 = BABYLON.MeshBuilder.CreateSphere("eye2", { diameter: 0.1 }, scene);
    eye2.material = new BABYLON.StandardMaterial("eyeMat2", scene);
    eye2.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    eye2.position.x = 0.2;
    eye2.position.y = 0.9;
    eye2.position.z = 0.45;

    // 雪だるまのノーズを作成する
    var nose = BABYLON.MeshBuilder.CreateCylinder("nose", { height: 0.4, diameterTop: 0, tessellation: 4 }, scene);
    nose.material = new BABYLON.StandardMaterial("noseMat", scene);
    nose.material.diffuseColor = new BABYLON.Color3(1, 0.5, 0);
    nose.rotation.x = Math.PI / 2;
    nose.position.x = 0;
    nose.position.y = 0.75;
    nose.position.z = 0.6;

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
