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
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;


    // 頭部
    const head = BABYLON.MeshBuilder.CreateSphere("head", { diameter: 2 }, scene);
    head.position.y = 1;
    const headMaterial = new BABYLON.StandardMaterial("headMaterial", scene);
    headMaterial.diffuseColor = new BABYLON.Color3(1, 0.6, 0);
    head.material = headMaterial;

    // 耳
    const ear = (left = true) => {
        const ear = BABYLON.MeshBuilder.CreateCylinder("ear", { height: 1, diameterTop: 0, diameterBottom: 1, tessellation: 4 }, scene);
        ear.scaling.x = 0.5;
        ear.rotation.z = Math.PI / 4;
        ear.position.y = 2;
        ear.position.x = left ? -0.75 : 0.75;
        const earMaterial = new BABYLON.StandardMaterial("earMaterial", scene);
        earMaterial.diffuseColor = new BABYLON.Color3(1, 0.6, 0);
        ear.material = earMaterial;
        return ear;
    };
    head.addChild(ear());
    head.addChild(ear(false));

    // 目
    const eye = (left = true) => {
        const eye = BABYLON.MeshBuilder.CreateSphere("eye", { diameter: 0.5, slice: 0.5 }, scene);
        eye.position.y = 1.25;
        eye.position.z = -0.75;

        eye.position.x = left ? -0.5 : 0.5;
        const eyeMaterial = new BABYLON.StandardMaterial("eyeMaterial", scene);
        eyeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        eye.material = eyeMaterial;
        return eye;
    }

    head.addChild(eye());
    head.addChild(eye(false));

    // 鼻
    const nose = BABYLON.MeshBuilder.CreateCylinder("nose", { height: 0.1, diameterTop: 0, diameterBottom: 0.5, tessellation: 4 }, scene);
    nose.rotation.x = Math.PI / 2;
    nose.position.y = 1;
    nose.position.z = -0.9;
    const noseMaterial = new BABYLON.StandardMaterial("noseMaterial", scene);
    noseMaterial.diffuseColor = new BABYLON.Color3(1, 0.8, 0.8);
    nose.material = noseMaterial;
    head.addChild(nose);

    // 口
    const mouth = BABYLON.MeshBuilder.CreateTube("mouth", { path: [new BABYLON.Vector3(-0.3, 0.8, -0.9), new BABYLON.Vector3(0, 0.6, -0.9), new BABYLON.Vector3(0.3, 0.8, -0.9)], radius: 0.05 }, scene);
    const mouthMaterial = new BABYLON.StandardMaterial("mouthMaterial", scene);
    mouthMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    mouth.material = mouthMaterial;
    head.addChild(mouth);

    // ひげ
    const whisker = (left = true, yOffset) => {
        const whisker = BABYLON.MeshBuilder.CreateTube("whisker", { path: [new BABYLON.Vector3(left ? -1 : 1, yOffset, -0.9), new BABYLON.Vector3(left ? 0 : 0, yOffset, -0.9), new BABYLON.Vector3(left ? 1 : -1, yOffset, -0.9)], radius: 0.02 }, scene);
        const whiskerMaterial = new BABYLON.StandardMaterial("whiskerMaterial", scene);
        whiskerMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        whisker.material = whiskerMaterial;
        return whisker;
    };
    head.addChild(whisker(true, 1.1));
    head.addChild(whisker(true, 0.9));
    head.addChild(whisker(false, 1.1));
    head.addChild(whisker(false, 0.9));

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
