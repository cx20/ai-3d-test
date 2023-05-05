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
ChatGPT prompt:
Please give me a sample to make a snowman with Babylon.js.
The conditions are as follows.
・Please present only the part of the CreateScene function.
*/

// CreateScene function
function createScene(engine) {
    var scene = new BABYLON.Scene(engine);

    // Camera and light setup
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, Math.PI / 3, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Materials
    var snowMaterial = new BABYLON.StandardMaterial("snowMaterial", scene);
    snowMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
    var hatMaterial = new BABYLON.StandardMaterial("hatMaterial", scene);
    hatMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    var buttonMaterial = new BABYLON.StandardMaterial("buttonMaterial", scene);
    buttonMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    var noseMaterial = new BABYLON.StandardMaterial("noseMaterial", scene);
    noseMaterial.diffuseColor = new BABYLON.Color3(1, 0.4, 0);

    // Snowman body and head
    var body = BABYLON.MeshBuilder.CreateSphere("body", {
        diameter: 4
    }, scene);
    body.position.y = 2;
    body.material = snowMaterial;

    var head = BABYLON.MeshBuilder.CreateSphere("head", {
        diameter: 2
    }, scene);
    head.position.y = 5;
    head.material = snowMaterial;

    // Eyes
    var leftEye = BABYLON.MeshBuilder.CreateSphere("leftEye", {
        diameter: 0.2
    }, scene);
    leftEye.position.y = 5.3;
    leftEye.position.x = -0.5;
    leftEye.position.z = 0.9;
    leftEye.material = buttonMaterial;

    var rightEye = BABYLON.MeshBuilder.CreateSphere("rightEye", {
        diameter: 0.2
    }, scene);
    rightEye.position.y = 5.3;
    rightEye.position.x = 0.5;
    rightEye.position.z = 0.9;
    rightEye.material = buttonMaterial;

    // Nose
    var nose = BABYLON.MeshBuilder.CreateCylinder("nose", {
        height: 0.1,
        diameterTop: 0.05,
        diameterBottom: 0.2,
        tessellation: 16
    }, scene);
    nose.rotation.z = Math.PI / 2;
    nose.position.y = 5;
    nose.position.z = 1.05;
    nose.material = noseMaterial;

    // Hat
    var hatBrim = BABYLON.MeshBuilder.CreateCylinder("hatBrim", {
        height: 0.2,
        diameterTop: 3.4,
        diameterBottom: 3.4,
        tessellation: 32
    }, scene);
    hatBrim.position.y = 6.1;
    hatBrim.material = hatMaterial;

    var hatTop = BABYLON.MeshBuilder.CreateCylinder("hatTop", {
        height: 1.5,
        diameterTop: 0,
        diameterBottom: 2,
        tessellation: 32
    }, scene);
    hatTop.position.y = 7.1;
    hatTop.material = hatMaterial;

    // Ground
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {
        width: 20,
        height: 20
    }, scene);
    ground.material = snowMaterial;

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
