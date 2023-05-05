// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 雪だるまの体を作成
const bodyGeometry = new THREE.SphereGeometry(1.2, 32, 32);
const bodyMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff
});
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.y = 1.2;
scene.add(body);

// 雪だるまの頭を作成
const headGeometry = new THREE.SphereGeometry(0.8, 32, 32);
const headMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff
});
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.y = 3;
scene.add(head);

// 雪だるまの目を作成
const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const eyeMaterial = new THREE.MeshPhongMaterial({
    color: 0x000000
});

const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
leftEye.position.set(-0.3, 3.1, 0.7);
scene.add(leftEye);

const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
rightEye.position.set(0.3, 3.1, 0.7);
scene.add(rightEye);

// 雪だるまの鼻を作成
const noseGeometry = new THREE.ConeGeometry(0.1, 0.5, 32);
const noseMaterial = new THREE.MeshPhongMaterial({
    color: 0xff6600
});
const nose = new THREE.Mesh(noseGeometry, noseMaterial);
nose.position.set(0, 3, 0.8);
nose.rotation.set(0, 0, Math.PI / 2);
scene.add(nose);

// ライトを作成
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

// アニメーションループ
const animate = function() {
    requestAnimationFrame(animate);

    // 雪だるまを回転させる
    body.rotation.y += 0.01;
    head.rotation.y += 0.01;
    leftEye.rotation.y += 0.01;
    rightEye.rotation.y += 0.01;
    nose.rotation.y += 0.01;
    // レンダリング
    renderer.render(scene, camera);
};

animate();

// ウィンドウサイズ変更に対応
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
