import './style.css'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import * as THREE from 'three'
import ThreeMeshUI from 'three-mesh-ui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import firefliesVertexShader from './shaders/fireflies/vertex.glsl'
import firefliesFragmentShader from './shaders/fireflies/fragment.glsl'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import waterVertexShader from './shaders/water/vertex.glsl'
import waterFragmentShader from './shaders/water/fragment.glsl'
import FontJson from './assets/Roboto-msdf.json'
import FontImage from './assets/Roboto-msdf.png'
import ImageLozere from './img/lozere.jpg'
import { gsap } from 'gsap'

import language from './language.js'
import modale from './modale.js'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import Darkmode from 'darkmode-js';
// import FontJSON from '/src/assets/Roboto-msdf.json';
// import FontImage from '/src/assets/Roboto-msdf.png';
// const ThreeMeshUI = require('three-mesh-ui');

/**
 * Loaders
*/
const loadingBarElement = document.querySelector('.loading-bar')
let sceneReady = false
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>{
        window.setTimeout(() =>{
            
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 4, value: 0, delay: 1 })

            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform = ''
        }, 500)

        window.setTimeout(() => {
            sceneReady = true
        }, 3000)
    },
    // Progress
    (itemUrl, itemLoaded, itemTotal) => {
        const progressRatio = itemLoaded / itemTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }
    
)

// Heures
var now = new Date();
const hour = now.getHours();

// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager)
gltfLoader.setDRACOLoader(dracoLoader)

// Clock 
var clockMedia = new THREE.Clock();


var animOffset       = 0,   // starting frame of animation
	walking         = false, 
	duration        = 1000, // milliseconds to complete animation
	keyframes       = 20,   // total number of animation frames
	interpolation   = duration / keyframes, // milliseconds per frame
	lastKeyframe    = 0,    // previous keyframe
	currentKeyframe = 0;

/**
 * Base
 */
// Debug GUI
const debugObject = {}
// const gui = new GUI({
//     width: 400
// })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
* Textures 
*/
const bakedTexture = textureLoader.load('baked.jpg')
bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding

/**
* Materials
*/
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

// Portal light material 
debugObject.portalColorStart = '#77f055'
debugObject.portalColorEnd = '#1ec375'

// Cloud
// Main cloud 
const clouds = new THREE.Group()
scene.add(clouds)
const materialCloud = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const geometryCloud = new THREE.TorusGeometry(0.3, 0.4, 20, 45)


// Others small clouds
for(let i = 0; i < 14; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 8 + Math.random() * 50
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const cloudTorus = new THREE.Mesh(geometryCloud, materialCloud)
    cloudTorus.position.set(x, 4, z)
    cloudTorus.rotation.y = (Math.random() - 1) * 0.7
    cloudTorus.rotation.z = (Math.random() - 1) * 0.7
    cloudTorus.rotation.x = 250

    cloudTorus.castShadow = true
    clouds.add(cloudTorus)
}


// Bibliotheque geometry objects
const geometryCube = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const materialCube = new THREE.MeshBasicMaterial( {color: '#FFFF00', opacity: 0.5 });
const cube = new THREE.Mesh( geometryCube, materialCube );

cube.position.y = 0.6
cube.position.x = -5.9
cube.position.z = 2.2

scene.add( cube );

// Cone 
const geometryCone = new THREE.ConeGeometry( 0.2, 0.2, 4);
const materialCone = new THREE.MeshBasicMaterial( {color: 0xff00ff} );
const cone = new THREE.Mesh( geometryCone, materialCone );

cone.position.y = 1.1
cone.position.x = -5.5
cone.position.z = 2.8

scene.add( cone );

// Torus
const geometryTorus = new THREE.TorusGeometry( 0.1, 0.0148, 30, 6 );
const materialTorus = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const torus = new THREE.Mesh( geometryTorus, materialTorus );

torus.position.y = 0.15
torus.position.x = -5.5
torus.position.z = 2.8

scene.add( torus );

// gui
//     .addColor(debugObject, 'portalColorStart')
//     .onChange(() => {
//         portalLightMaterial.uniforms.uColorStart.value.set(debugObject.portalColorStart)
//     })

// gui
//     .addColor(debugObject, 'portalColorEnd')
//     .onChange(() => {
//         portalLightMaterial.uniforms.uColorEnd.value.set(debugObject.portalColorEnd)
//     })

// Portal light material
const portalLightMaterial = new THREE.ShaderMaterial({ 
    uniforms: {
        uTime: { value: 0 }, 
        uColorStart: { value: new THREE.Color(debugObject.portalColorStart)},
        uColorEnd: { value: new THREE.Color(debugObject.portalColorEnd)}, 
    },
    vertexShader: portalVertexShader,
    fragmentShader: portalFragmentShader, 
    side: THREE.DoubleSide
})

function updateCamera() {
  camera.updateProjectionMatrix();
}




/**
* Model
*/
gltfLoader.load(
    'cv.glb', 
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = bakedMaterial
        })

        // Get each objets 
        const portalLightMesh = gltf.scene.children.find(child => child.name == 'portalLight')

        // Apply materials
        portalLightMesh.material = portalLightMaterial

        scene.add(gltf.scene)
    }
)

/**
 * Fox
*/
let mixer = null

gltfLoader.load(
    '/models/Fox/glTF/Fox.gltf', 
    (gltf) => {
        // To charge others animations
        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[1])
        const stay = mixer.clipAction(gltf.animations[0])
        stay.play()

        gltf.scene.scale.set(0.007, 0.007, 0.007) // for the Fox
        gltf.scene.position.z = -2.8
        gltf.scene.position.x = -3.8
        gltf.scene.position.y = -0.15

        var direction = new THREE.Vector3();
        
        document.onkeydown = function(e) {
            switch (e.keyCode) {
            
            // Left arrow
            case 37:
                action.play()
                camera.position.x += 0.02
                gltf.scene.rotation.y += 0.06;
                break;

            // Top arrow
            case 38:
                action.play()
                gltf.scene.getWorldDirection(direction);

                gltf.scene.position.addScaledVector(direction, 0.02);

                camera.position.x = gltf.scene.position.x - 2;
                camera.position.y = gltf.scene.position.y - 2;
                camera.position.z = gltf.scene.position.z - 1;
                break;

            // Right arrow
            case 39:
                action.play()
                camera.position.x += 0.02;
                gltf.scene.rotation.y -= 0.06;
                break;

            // Bottom arrow
            case 40:
                action.play()
                gltf.scene.getWorldDirection(direction);
                gltf.scene.position.addScaledVector(direction, -0.02);
                break;
            }
            stay.play();
        };

        document.onkeyup = function(e) {
            switch (e.keyCode) {
            
            // Left Arrow
            case 37:
                action.stop()
                break;

            //Top arrow
            case 38:
                action.stop()
                break;

            // Right arrow
            case 39:
                action.stop()
                break;

            // Bottom arrow
            case 40:
                action.stop()
                break;
            }
            stay.play();
        };
        
        scene.add(gltf.scene)

        
    }
)

/**
 * Test ajout personnage ( Elvis )
 */
// let mixerElvis = null

// gltfLoader.load(
//     '/models/Jack/elvis.gltf', 
//     (gltf) => {
//         // pour charger une animation
//         mixerElvis = new THREE.AnimationMixer(gltf.scene)
//         const action = mixerElvis.clipAction(gltf.animations[0])
//         action.play()

//         gltf.scene.scale.set(0.4, 0.4, 0.4) // for the Fox
//         gltf.scene.position.z = 0.6
//         gltf.scene.position.x = 1.7
//         scene.add(gltf.scene)
//     }
//     () => {
//         console.log('progress')
//     },
//     () => {
//         console.log('error')
//     },
// )

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff,2)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(2048, 2048)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)


/**
 * Points of interest
 */
const raycaster = new THREE.Raycaster()
const points = [{
        // 'Experience' button
        position: new THREE.Vector3(0.30, 1.5, 4.7),
        element: document.querySelector('.point-0')
    }, {
        // 'Contact' button
        position: new THREE.Vector3(0.5, 1.7, -4.0),
        element: document.querySelector('.point-1')
    }, {
        // 'Hobbies' button
        position: new THREE.Vector3(3.7, 1.7, 0.5), 
        element: document.querySelector('.point-2')
    }, {
        // 'Formation' button
        position: new THREE.Vector3(-4.2, 1.5, 1.4),
        element: document.querySelector('.point-3')
    }, 
]

/**
* Water
*/
// Geometry
const waterGeometry = new THREE.PlaneGeometry(100, 100, 512, 512)

// Color
let description = document.getElementById("apropos");
debugObject.depthColor = '#11aced'
debugObject.surfaceColor = '#00FFFF'

if((hour >= 0 && hour <= 6) || (hour >= 22 && hour <=24)){
    debugObject.depthColor = '#2626a6'  
    debugObject.surfaceColor = '#0077ff'
    description.style.color = "#ffffff"
} else {
    debugObject.depthColor = '#11aced'
    debugObject.surfaceColor = '#0077ff'
}

// Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    //uniformsNeedUpdate: true,
    uniforms: {
        uTime: { value: 0 },

        uBigWavesElevation: { value: 0.1 }, 
        uBigWavesFrequency: { value: new THREE.Vector2(0.38, 0.21) }, 
        uBigWavesSpeed: { value: 0.67 }, 

        uSmallWavesElevation: { value: 0.06 },
        uSmallWavesFrequency: { value: 2 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallWavesIterations: { value: 2 },

        uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
        uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) }, 
        uColorOffset: { value: 0.06 }, 
        uColorMultiplier: { value: 3.68},       
    }
})

// GUI water 
// gui.add(waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.01).name('uBigWavesElevation')
// gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.01).name('uBigWavesFrequencyX')
// gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.01).name('uBigWavesFrequencyY')
// gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.01).name('uBigWavesSpeed')
// gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
// gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
// gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
// gui.add(waterMaterial.uniforms.uSmallWavesIterations, 'value').min(0).max(5).step(1).name('uSmallWavesIterations')

// Mesh water 
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
water.position.y = -0.7
scene.add(water)

/**
 * Fireflies
*/
// Geometry
const firefliesGeometry = new THREE.BufferGeometry()
const firefliesCount = 30
const positionArray = new Float32Array(firefliesCount * 3 ) // *3 because XYZ
const scaleArray = new Float32Array(firefliesCount)

for(let i = 0; i < firefliesCount; i++){
    positionArray[ i * 3 + 0 ] = (Math.random() -0.5 ) * 7
    positionArray[ i * 3 + 1 ] = Math.random() * 1.5
    positionArray[ i * 3 + 2 ] = (Math.random() - 0.5 ) * 7

    scaleArray[i] = Math.random()
}

// 3 because of XYZ
firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

// Material 
const firefliesMaterial = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2)}, 
        uSize: { value: 100}
    },
    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader, 
    transparent: true, 
    blending: THREE.AdditiveBlending, 
    depthWrite: false
})

// GUI Fireflies 
// gui.add(firefliesMaterial.uniforms.uSize, 'value').min(0).max(500).step(1).name('fireflies Size')

// Points 
const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial)
scene.add(fireflies)

/**
* Overlay
*/
const overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
        uAlpha: { value: 1 }
    },
    vertexShader: `
    void main() {
        gl_Position = vec4(position, 1.0);
    }
    `, 
    fragmentShader: `
    uniform float uAlpha;

    void main() {
        gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
    }
    `
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
//overlay.receiveShadow = true;
scene.add(overlay)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Update fireflies
    firefliesMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
})

/**
* Camera
*/
// Base camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 24
camera.position.y = 24
camera.position.z = 24
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.screenSpacePanning = false
controls.minDistance = 3
controls.maxDistance = 11

controls.maxPolarAngle = (Math.PI / 2) - 0.3;

/**
* Renderer
*/
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.set( 12, 4, -5);
controls.update();

// Fog color at 'Night' / 'Day'
if((hour >= 0 && hour <= 6) || (hour >= 22 && hour <=24)){
    scene.fog = new THREE.FogExp2( '#191970' , 0.04 ); 
} else {
    scene.fog = new THREE.FogExp2( '#38c3fc', 0.04 );
}

// Sky color at 'Night' / 'Day' and bgc 
debugObject.clearColor = '#38c3fc'

if((hour >= 0 && hour <= 6) || (hour >= 22 && hour <=24)){
    debugObject.clearColor = '#191970'  
    document.body.style.background = '#191970'; 
} else {
    debugObject.clearColor = '#38c3fc'
    document.body.style.background = '#38c3fc'; 
}

renderer.setClearColor(debugObject.clearColor)
// gui
//     .addColor(debugObject, 'clearColor')
//     .onChange(() => {
//         renderer.setClearColor(debugObject.clearColor)
//     })

// Portal circle ( onClick to change all scene color )
const geometry = new THREE.CircleGeometry( 1.1, 32 );
const material = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, transparent: true } );
const circle = new THREE.Mesh( geometry, material );
const circle2 = new THREE.Mesh( geometry, material );
circle.name = "cercle";
circle.position.x = 1.0;
circle.position.y = 1.2;
circle.position.z = -5.7;
circle.rotation.y = -0.15;
scene.add( circle ); 

circle2.position.x = 1;
circle2.position.y = 1.2;
circle2.position.z = -5.7;
circle2.rotation.y = 2.9;
scene.add(circle2);
material.opacity = 0;

window.addEventListener('click', onDocumentMouseDown, false);

var mouse = new THREE.Vector2();
function onDocumentMouseDown( event ) {
event.preventDefault();
mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
raycaster.setFromCamera( mouse, camera );
// console.log(scene.children);
var intersects = raycaster.intersectObjects( scene.children );
if ( intersects.length > 0 ) {
    intersects[1].object.callback();
}}

circle.callback = function() { changeByPortal();}
circle2.callback = function() { changeByPortal();}


function changeByPortal(){
    var selectedObject = scene.getObjectByName("cercle"); 
    const darkmode =  new Darkmode();
    darkmode.toggle();
    console.log(selectedObject)
}


// 'Sun' / 'Moon' with SpriteMaterial 
var geometrySun = new THREE.SphereGeometry( 1, 32, 16 );
var materialSun = new THREE.MeshBasicMaterial( { color : '#efd807' } );
var meshSun = new THREE.Mesh( geometrySun, materialSun );

meshSun.setColor = function(color){
    materialSun.color.set( color );
}

if((hour >= 0 && hour <= 6) || (hour >= 22 && hour <=24)){
    meshSun.setColor(0xFFFFFF)
} else {
    meshSun.setColor('#efd807')
}

scene.add(meshSun);

meshSun.position.set(-9, 4.55, 1.5);
meshSun.radius = 3

// imageSun.crossOrigin = "Anonymous";

const sunTexture = new THREE.TextureLoader().load('https://paulmarechal.xyz/CV/glow.png');
var spriteMaterial = new THREE.SpriteMaterial({
	map: sunTexture,
	useScreenCoordinates: false, 
	color: 0xFFCC00, 
    transparent: false, 
    blending: THREE.AdditiveBlending,
});
var sprite = new THREE.Sprite( spriteMaterial );
sprite.scale.set(2.5, 2.5, 1.0);
meshSun.add(sprite); 

// Black screen picture
var loaderTab = new THREE.TextureLoader();

var materialTab = new THREE.MeshLambertMaterial({
  map: loaderTab.load('https://ak.picdn.net/shutterstock/videos/30298276/thumb/12.jpg')
});

// Plane geometry for the image and preserve the image aspect ratio 
var geometryTab = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// Combine image geometry and material 
var meshTab = new THREE.Mesh(geometryTab, materialTab);

// Position of the image ( x, y, z & rotation)
meshTab.position.set(0,0,0)
meshTab.rotation.y = 3.165

meshTab.position.x = 0.2
meshTab.position.z = 6.399
meshTab.position.y = 0.9

scene.add(meshTab);

/** 
* test VR 
*/
document.body.appendChild( VRButton.createButton( renderer ) );
renderer.xr.enabled = true;
document.body.appendChild( VRButton.createButton(renderer) );
renderer.setAnimationLoop(function () {
    renderer.render( scene, camera );
});

// const room = new THREE.LineSegments(
// 	new BoxLineGeometry( 10, 10, 10, 14, 14, 14 ).translate( 0, 3, 0 ),
// 	//new THREE.LineBasicMaterial( { color: 0x808080 } )
// );

// scene.add( room );

// test Text VR
const container = new ThreeMeshUI.Block({
	height: 2,
	width: 1, 
    backgroundOpacity: 0,
});

container.position.set( 0, 0.85, -1.9 );
// container.rotation.x = -0.55;
scene.add( container );

// const imageBlock = new ThreeMeshUI.Block({
// 	height: 1,
// 	width: 1,
// 	//offset: 0.1 // distance separating the inner block from its parent
// });

const textBlock = new ThreeMeshUI.Block({
	height: 0.75,
	width: 1.1,
	margin: 0.01, 
});

container.add(textBlock );

// textureLoader.load( ImageLozere, (texture)=> {
// 	imageBlock.set({ backgroundTexture: texture });
// });

container.set({
	fontFamily: FontJson,
	fontTexture: FontImage,
});

// 'En quelques mots' - text -  VR board
const text = new ThreeMeshUI.Text({
    content:
      "Apres presque dix ans dans la restauration et avoir murement prepare ma reconversion, j ai donc decide de me tourner vers un metier qui me passionne depuis longtemps a savoir les nouvelles technologies et plus particulierement le developpement web. Ce metier est pour moi magnifique car les seules limites d un bon developpeur sont son imagination et sa creativite.\n\n Je ne souhaite plus etre spectateur mais acteur dans ce monde en perpetuel changement et renouvellement.\n\n Paul Marechal ",
});

textBlock.add(text);

text.set({
    fontColor: new THREE.Color(0xefffe8),
    fontSize: 0.04,
    alignContent: "justify",
});

textBlock.set({
    //alignContent: "right",
    // justifyContent: "end",
    padding: 0.03,
  });

// 'En quelques mots' - title -  VR board
textBlock.add(
	new ThreeMeshUI.Text({
		content: ' En quelques mots \n',
		fontSize: 0.07,
		fontColor: new THREE.Color( 0xefffe8 )
	})
);

textBlock.set({
    alignContent: "center",
    //justifyContent: "center",
    padding: 0.03,
  });
textBlock.add( text );

camera.updateProjectionMatrix();

/**
 * video ecran ordinateur 
 */
//video element:
const video = document.getElementById('video');

//video texture:
const videoTexture = new THREE.VideoTexture(video);
const videoMaterial =  new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.FrontSide, toneMapped: false} );
//Create screen
const screen = new THREE.PlaneGeometry(0.71, 0.385);
const videoScreen = new THREE.Mesh(screen, videoMaterial);
video.play()


videoScreen.position.x = -5.08
videoScreen.position.y = 0.82
videoScreen.position.z = 0.77

videoScreen.rotation.y = 0.6


scene.add(videoScreen);



// floor
// const floorGeometry = new THREE.PlaneGeometry( 4, 4 );
// const floorMaterial = new THREE.MeshStandardMaterial( { color: 0x222222 } );
// const floor = new THREE.Mesh( floorGeometry, floorMaterial );
// floor.rotation.x = - Math.PI / 2;
// floor.receiveShadow = true;
// scene.add( floor );

// VR hand controller 
let hand1, hand2;
let controllerHand1, controllerHand2;
let controllerGrip1, controllerGrip2;


controllerHand1 = renderer.xr.getController( 0 );
scene.add( controllerHand1 );

controllerHand2 = renderer.xr.getController( 1 );
scene.add( controllerHand2 );

const controllerModelFactory = new XRControllerModelFactory();
const handModelFactory = new XRHandModelFactory();

//Hand 1
controllerGrip1 = renderer.xr.getControllerGrip( 0 );
controllerGrip1.add( controllerModelFactory.createControllerModel( controllerGrip1 ) );
scene.add( controllerGrip1 );

hand1 = renderer.xr.getHand( 0 );
hand1.add( handModelFactory.createHandModel( hand1 ) );

scene.add( hand1 );

//Hand 2
controllerGrip2 = renderer.xr.getControllerGrip( 1 );
controllerGrip2.add( controllerModelFactory.createControllerModel( controllerGrip2 ) );
scene.add( controllerGrip2 );

hand2 = renderer.xr.getHand( 1 );
hand2.add( handModelFactory.createHandModel( hand2 ) );
scene.add( hand2 );

const geometryLine = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] );

const line = new THREE.Line( geometryLine );
line.name = 'line';
line.scale.z = 5;

controllerHand1.add( line.clone() );
controllerHand2.add( line.clone() );

var backgroundButton = document.querySelector('#change-background');
const classess = backgroundButton.classList;

// When click on 'Day' / 'Night' button 
backgroundButton.addEventListener('click', function(){
    const result = classess.toggle("Night");

    if (result) {
        backgroundButton.textContent = `🌕`;
        // Sky
        scene.background = new THREE.Color( '#191970' );
        // Fog
        scene.fog = new THREE.FogExp2( '#191970' , 0.04 ); 
        // Sun
        materialSun.color.set('#ffffff')
        // Texte 
        let description = document.getElementById("apropos");
        description.style.color = "#ffffff"
        // Water
        waterMaterial.uniforms.uDepthColor.value = new THREE.Color(0x2626a6)
        waterMaterial.uniforms.uSurfaceColor.value = new THREE.Color(0x0077ff)

    } else {
        backgroundButton.textContent = `🌙`;
        // Sky
        scene.background = new THREE.Color( '#38c3fc' );
        // Fog
        scene.fog = new THREE.FogExp2( '#38c3fc', 0.04 );
        // Sun
        materialSun.color.set('#efd807')
        // Texte 
        let description = document.getElementById("apropos");
        description.style.color = "#000000"
        // Water
        waterMaterial.uniforms.uDepthColor.value = new THREE.Color(0x11aced)
        waterMaterial.uniforms.uSurfaceColor.value = new THREE.Color(0x0077ff)
    }
});

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
    // Update mixer
    if(mixer !== null){
        mixer.update(deltaTime)
    }

    // if(mixerElvis !== null){
    //     mixerElvis.update(deltaTime)
    // }
    // fin test 

    // update materials 
    firefliesMaterial.uniforms.uTime.value = elapsedTime
    portalLightMaterial.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Update water
    waterMaterial.uniforms.uTime.value = elapsedTime

    if(sceneReady){
        // Go through each point
        for(const point of points) {
            const screenPosition = point.position.clone()
            screenPosition.project(camera)

            const translateX = screenPosition.x * sizes.width * 0.5
            const translateY = - screenPosition.y * sizes.height * 0.5
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
    }
    
    
    /** 
    * Rotate library items
    */
    cube.rotation.x = 0.4 * elapsedTime
    cube.rotation.y = 0.4 * elapsedTime

    cone.rotation.y = 0.4 * elapsedTime
    cone.rotation.x = 0.4 * elapsedTime
    
    torus.rotation.y = 0.4 * elapsedTime
    torus.rotation.z = 0.4 * elapsedTime

    /**
    * Render
    */
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    

    // // Scene VR
    // renderer.xr.enabled = true;

    // renderer.setAnimationLoop( function () {

    //     renderer.render( scene, camera );
    // } );
    // // fonctionne aussi : 
    // //renderer.setAnimationLoop(tick)

    // Scene VR
    ThreeMeshUI.update();
    
        renderer.xr.enabled = true;
        // Test with Oculus 2 headset
        renderer.xr.setFramebufferScaleFactor( 2.0 );
        //  torus.rotation.z += 0.01
        //  cone.rotation.y += 0.01
        //  cube.rotation.x += 0.01

        renderer.setAnimationLoop( function () {
            renderer.render( scene, camera);
        } );
        ThreeMeshUI.update();
        // fonctionne aussi : 
        //renderer.setAnimationLoop(tick)
    
    ThreeMeshUI.update();
}

tick()

