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
    // create scene and engine
    var scene = new BABYLON.Scene(engine);
    var engine = new BABYLON.Engine(canvas, true);

    // create camera
    var camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(0, 5, -10));
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);

    // create snow material
    var snowMaterial = new BABYLON.StandardMaterial("snow", scene);
    snowMaterial.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/snow/snow.png", scene);
    snowMaterial.diffuseTexture.uScale = 5;
    snowMaterial.diffuseTexture.vScale = 5;

    // create snowman body
    var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", { diameter: 3 }, scene);
    sphere1.material = snowMaterial;
    sphere1.position.y = 1.5;

    // create snowman head
    var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", { diameter: 2 }, scene);
    sphere2.material = snowMaterial;
    sphere2.position.y = 4.5;

    // create snowman eyes
    var eye1 = BABYLON.MeshBuilder.CreateSphere("eye1", { diameter: 0.5 }, scene);
    eye1.material = new BABYLON.StandardMaterial("eyeMat", scene);
    eye1.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    eye1.position.x = 0.6;
    eye1.position.y = 4.8;
    eye1.position.z = 1.9;

    var eye2 = eye1.clone("eye2");
    eye2.position.z = -1.9;

    // create snowman nose
    var nose = BABYLON.MeshBuilder.CreateCylinder("nose", { height: 2, diameter: 0.2 }, scene);
    nose.material = new BABYLON.StandardMaterial("noseMat", scene);
    nose.material.diffuseColor = new BABYLON.Color3(1, 0.5, 0);
    nose.rotation.x = Math.PI / 2;
    nose.position.y = 4.5;
    nose.position.z = 2.5;

    // create ground
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/snow/snow-512.jpg", scene);

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
