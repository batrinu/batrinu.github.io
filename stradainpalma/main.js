navigator.geolocation.getCurrentPosition(function(position) {
    // Set up the Three.js scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  
    // Use the device's GPS coordinates to place markers
    var marker = new THREE.Object3D();
    marker.position.set(position.coords.latitude, position.coords.longitude, 0);
    scene.add(marker);
  
    // Use the device's rear camera as the background
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }})
      .then(function(stream) {
        var video = document.createElement("video");
        video.srcObject = stream;
        video.play();
        var videoTexture = new THREE.VideoTexture(video);
        var videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
        var videoGeometry = new THREE.PlaneGeometry(10, 10 * window.innerHeight / window.innerWidth);
        var videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
        videoMesh.position.z = -5;
        scene.add(videoMesh);
      });
  
    // Embed a Youtube video as a marker
    var iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ";
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    var iframeTexture = new THREE.Texture(iframe);
    var iframeMaterial = new THREE.MeshBasicMaterial({ map: iframeTexture });
    var iframeGeometry = new THREE.PlaneGeometry(0.5, 0.5 * window.innerHeight / window.innerWidth);
    var iframeMesh = new THREE.Mesh(iframeGeometry, iframeMaterial);
    iframeMesh.position.set(0, 0, 1);
    marker.add(iframeMesh);
  
    // Render the scene
    var render = function() {
      requestAnimationFrame(render);
      iframeTexture.needsUpdate = true;
      renderer.render(scene, camera);
    };
    render();
  });
  