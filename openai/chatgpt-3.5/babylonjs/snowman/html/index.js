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
  var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  // ライトの作成
  var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);

  // 雪だるまのボディの作成
  var bodyMaterial = new BABYLON.StandardMaterial("bodyMaterial", scene);
  bodyMaterial.diffuseColor = new BABYLON.Color3(0.9, 0.9, 0.9);
  var body = BABYLON.MeshBuilder.CreateSphere("body", {diameter: 1.5}, scene);
  body.material = bodyMaterial;

  // 雪だるまの頭の作成
  var headMaterial = new BABYLON.StandardMaterial("headMaterial", scene);
  headMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
  var head = BABYLON.MeshBuilder.CreateSphere("head", {diameter: 1}, scene);
  head.material = headMaterial;
  head.position.y = 1.5;

  // 雪だるまの目の作成
  var eyeMaterial = new BABYLON.StandardMaterial("eyeMaterial", scene);
  eyeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  var leftEye = BABYLON.MeshBuilder.CreateSphere("leftEye", {diameter: 0.2}, scene);
  leftEye.material = eyeMaterial;
  leftEye.position = new BABYLON.Vector3(-0.3, 1.6, 0.5);
  var rightEye = BABYLON.MeshBuilder.CreateSphere("rightEye", {diameter: 0.2}, scene);
  rightEye.material = eyeMaterial;
  rightEye.position = new BABYLON.Vector3(0.3, 1.6, 0.5);

  // 雪だるまの鼻の作成
  var noseMaterial = new BABYLON.StandardMaterial("noseMaterial", scene);
  noseMaterial.diffuseColor = new BABYLON.Color3(1, 0.5, 0);
  var nose = BABYLON.MeshBuilder.CreateCylinder("nose", {height: 0.5, diameterTop: 0.1, diameterBottom: 0.5}, scene);
  nose.material = noseMaterial;
  nose.position = new BABYLON.Vector3(0, 1.3, 0.75);
  nose.rotation.x = Math.PI / 2;

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
