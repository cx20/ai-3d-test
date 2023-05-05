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
    // シーンの作成
    const scene = new BABYLON.Scene(engine);

    // カメラの作成
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // ライトの作成
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // 雪だるまの作成
    const sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", { diameter: 1 }, scene);
    const sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", { diameter: 1.5 }, scene);
    const sphere3 = BABYLON.MeshBuilder.CreateSphere("sphere3", { diameter: 2 }, scene);

    sphere1.position.y = 1.5;
    sphere2.position.y = 2.75;
    sphere3.position.y = 4;

    sphere2.position.z = 0.75;
    sphere3.position.z = -0.75;

    // 雪だるまのマテリアル
    const material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseColor = BABYLON.Color3.White();

    sphere1.material = material;
    sphere2.material = material;
    sphere3.material = material;

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
