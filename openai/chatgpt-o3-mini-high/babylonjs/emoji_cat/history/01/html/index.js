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
ChatGPTプロンプト：
Babylon.jsの基本meshを用いて{絵文字}を3Dで表現するサンプルを教えてください。
・まずは{絵文字}をどのように認識しているのか各部品の{形状}や{色}などその特徴を書き出してください。
・その特徴をもとに3Dで表現するようお願いします。
・各部品の{色}は元の絵文字の色を再現してください。
・テクスチャは使わず色を指定してください。
・Babylon.js Playground で動くようにしてください。

3D表現してほしい{絵文字}は🐱です。

使用モデル：ChatGPT o3-mini-high
https://chatgpt.com/share/679d6c97-3f0c-8012-918a-f127d9c5ff02
https://playground.babylonjs.com/#LS455D

*/

var createScene = function () {
    // Create a basic scene object.
    var scene = new BABYLON.Scene(engine);
    
    // Create and position an ArcRotateCamera
    var camera = new BABYLON.ArcRotateCamera("camera", 
        Math.PI / 2, Math.PI / 2.5, 6, new BABYLON.Vector3(0, 1, 0), scene);
    camera.attachControl(canvas, true);
    
    // Add a hemispheric light.
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    
    // ─── 顔 ────────────────────────────────
    var face = BABYLON.MeshBuilder.CreateSphere("face", { diameter: 2, segments: 32 }, scene);
    // 顔の中心を(0,1,0)に設定（半径1の球体）
    face.position = new BABYLON.Vector3(0, 1, 0);
    var faceMat = new BABYLON.StandardMaterial("faceMat", scene);
    faceMat.diffuseColor = BABYLON.Color3.FromHexString("#FFB74D");
    face.material = faceMat;
    
    // ─── 耳 ────────────────────────────────
    var earHeight = 0.8;
    var earSize = 0.7;
    
    // 左耳（外側）
    var earLeft = BABYLON.MeshBuilder.CreateCylinder("earLeft", { 
        diameterTop: 0, 
        diameterBottom: earSize, 
        height: earHeight, 
        tessellation: 3 
    }, scene);
    // 顔の上部左側に配置（位置は調整可能）
    earLeft.position = new BABYLON.Vector3(-0.7, 2, 0);
    earLeft.material = faceMat;  // 顔と同じオレンジ系
    
    // 右耳（外側）を左耳をクローンして左右対称に配置
    var earRight = earLeft.clone("earRight");
    earRight.position = new BABYLON.Vector3(0.7, 2, 0);
    
    // 左耳の内側
    var innerEarHeight = earHeight * 0.6;
    var innerEarSize = earSize * 0.6;
    var earLeftInner = BABYLON.MeshBuilder.CreateCylinder("earLeftInner", { 
        diameterTop: 0, 
        diameterBottom: innerEarSize, 
        height: innerEarHeight, 
        tessellation: 3 
    }, scene);
    // 内耳は左耳の子オブジェクトとして配置し、耳の内側中央に配置
    earLeftInner.parent = earLeft;
    earLeftInner.position = new BABYLON.Vector3(0, -earHeight / 4, 0);
    var earInnerMat = new BABYLON.StandardMaterial("earInnerMat", scene);
    earInnerMat.diffuseColor = BABYLON.Color3.FromHexString("#FFC0CB");
    earLeftInner.material = earInnerMat;
    
    // 右耳の内側（左耳内側をクローン）
    var earRightInner = earLeftInner.clone("earRightInner");
    earRightInner.parent = earRight;
    
    // ─── 目 ────────────────────────────────
    var eyeDiameter = 0.2;
    var eyeLeft = BABYLON.MeshBuilder.CreateSphere("eyeLeft", { diameter: eyeDiameter, segments: 16 }, scene);
    // 顔の正面、左目は少し左上（位置は顔中心(0,1,0)を基準に調整）
    eyeLeft.position = new BABYLON.Vector3(-0.3, 1.1, 0.95);
    var eyeMat = new BABYLON.StandardMaterial("eyeMat", scene);
    eyeMat.diffuseColor = BABYLON.Color3.FromHexString("#66BB6A");
    eyeLeft.material = eyeMat;
    
    var eyeRight = eyeLeft.clone("eyeRight");
    eyeRight.position = new BABYLON.Vector3(0.3, 1.1, 0.95);
    
    // ─── 鼻 ────────────────────────────────
    var nose = BABYLON.MeshBuilder.CreateSphere("nose", { diameter: 0.15, segments: 16 }, scene);
    // 鼻は顔の正面中央、目より少し下に配置
    nose.position = new BABYLON.Vector3(0, 0.9, 0.95);
    var noseMat = new BABYLON.StandardMaterial("noseMat", scene);
    noseMat.diffuseColor = BABYLON.Color3.FromHexString("#FF4081");
    nose.material = noseMat;
    
    // ─── 口 ────────────────────────────────
    // 口は鼻の下に軽いカーブを描くチューブで表現
    var mouthPoints = [
        new BABYLON.Vector3(-0.2, 0.8, 0.95),
        new BABYLON.Vector3(0, 0.75, 0.95),
        new BABYLON.Vector3(0.2, 0.8, 0.95)
    ];
    var mouth = BABYLON.MeshBuilder.CreateTube("mouth", { 
        path: mouthPoints, 
        radius: 0.02, 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE 
    }, scene);
    var mouthMat = new BABYLON.StandardMaterial("mouthMat", scene);
    mouthMat.diffuseColor = BABYLON.Color3.Black();
    mouth.material = mouthMat;
    
    // ─── ひげ ────────────────────────────────
    // 左側ひげ（3本）
    var whiskerMat = new BABYLON.StandardMaterial("whiskerMat", scene);
    whiskerMat.diffuseColor = BABYLON.Color3.Black();
    
    var whiskerLeft1 = BABYLON.MeshBuilder.CreateTube("whiskerLeft1", { 
        path: [new BABYLON.Vector3(-0.95, 1, 0.95), new BABYLON.Vector3(-1.5, 1, 0.95)], 
        radius: 0.005 
    }, scene);
    whiskerLeft1.material = whiskerMat;
    
    var whiskerLeft2 = BABYLON.MeshBuilder.CreateTube("whiskerLeft2", { 
        path: [new BABYLON.Vector3(-0.95, 0.95, 0.95), new BABYLON.Vector3(-1.5, 0.9, 0.95)], 
        radius: 0.005 
    }, scene);
    whiskerLeft2.material = whiskerMat;
    
    var whiskerLeft3 = BABYLON.MeshBuilder.CreateTube("whiskerLeft3", { 
        path: [new BABYLON.Vector3(-0.95, 0.9, 0.95), new BABYLON.Vector3(-1.5, 0.8, 0.95)], 
        radius: 0.005 
    }, scene);
    whiskerLeft3.material = whiskerMat;
    
    // 右側ひげ（3本）— 左側の座標を左右反転
    var whiskerRight1 = BABYLON.MeshBuilder.CreateTube("whiskerRight1", { 
        path: [new BABYLON.Vector3(0.95, 1, 0.95), new BABYLON.Vector3(1.5, 1, 0.95)], 
        radius: 0.005 
    }, scene);
    whiskerRight1.material = whiskerMat;
    
    var whiskerRight2 = BABYLON.MeshBuilder.CreateTube("whiskerRight2", { 
        path: [new BABYLON.Vector3(0.95, 0.95, 0.95), new BABYLON.Vector3(1.5, 0.9, 0.95)], 
        radius: 0.005 
    }, scene);
    whiskerRight2.material = whiskerMat;
    
    var whiskerRight3 = BABYLON.MeshBuilder.CreateTube("whiskerRight3", { 
        path: [new BABYLON.Vector3(0.95, 0.9, 0.95), new BABYLON.Vector3(1.5, 0.8, 0.95)], 
        radius: 0.005 
    }, scene);
    whiskerRight3.material = whiskerMat;
    
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
