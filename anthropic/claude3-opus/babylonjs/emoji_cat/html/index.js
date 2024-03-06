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
Claude3プロンプト：
Babylon.jsの基本meshを用いて{絵文字}を3Dで表現するサンプルを教えてください。
・まずは{絵文字}をどのように認識しているのか各部品の{形状}や{色}などその特徴を書き出してください。
・その特徴をもとに3Dで表現するようお願いします。
・各部品の{色}は元の絵文字の色を再現してください。
・テクスチャは使わず色を指定してください。
・Babylon.js Playground で動くようにしてください。

3D表現してほしい{絵文字}は🐱です。

*/

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, -15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

    const yellowMaterial = new BABYLON.StandardMaterial("yellowMaterial", scene);
    yellowMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0);

    const blackMaterial = new BABYLON.StandardMaterial("blackMaterial", scene);
    blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

    const head = BABYLON.MeshBuilder.CreateSphere("head", {diameter: 8}, scene);
    head.material = yellowMaterial;

    const ear1 = BABYLON.MeshBuilder.CreateCylinder("ear1", {height: 2, diameter: 0, tessellation: 3}, scene);
    ear1.material = yellowMaterial;
    ear1.rotation.z = Math.PI / 2;
    ear1.position.y = 4.5;
    ear1.position.x = -2;

    const ear2 = ear1.clone("ear2");
    ear2.position.x = 2;

    const eye1 = BABYLON.MeshBuilder.CreateSphere("eye1", {diameter: 1.5}, scene);
    eye1.material = blackMaterial;
    eye1.position.y = 1;
    eye1.position.x = -1.5;
    eye1.position.z = 3;

    const eye2 = eye1.clone("eye2");
    eye2.position.x = 1.5;

    const mouth = BABYLON.MeshBuilder.CreateCylinder("mouth", {height: 1, diameterTop: 0, diameterBottom: 1.5, tessellation: 3}, scene);
    mouth.material = blackMaterial;
    mouth.rotation.z = Math.PI;
    mouth.position.y = -1;
    mouth.position.z = 3;

    const nose = BABYLON.MeshBuilder.CreateCylinder("nose", {height: 0.5, diameterTop: 0, diameterBottom: 0.5, tessellation: 3}, scene);
    nose.material = blackMaterial;
    nose.rotation.x = -Math.PI / 2;
    nose.position.y = 0.5;
    nose.position.z = 4;

    const whisker1 = BABYLON.MeshBuilder.CreateCylinder("whisker1", {height: 2, diameter: 0.1}, scene);
    whisker1.material = blackMaterial;
    whisker1.rotation.z = -Math.PI / 4;
    whisker1.position.y = 0;
    whisker1.position.x = -2;
    whisker1.position.z = 3.5;

    const whisker2 = whisker1.clone("whisker2");
    whisker2.rotation.z = Math.PI / 4;
    whisker2.position.x = 2;

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
