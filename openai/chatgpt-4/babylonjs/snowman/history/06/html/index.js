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
    // シーンの作成
    const scene = new BABYLON.Scene(engine);

    // カメラの作成
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(0, 2, 0), scene);
    camera.attachControl(canvas, true);

    // ライトの作成
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // 雪だるまの身体部分を作成
    const bodyMaterial = new BABYLON.StandardMaterial("bodyMaterial", scene);
    bodyMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

    const lowerSphere = BABYLON.MeshBuilder.CreateSphere("lowerSphere", { diameter: 2 }, scene);
    lowerSphere.position.y = 1;
    lowerSphere.material = bodyMaterial;

    const middleSphere = BABYLON.MeshBuilder.CreateSphere("middleSphere", { diameter: 1.5 }, scene);
    middleSphere.position.y = 2.75;
    middleSphere.material = bodyMaterial;

    const upperSphere = BABYLON.MeshBuilder.CreateSphere("upperSphere", { diameter: 1 }, scene);
    upperSphere.position.y = 4;
    upperSphere.material = bodyMaterial;

    // 雪だるまの顔のパーツを作成
    const faceMaterial = new BABYLON.StandardMaterial("faceMaterial", scene);
    faceMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

    const leftEye = BABYLON.MeshBuilder.CreateSphere("leftEye", { diameter: 0.1 }, scene);
    leftEye.position.x = -0.25;
    leftEye.position.y = 4.1;
    leftEye.position.z = 0.45;
    leftEye.material = faceMaterial;

    const rightEye = BABYLON.MeshBuilder.CreateSphere("rightEye", { diameter: 0.1 }, scene);
    rightEye.position.x = 0.25;
    rightEye.position.y = 4.1;
    rightEye.position.z = 0.45;
    rightEye.material = faceMaterial;

    const nose = BABYLON.MeshBuilder.CreateCylinder("nose", { height: 0.1, diameterTop: 0, diameterBottom: 0.15, tessellation: 12 }, scene);
    nose.position.y = 4;
    nose.position.z = 0.55;
    nose.rotation.x = Math.PI / 2;
    nose.material = faceMaterial;

    // 雪だるまの帽子を作成
    const hatMaterial = new BABYLON.StandardMaterial("hatMaterial", scene);
    hatMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

    const hatBrim = BABYLON.MeshBuilder.CreateCylinder("hatBrim", { height: 0.1, diameterTop: 1.5, diameterBottom: 1.5, tessellation: 32 }, scene);
    hatBrim.position.y = 4.5;
    hatBrim.material = hatMaterial;

    const hatTop = BABYLON.MeshBuilder.CreateCylinder("hatTop", { height: 1, diameterTop: 1, diameterBottom: 1, tessellation: 32 }, scene);
    hatTop.position.y = 5;
    hatTop.material = hatMaterial;

    // 雪だるまのマフラーを作成
    const scarfMaterial = new BABYLON.StandardMaterial("scarfMaterial", scene);
    scarfMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);

    const scarfSegmentAngle = Math.PI / 6;
    const scarfSegments = 12;
    const scarfRadius = 0.75;

    for (let i = 0; i < scarfSegments; i++) {
        const scarfSegment = BABYLON.MeshBuilder.CreateBox("scarfSegment", { height: 0.2, width: 0.2, depth: 0.05 }, scene);
        scarfSegment.position.x = scarfRadius * Math.cos(i * scarfSegmentAngle);
        scarfSegment.position.y = 2.75;
        scarfSegment.position.z = scarfRadius * Math.sin(i * scarfSegmentAngle);
        scarfSegment.rotation.y = i * scarfSegmentAngle;
        scarfSegment.material = scarfMaterial;
    }

    const scarfTail = BABYLON.MeshBuilder.CreateBox("scarfTail", { height: 0.2, width: 0.2, depth: 0.5 }, scene);
    scarfTail.position.x = 1.1;
    scarfTail.position.y = 2.3;
    scarfTail.position.z = 1.1;
    scarfTail.rotation.y = -Math.PI / 4;
    scarfTail.material = scarfMaterial;

    // グラウンドを作成
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 1);
    ground.material = groundMaterial;

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
