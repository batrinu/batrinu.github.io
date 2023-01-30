// Set up the Three.js scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container").appendChild(renderer.domElement);

// Use the device's GPS coordinates to place markers
navigator.geolocation.getCurrentPosition(function(position) {
  var marker = new THREE.Object3D();
  marker.position.set(position.coords.latitude, position.coords.longitude, 0);
  scene.add(marker);
});

// Display the Youtube video
var video = document.createElement("video");
video.src = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
video.play();
var videoTexture = new THREE.VideoTexture(video);
var videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
var videoGeometry = new THREE.PlaneGeometry(1, 1);
var videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
videoMesh.position.set(0, 0, -1);
marker.add(videoMesh);

// Use the device's rear camera as the background
var constraints = { video: { facingMode: "environment" } };
navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
  var video = document.createElement("video");
  video.srcObject = stream;
  video.play();
  var videoTexture = new THREE.VideoTexture(video);
  var videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
  var videoGeometry = new THREE.PlaneGeometry(10, 10);
  var videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
  videoMesh.position.z = -5;
  scene.add(videoMesh);
});

// Render the scene
var render = function() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};
render();
