import { AxesHelper, BufferGeometry, Clock, DoubleSide, Float32BufferAttribute, Group, MathUtils, PerspectiveCamera, Points, PointsMaterial, Scene, TextureLoader, WebGLRenderer } from 'three';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'




const textureLoader = new TextureLoader();
const circleTexture = textureLoader.load("bulle.png")
const scene = new Scene();
const count = 100;
const distanceMax = 4;

const points = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
const sizes = new Float32Array(count);
for (let i = 0; i < points.length; i++) {
  points[i] = MathUtils.randFloatSpread(distanceMax);
  colors[i] = Math.random() * 0.8 - Math.random() * 0.2 + 0.6;
  sizes[i] = Math.random();
}

const a = new Float32BufferAttribute(sizes)

console.log(a);

const geometry = new BufferGeometry();
geometry.setAttribute('position', new Float32BufferAttribute(points, 3));
geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

const pointMaterial = new PointsMaterial({
  size : Math.random(),
  vertexColors: true,
  map: circleTexture,
  transparent: true,
  alphaTest: 0.10,
  depthWrite: false,
  depthTest: true
  
});

scene.add(new AxesHelper());
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 2;
camera.position.y = 0.5;
camera.position.x = 0.5;
scene.add(camera);
const pointsObject = new Points(geometry, pointMaterial)

const group = new Group();
group.add(pointsObject);
scene.add(group);

const renderer = new WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0)
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);


const controls = new OrbitControls(camera, renderer.domElement);
const clock = new Clock()

let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove', e => {

  mouseX = e.clientX
  mouseY = e.clientY

})

function tick() {
  const time = clock.getElapsedTime();
  group.rotation.x = time * 0.1;
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
  controls.update();

  const ratioW = (mouseX / window.innerWidth - 0.5) * 2
  const ratioH = (mouseY / window.innerHeight - 0.5) * 2
  group.rotation.y = ratioW * 3.14 * 0.1 + ratioH * 3.14 * 0.1;

  //! on ne sait pas combien de fosi par seconde est appellé le tick on place donc une clock
  // group.rotateY(0.01)
  // camera.position.x += 0.001;
  // camera.position.y += 0.001;
  // camera.lookAt(0,0,0);

}


tick();

window.addEventListener('resize', () => {
  camera.aspect = (window.innerWidth / window.innerHeight);
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});



