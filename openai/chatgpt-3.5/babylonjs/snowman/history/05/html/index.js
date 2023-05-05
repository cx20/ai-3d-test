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
    var camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // ライトの作成
    //var light = new BABYLON.PointLight("light", BABYLON.Vector3.Zero(), scene);
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // 地面の作成
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

    // 雪だるまの作成
    var snowmanBody = BABYLON.MeshBuilder.CreateSphere("snowmanBody", { diameter: 3 }, scene);
    var snowmanHead = BABYLON.MeshBuilder.CreateSphere("snowmanHead", { diameter: 2 }, scene);
    var snowmanHat = BABYLON.MeshBuilder.CreateCylinder("snowmanHat", { height: 1, diameter: 1, tessellation: 16 }, scene);
    var snowmanNose = BABYLON.MeshBuilder.CreateCylinder("snowmanNose", { height: 1, diameterTop: 0, diameterBottom: 0.5, tessellation: 16 }, scene);

    // 雪だるまの位置設定
    snowmanBody.position.y = 1.5;
    snowmanHead.position.y = 3;
    snowmanHat.position.y = 4.5;
    snowmanNose.rotation.z = Math.PI / 2;
    snowmanNose.position.x = 1.5;
    snowmanNose.position.y = 2.8;

    // 雪だるまのマテリアル設定
    var snowmanMaterial = new BABYLON.StandardMaterial("snowmanMaterial", scene);
    snowmanMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
    snowmanBody.material = snowmanMaterial;
    snowmanHead.material = snowmanMaterial;
    snowmanHat.material = snowmanMaterial;
    snowmanNose.material = snowmanMaterial;

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
