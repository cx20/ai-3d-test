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
    var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 3, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // ライトを作成
    var light = new BABYLON.PointLight("light", new BABYLON.Vector3(5, 10, -5), scene);

    // 地面を作成
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

    // 雪だるまの部品を作成
    var snowball1 = BABYLON.MeshBuilder.CreateSphere("snowball1", { diameter: 2 }, scene);
    snowball1.position.y = 1;

    var snowball2 = BABYLON.MeshBuilder.CreateSphere("snowball2", { diameter: 1.5 }, scene);
    snowball2.position.y = 3;

    var snowball3 = BABYLON.MeshBuilder.CreateSphere("snowball3", { diameter: 1 }, scene);
    snowball3.position.y = 4.5;

    // 雪だるまをグループ化
    var snowman = BABYLON.Mesh.MergeMeshes([snowball1, snowball2, snowball3], true);

    // 雪だるまを配置
    snowman.position.y = 1.5;

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
