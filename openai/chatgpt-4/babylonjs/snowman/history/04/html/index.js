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
    // Create a basic BJS Scene object
    const scene = new BABYLON.Scene(engine);

    // Create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    //const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(0, 0, 0), scene);

    // Target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas
    camera.attachControl(canvas, false);

    // Create a basic light, aiming 0,1,0 - meaning, to the sky
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

    // Create the bottom, middle and top sphere for the snowman
    const bottomSphere = BABYLON.MeshBuilder.CreateSphere('bottomSphere', {diameter: 3, segments: 32}, scene);
    bottomSphere.position.y = 1.5;

    const middleSphere = BABYLON.MeshBuilder.CreateSphere('middleSphere', {diameter: 2, segments: 32}, scene);
    middleSphere.position.y = 3.5;

    const topSphere = BABYLON.MeshBuilder.CreateSphere('topSphere', {diameter: 1, segments: 32}, scene);
    topSphere.position.y = 5;

    // Create the snow material and texture for the snowman
    const snowMaterial = new BABYLON.StandardMaterial('snowMaterial', scene);
    snowMaterial.diffuseColor = new BABYLON.Color3(0.9, 0.9, 1);
    snowMaterial.specularColor = new BABYLON.Color3(0.9, 0.9, 1);

    // Apply the snow material and texture to the spheres
    bottomSphere.material = snowMaterial;
    middleSphere.material = snowMaterial;
    topSphere.material = snowMaterial;

    // You can add more details like eyes, mouth, buttons, etc. using other meshes

    // Return the created scene
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
