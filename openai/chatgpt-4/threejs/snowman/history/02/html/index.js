// シーンの作成
const scene = new THREE.Scene();

// カメラの作成
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// レンダラーの作成
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 雪だるまの作成
const createSnowman = () => {
    const snowman = new THREE.Group();
    
    // 雪玉（からだ）の作成
    const body = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
    );
    snowman.add(body);

    // 雪玉（頭）の作成
    const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.6, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
    );
    head.position.y = 1.3;
    snowman.add(head);

    // 顔の作成
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), eyeMaterial);
    leftEye.position.set(-0.2, 1.35, 0.55);
    snowman.add(leftEye);

    const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), eyeMaterial);
    rightEye.position.set(0.2, 1.35, 0.55);
    snowman.add(rightEye);

    const nose = new THREE.Mesh(
        new THREE.ConeGeometry(0.1, 0.4, 16),
        new THREE.MeshBasicMaterial({ color: 0xFF9900 })
    );
    nose.position.set(0, 1.3, 0.6);
    nose.rotation.z = Math.PI / 2;
    snowman.add(nose);

    return snowman;
};

const snowman = createSnowman();
scene.add(snowman);

// アニメーション
function animate() {
    requestAnimationFrame(animate);

    snowman.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();