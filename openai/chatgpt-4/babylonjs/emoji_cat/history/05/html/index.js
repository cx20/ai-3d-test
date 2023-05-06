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

// Create the Babylon.js engine and scene
var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 4, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Cat color
    var catColor = new BABYLON.StandardMaterial("catColor", scene);
    catColor.diffuseColor = new BABYLON.Color3(1, 0.6, 0);

    // Head
    var head = BABYLON.MeshBuilder.CreateSphere("head", { diameter: 2 }, scene);
    head.material = catColor;
    head.position.y = 1;

    // Ears
    var ear1 = BABYLON.MeshBuilder.CreateCylinder("ear1", { diameterTop: 0, diameterBottom: 1, height: 1.5, tessellation: 3 }, scene);
    ear1.material = catColor;
    ear1.position = new BABYLON.Vector3(-0.5, 2, 0);
    ear1.rotation.z = Math.PI / 2.5;

    var ear2 = ear1.clone("ear2");
    ear2.position = new BABYLON.Vector3(0.5, 2, 0);
    ear2.rotation.z = -Math.PI / 2.5;

    // Eyes
    var eye1 = BABYLON.MeshBuilder.CreateSphere("eye1", { diameter: 0.3 }, scene);
    eye1.material = new BABYLON.StandardMaterial("eyeColor", scene);
    eye1.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    eye1.position = new BABYLON.Vector3(-0.4, 1.2, 0.9);

    var eye2 = eye1.clone("eye2");
    eye2.position = new BABYLON.Vector3(0.4, 1.2, 0.9);

    // Nose
    var nose = BABYLON.MeshBuilder.CreateCylinder("nose", { diameter: 0.2, height: 0.2, tessellation: 12 }, scene);
    nose.material = new BABYLON.StandardMaterial("noseColor", scene);
    nose.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    nose.position = new BABYLON.Vector3(0, 0.9, 1);
    nose.rotation.z = Math.PI;

    // Mouth
    var mouth = new BABYLON.Mesh("mouth", scene);
    var path = [
        new BABYLON.Vector3(-0.2, 0.7, 0.98),
        new BABYLON.Vector3(0, 0.6, 1),
        new BABYLON.Vector3(0.2, 0.7, 0.98)
    ];
    var mouthCurve = BABYLON.MeshBuilder.CreateTube("mouthCurve", { path: path, radius: 0.04, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    mouthCurve.material = new BABYLON.StandardMaterial("mouthColor", scene);
    mouthCurve.material.diffuseColor = new BABYLON.Color3(0, 0, 0);

    // Whiskers
    var createWhisker = function (x, y, z) {
        var whiskerPath = [
            new BABYLON.Vector3(x - 0.3, y, z),
            new BABYLON.Vector3(x, y, z + 0.1),
            new BABYLON.Vector3(x + 0.3, y, z)
        ];
        var whisker = BABYLON.MeshBuilder.CreateTube("whisker", { path: whiskerPath, radius: 0.02, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
        whisker.material = new BABYLON.StandardMaterial("whiskerColor", scene);
        whisker.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        return whisker;
    };

    var whisker1 = createWhisker(-0.5, 0.8, 0.9);
    var whisker2 = whisker1.clone("whisker2");
    whisker2.position.y -= 0.1;

    var whisker3 = createWhisker(0.5, 0.8, 0.9);
    var whisker4 = whisker3.clone("whisker4");
    whisker4.position.y -= 0.1;

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
