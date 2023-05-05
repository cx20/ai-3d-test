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
    // シーンを作成
    var scene = new BABYLON.Scene(engine);

    // カメラを作成
    //var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // ライトを作成
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // 雪だるまのマテリアルを作成
    var snowMaterial = new BABYLON.StandardMaterial("snowMaterial", scene);
    snowMaterial.diffuseColor = BABYLON.Color3.White();
    snowMaterial.specularColor = BABYLON.Color3.Black();

    // 雪だるまの形状を作成
    var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", { diameter: 2, segments: 32 }, scene);
    sphere1.position.y = 1;

    var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", { diameter: 1.5, segments: 32 }, scene);
    sphere2.position.y = 3;

    var sphere3 = BABYLON.MeshBuilder.CreateSphere("sphere3", { diameter: 1, segments: 32 }, scene);
    sphere3.position.y = 4.5;

    // 雪だるまにマテリアルを適用
    sphere1.material = snowMaterial;
    sphere2.material = snowMaterial;
    sphere3.material = snowMaterial;

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
