const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry1 = new THREE.SphereGeometry(2, 32, 32);
const geometry2 = new THREE.SphereGeometry(1.5, 32, 32);
const geometry3 = new THREE.SphereGeometry(1, 32, 32);

const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const sphere1 = new THREE.Mesh(geometry1, material);
const sphere2 = new THREE.Mesh(geometry2, material);
const sphere3 = new THREE.Mesh(geometry3, material);

sphere1.position.y = -1;
sphere2.position.y = 2;
sphere3.position.y = 4.5;

scene.add(sphere1);
scene.add(sphere2);
scene.add(sphere3);

camera.position.z = 10;

const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();