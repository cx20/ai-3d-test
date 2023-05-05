// シーン、カメラ、レンダラーを設定
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 雪だるまの3つの球を作成
const geometry1 = new THREE.SphereGeometry(1, 32, 32);
const geometry2 = new THREE.SphereGeometry(0.8, 32, 32);
const geometry3 = new THREE.SphereGeometry(0.6, 32, 32);
const material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF
});

const sphere1 = new THREE.Mesh(geometry1, material);
const sphere2 = new THREE.Mesh(geometry2, material);
const sphere3 = new THREE.Mesh(geometry3, material);

sphere1.position.y = 1;
sphere2.position.y = 2.5;
sphere3.position.y = 3.7;

scene.add(sphere1);
scene.add(sphere2);
scene.add(sphere3);

// 鼻を作成
const noseGeometry = new THREE.ConeGeometry(0.1, 0.5, 32);
const noseMaterial = new THREE.MeshBasicMaterial({
    color: 0xFF4500
});
const nose = new THREE.Mesh(noseGeometry, noseMaterial);
nose.position.set(0, 3.7, 0.6);
nose.rotation.x = -Math.PI / 2;
scene.add(nose);

// 目を作成
const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const eyeMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000
});

const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
eye1.position.set(-0.2, 3.8, 0.5);
eye2.position.set(0.2, 3.8, 0.5);

scene.add(eye1);
scene.add(eye2);

// カメラを設定
camera.position.z = 6;

// アニメーションループ
function animate() {
    requestAnimationFrame(animate);

    // 雪だるまをゆっくり回転させる
    sphere1.rotation.y += 0.01;
    sphere2.rotation.y += 0.01;
    sphere3.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();
