// シーン、カメラ、レンダラーの作成
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 雪だるまの体を作成
const bodyGeometry = new THREE.SphereGeometry(2, 32, 32);
const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
scene.add(body);

// 雪だるまの頭を作成
const headGeometry = new THREE.SphereGeometry(1, 32, 32);
const headMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.set(0, 2.5, 0);
scene.add(head);

// 雪だるまの目を作成
const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
leftEye.position.set(-0.3, 2.7, 0.9);
scene.add(leftEye);

const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
rightEye.position.set(0.3, 2.7, 0.9);
scene.add(rightEye);

// 雪だるまの鼻を作成
const noseGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 32);
const noseMaterial = new THREE.MeshBasicMaterial({ color: 0xFF8000 });
const nose = new THREE.Mesh(noseGeometry, noseMaterial);
nose.position.set(0, 2.5, 1);
nose.rotation.x = Math.PI / 2;
scene.add(nose);

// 雪だるまの口を作成
const mouthGeometry = new THREE.SphereGeometry(0.07, 32, 32);
const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
for (let i = 0; i < 5; i++) {
    const mouthPart = new THREE.Mesh(mouthGeometry, mouthMaterial);
    const angle = Math.PI / 4 * i - Math.PI / 2;
    const radius = 0.4;
    mouthPart.position.set(
        radius * Math.cos(angle),
        2.3 + radius * Math.sin(angle),
        0.9
    );
    scene.add(mouthPart);
}

// カメラの位置を設定
camera.position.z = 7;

// アニメーションループ
function animate() {
    requestAnimationFrame(animate);

    // 雪だるまを回転させる
    body.rotation.y += 0.01;
    head.rotation.y += 0.01;

    // レンダリング
    renderer.render(scene, camera);
}

animate();
