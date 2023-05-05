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
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    ground.material = groundMaterial;

    // 雪だるまの各部分を作成
    const body = BABYLON.MeshBuilder.CreateSphere("body", {diameter: 1.5}, scene);
    body.position.y = 0.75;

    const head = BABYLON.MeshBuilder.CreateSphere("head", {diameter: 1}, scene);
    head.position.y = 2;

    const leftEye = BABYLON.MeshBuilder.CreateSphere("leftEye", {diameter: 0.1}, scene);
    leftEye.position.y = 2.1;
    leftEye.position.x = 0.25;
    leftEye.position.z = 0.4;

    const rightEye = BABYLON.MeshBuilder.CreateSphere("rightEye", {diameter: 0.1}, scene);
    rightEye.position.y = 2.1;
    rightEye.position.x = -0.25;
    rightEye.position.z = 0.4;

    const nose = BABYLON.MeshBuilder.CreateCylinder("nose", {height: 0.5, diameterTop: 0, diameterBottom: 0.1}, scene);
    nose.position.y = 2;
    nose.position.z = 0.5;
    nose.rotation.x = Math.PI / 2;

    // 雪だるまのマテリアルを設定
    const snowMaterial = new BABYLON.StandardMaterial("snowMaterial", scene);
    snowMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

    body.material = snowMaterial;
    head.material = snowMaterial;
    leftEye.material = snowMaterial;
    rightEye.material = snowMaterial;

    const noseMaterial = new BABYLON.StandardMaterial("noseMaterial", scene);
    noseMaterial.diffuseColor = new BABYLON.Color3(1, 0.6, 0);
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
