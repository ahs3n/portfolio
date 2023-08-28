import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/RGBELoader.js';


const separation = 5;
const speed = 0.04;

let scene = new THREE.Scene();
let core = new THREE.Mesh();
scene.add(core);

const loader = new GLTFLoader();




let camera = new THREE.PerspectiveCamera(60, window.innerWidth/(window.innerHeight*0.5), 0.1, 1000 );
camera.position.z = 5;
camera.rotation.x = -Math.PI / 8;
camera.position.y = 2.5;

let renderer = new THREE.WebGLRenderer({antialias:true});

renderer.setClearColor("#000");

renderer.setSize( window.innerWidth, window.innerHeight * 0.5 );
renderer.setPixelRatio( window.devicePixelRatio );

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
// renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;


document.body.appendChild( renderer.domElement );



// LIGHT ////////////////

new RGBELoader().load( './assets/skybox.hdr', function ( texture ) {

    texture.mapping = THREE.EquirectangularReflectionMapping;

    // scene.background = texture;
    scene.environment = texture;
    
} );


// SpotLight( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )
const slight = new THREE.SpotLight( "#FFF", 0.7, 0, 0.6, 1, 1 );
slight.position.set(-5, 4, 5);
slight.target.position.set(0, 0, -2);
slight.castShadow = true;
core.add(slight);
core.add(slight.target);


const sslight = new THREE.SpotLight( "#FFF", 1.5, 0, 0.4, 1, 1 );
sslight.position.set(3, 5, 4);
sslight.target.position.set(0, 0, -2);
sslight.castShadow = true;
core.add(sslight);
core.add(sslight.target);




// GEOMETRY ////////////////

const planeGeo = new THREE.PlaneGeometry( 3000, 3000 );
const whiteMat = new THREE.MeshStandardMaterial( { color: "#AAA" } );
whiteMat.roughness = 1
whiteMat.metalness = 0.6

let plane = new THREE.Mesh(planeGeo, whiteMat);
plane.position.set(0, 0, 0);
plane.rotation.set(Math.PI / -2, 0, 0);
plane.receiveShadow = true;

scene.add(plane);


let cars = [];
loader.load( './assets/camaro.glb', function ( gltf ) {
    let i = 0;
    cars[i] = gltf.scene;
	scene.add( cars[i] );
    cars[i].position.set(i*separation, 0, -1);
    cars[i].traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true
        }
    });


},undefined,function(error){console.error(error);});


loader.load( './assets/jesko.glb', function ( gltf ) {
    let i = 1;
    cars[i] = gltf.scene;
	scene.add( cars[i] );
    cars[i].position.set(i*separation, 0, -1);
    cars[i].traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true
        }
    });


},undefined,function(error){console.error(error);});

loader.load( './assets/mustang.glb', function ( gltf ) {
    let i = 2;
    cars[i] = gltf.scene;
	scene.add( cars[i] );
    cars[i].position.set(i*separation, 0, -1);
    cars[i].traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true
        }
    });


},undefined,function(error){console.error(error);});


loader.load( './assets/hound.glb', function ( gltf ) {
    let i = 3;
    cars[i] = gltf.scene;
	scene.add( cars[i] );
    cars[i].position.set(i*separation, 0, -1);
    cars[i].traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true
        }
    });

},undefined,function(error){console.error(error);});

loader.load( './assets/superboat.glb', function ( gltf ) {
    let i = 4;
    cars[i] = gltf.scene;
	scene.add( cars[i] );
    cars[i].position.set(i*separation, 0, -1);
    cars[i].traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true
        }
    });

},undefined,function(error){console.error(error);});




let actualFOV = 0;
const carSelector = document.getElementById("carSelector");
const fovSlider = document.getElementById("fovSlider");
// Render Loop
function render() {

    for (let i = 0; i<cars.length; i++)
    {
        if (cars[i]){
            let r = (cars[i].position.x - camera.position.x) / separation;
            r = r==0?0.001:r;
            // cars[i].rotation.y = Math.PI * 1.2 + (Math.abs(r)/r) * Math.sqrt(Math.abs(r));
            cars[i].rotation.y = Math.PI * 1.2 + r;
        }
    }

    let p = carSelector.value;
    let rspeed = speed;//Math.abs(p * separation - camera.position.x)*speed;
    
    let newframe = false;
    if (Math.abs(p * separation - camera.position.x) > 0.01){
        camera.position.x = camera.position.x * (1-rspeed) + p * separation * rspeed;
        core.position.x = core.position.x * (1-speed*.8) + p * separation * speed*.8;
        //core should be in a separate if statement logically but the difference is negligible
        newframe = true;
    }
    

    camera.fov = camera.fov * (1-speed) + fovSlider.value*speed;
    if (Math.abs(camera.fov - actualFOV) > 0.01){
        camera.updateProjectionMatrix();
        actualFOV = camera.fov;
        newframe = true;
    }

    
    requestAnimationFrame( render );
    // Render the scene
    if (newframe){
        renderer.render(scene, camera);
    }
};


render();




addEventListener("resize", (e) => {
    camera.aspect = window.innerWidth/(window.innerHeight*0.5);
    renderer.setSize( window.innerWidth, window.innerHeight * 0.5 );
    camera.updateProjectionMatrix();
    console.log("rezised");
});

$("canvas").appendTo("#stuff");