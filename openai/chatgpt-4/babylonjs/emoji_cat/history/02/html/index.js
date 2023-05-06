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

    const scene = new BABYLON.Scene(engine);

    // Create a camera and add it to the scene
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    // Create a hemispheric light and add it to the scene
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Cat head (orange ellipse)
    const head = BABYLON.MeshBuilder.CreateSphere("head", { diameterX: 4, diameterY: 4.5, diameterZ: 4 }, scene);
    head.position.y = 2.25;
    head.material = new BABYLON.StandardMaterial("headMat", scene);
    head.material.diffuseColor = new BABYLON.Color3(1, 0.647, 0);

    // Cat ears (orange triangles)
    const earL = BABYLON.MeshBuilder.CreateCylinder("earL", { height: 2, diameterTop: 0, diameterBottom: 2, tessellation: 3 }, scene);
    earL.position.set(-1.5, 4.5, 0);
    earL.rotation.z = Math.PI / 2;
    earL.material = new BABYLON.StandardMaterial("earLMat", scene);
    earL.material.diffuseColor = new BABYLON.Color3(1, 0.647, 0);

    const earR = earL.clone("earR");
    earR.position.x = 1.5;
    earR.material = earL.material.clone("earRMat");

    // Cat eyes (black ellipses)
    const eyeL = BABYLON.MeshBuilder.CreateSphere("eyeL", { diameterX: 0.8, diameterY: 1.2, diameterZ: 0.8 }, scene);
    eyeL.position.set(-1, 2.5, 1.8);
    eyeL.material = new BABYLON.StandardMaterial("eyeLMat", scene);
    eyeL.material.diffuseColor = BABYLON.Color3.Black();

    const eyeR = eyeL.clone("eyeR");
    eyeR.position.x = 1;
    eyeR.material = eyeL.material.clone("eyeRMat");

    // Cat nose (pink triangle)
    const nose = BABYLON.MeshBuilder.CreateCylinder("nose", { height: 0.2, diameterTop: 0, diameterBottom: 0.6, tessellation: 3 }, scene);
    nose.position.set(0, 1.8, 1.9);
    nose.rotation.z = Math.PI / 2;
    nose.material = new BABYLON.StandardMaterial("noseMat", scene);
    nose.material.diffuseColor = new BABYLON.Color3(1, 0.753, 0.796);

    // Cat mouth (black lines)
    const mouthL = BABYLON.MeshBuilder.CreateLines("mouthL", { points: [new BABYLON.Vector3(0, 1.5, 1.9), new BABYLON.Vector3(-0.5, 1, 1.9)] }, scene);
    mouthL.color = BABYLON.Color3.Black();

    const mouthR = BABYLON.MeshBuilder.CreateLines("mouthR", { points: [new BABYLON.Vector3(0, 1.5, 1.9), new BABYLON.Vector3(0.5, 1, 1.9)] }, scene);
    mouthR.color = BABYLON.Color3.Black();

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
