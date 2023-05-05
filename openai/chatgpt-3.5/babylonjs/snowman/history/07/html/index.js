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
    var scene = new BABYLON.Scene(engine);

    // カメラの作成
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // 地面の作成
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

    // 雪だるまの作成
    var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", { diameter: 2 }, scene);
    sphere1.position.y = 1;

    var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", { diameter: 1.5 }, scene);
    sphere2.position.y = 3;

    var sphere3 = BABYLON.MeshBuilder.CreateSphere("sphere3", { diameter: 1 }, scene);
    sphere3.position.y = 4.5;

    // 雪だるまのマテリアルの作成
    var snowMaterial = new BABYLON.StandardMaterial("snowMaterial", scene);
    snowMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
    snowMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    // 雪だるまのマテリアルを割り当てる
    sphere1.material = snowMaterial;
    sphere2.material = snowMaterial;
    sphere3.material = snowMaterial;

    // ライトの作成
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

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
