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

const createScene = function () {
    // Create the scene space
    const scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas
    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Add a light to the scene
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Create the base sphere for the snowman (bottom part)
    const bottomSphere = BABYLON.MeshBuilder.CreateSphere("bottomSphere", {diameter: 3}, scene);
    bottomSphere.position.y = 1.5;

    // Create the middle sphere for the snowman (middle part)
    const middleSphere = BABYLON.MeshBuilder.CreateSphere("middleSphere", {diameter: 2}, scene);
    middleSphere.position.y = 3.5;

    // Create the head sphere for the snowman (top part)
    const headSphere = BABYLON.MeshBuilder.CreateSphere("headSphere", {diameter: 1}, scene);
    headSphere.position.y = 4.8;

    // Create the left eye of the snowman
    const leftEye = BABYLON.MeshBuilder.CreateSphere("leftEye", {diameter: 0.1}, scene);
    leftEye.position.y = 4.9;
    leftEye.position.x = -0.2;
    leftEye.position.z = 0.4;

    // Create the right eye of the snowman
    const rightEye = BABYLON.MeshBuilder.CreateSphere("rightEye", {diameter: 0.1}, scene);
    rightEye.position.y = 4.9;
    rightEye.position.x = 0.2;
    rightEye.position.z = 0.4;

    // Create the nose of the snowman
    const nose = BABYLON.MeshBuilder.CreateCylinder("nose", {height: 0.5, diameterTop: 0.01, diameterBottom: 0.2, tessellation: 8}, scene);
    nose.rotation.x = Math.PI/2;
    nose.position.y = 4.8;
    nose.position.z = 0.7;

    // Create a ground plane
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 10}, scene);

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
