import './style.css'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import * as THREE from 'three'
// import ThreeMeshUI from 'three-mesh-ui'
import ThreeMeshUI from '../src/three-mesh-ui.js';
import VRControl from './utils/VRControl.js';
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
import Darkmode from 'darkmode-js'
import language from './language.js'
import modale from './modale.js'
import ButtonVR from 'buttonvr'
import SnakeImage from "./assets/spiny_bush_viper.jpg"
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import StatsVR from "statsvr"
import expBlockText from './expBlockText.js'

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
const gui = new GUI({
    width: 400
})

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
controls.minDistance = 2
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

// test VR button
renderer.xr.enabled = true;
document.body.appendChild( VRButton.createButton( renderer ) );
document.body.appendChild( renderer.domElement );
// fin test vr buttonn




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

// container.position.set( 1.8, 0.85, -1.3 );
container.position.set( -1.1, 0.85, -4);
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




// fin test VR

// test ButtonVR 

















let vrControl;
let meshContainer, meshes, currentMesh;
const objsToTest = [];

//const raycaster = new THREE.Raycaster();

// const mouse = new THREE.Vector2();
// mouse.x = mouse.y = null;

let selectState = false;

window.addEventListener( 'pointermove', ( event ) => {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
} );

window.addEventListener( 'pointerdown', () => {
	selectState = true;
} );

window.addEventListener( 'pointerup', () => {
	selectState = false;
} );

window.addEventListener( 'touchstart', ( event ) => {
	selectState = true;
	mouse.x = ( event.touches[ 0 ].clientX / window.innerWidth ) * 2 - 1;
	mouse.y = -( event.touches[ 0 ].clientY / window.innerHeight ) * 2 + 1;
} );

window.addEventListener( 'touchend', () => {
	selectState = false;
	mouse.x = null;
	mouse.y = null;
} );




function showMesh( id ) {

	meshes.forEach( ( mesh, i ) => {

		mesh.visible = i === id ? true : false;

	} );

}


///////////////////
// UI contruction
///////////////////

function makePanel() {

	// Container block, in which we put the two buttons.
	// We don't define width and height, it will be set automatically from the children's dimensions
	// Note that we set contentDirection: "row-reverse", in order to orient the buttons horizontally
	const containerButton = new ThreeMeshUI.Block( {
		justifyContent: 'center',
		alignContent: 'center',
		contentDirection: 'row-reverse',
        fontFamily: FontJson,
		fontTexture: FontImage,
		fontSize: 0.07,
		padding: 0.02,
		borderRadius: 0.11
	} );

    // containerButton.set({
    //     fontFamily: FontJson,
	//     fontTexture: FontImage,
    // })

	containerButton.position.set( 0, 0.6, 3.5 );
    gui.add(containerButton.position, 'x').min(-3).max(3).step(0.01).name('Button VR position X')
    gui.add(containerButton.position, 'y').min(-3).max(3).step(0.01).name('Button VR position Y')
    gui.add(containerButton.position, 'z').min(-3).max(3).step(0.01).name('Button VR position Z')
    
	containerButton.rotation.x = -2.7;
	containerButton.rotation.z = 3.12;
    gui.add(containerButton.rotation, 'x').min(-3).max(3).step(0.01).name('Text button VR rotation X')
    gui.add(containerButton.rotation, 'y').min(-3).max(3).step(0.01).name('Text button VR rotation Y')
    gui.add(containerButton.rotation, 'z').min(-4).max(4).step(0.01).name('Text button VR rotation Z')
	scene.add( containerButton );

	// BUTTONS

	// We start by creating objects containing options that we will use with the two buttons,
	// in order to write less code.

	const buttonOptions = {
		width: 0.4,
		height: 0.15,
		justifyContent: 'center',
		alignContent: 'center',
		offset: 0.05,
		margin: 0.02,
		borderRadius: 0.075,
	};

	// Options for component.setupState().
	// It must contain a 'state' parameter, which you will refer to with component.setState( 'name-of-the-state' ).

    // Pbs with display of the front button - it works but dont appear 

	const hoveredStateAttributes = {
		state: 'hovered',
		attributes: {
			offset: 0.035,
			backgroundColor: new THREE.Color( 0x999999 ),
			backgroundOpacity: 1,
			fontColor: new THREE.Color( 0xffffff )
		},
	};

	const idleStateAttributes = {
		state: 'idle',
		attributes: {
			offset: 0.035,
			backgroundColor: new THREE.Color( 0x666666 ),
			backgroundOpacity: 0.3,
			fontColor: new THREE.Color( 0xffffff )
		},
	};

	// Buttons creation, with the options objects passed in parameters.

	const buttonNext = new ThreeMeshUI.Block( buttonOptions );
	const buttonPrevious = new ThreeMeshUI.Block( buttonOptions );

	// Add text to buttons
    buttonNext.add(
	new ThreeMeshUI.Text({ content: 'next' })
    );

	buttonPrevious.add(
		new ThreeMeshUI.Text( { content: 'previous'} )
	);

	// Create states for the buttons.
	// In the loop, we will call component.setState( 'state-name' ) when mouse hover or click

	const selectedAttributes = {
		offset: 0.02,
		backgroundColor: new THREE.Color( 0x777777 ),
		fontColor: new THREE.Color( 0x222222 )
	};

	buttonNext.setupState( {
		state: 'selected',
		attributes: selectedAttributes,
		onSet: () => {

			currentMesh = ( currentMesh + 1 ) % 3;
			showMesh( currentMesh );

		}
	} );
	buttonNext.setupState( hoveredStateAttributes );
	buttonNext.setupState( idleStateAttributes );

	//

	buttonPrevious.setupState( {
		state: 'selected',
		attributes: selectedAttributes,
		onSet: () => {

			currentMesh -= 1;
			if ( currentMesh < 0 ) currentMesh = 2;
			showMesh( currentMesh );

		}
	} );
	buttonPrevious.setupState( hoveredStateAttributes );
	buttonPrevious.setupState( idleStateAttributes );

	//

	containerButton.add( buttonNext, buttonPrevious );
	objsToTest.push( buttonNext, buttonPrevious );


}

// Handle resizing the viewport

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function loop() {

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();

	meshContainer.rotation.z += 0.01;
	meshContainer.rotation.y += 0.01;

	renderer.render( scene, camera );

	updateButtons();

}

// Called in the loop, get intersection with either the mouse or the VR controllers,
// then update the buttons states according to result

function updateButtons() {

	// Find closest intersecting object

	let intersect;

	if ( renderer.xr.isPresenting ) {

		vrControl.setFromController( 0, raycaster.ray );

		intersect = raycast();

		// Position the little white dot at the end of the controller pointing ray
		if ( intersect ) vrControl.setPointerAt( 0, intersect.point );

	} else if ( mouse.x !== null && mouse.y !== null ) {

		raycaster.setFromCamera( mouse, camera );

		intersect = raycast();

	}

	// Update targeted button state (if any)

	if ( intersect && intersect.object.isUI ) {

		if ( selectState ) {

			// Component.setState internally call component.set with the options you defined in component.setupState
			intersect.object.setState( 'selected' );

		} else {

			// Component.setState internally call component.set with the options you defined in component.setupState
			intersect.object.setState( 'hovered' );

		}

	}

	// Update non-targeted buttons state

	objsToTest.forEach( ( obj ) => {

		if ( ( !intersect || obj !== intersect.object ) && obj.isUI ) {

			// Component.setState internally call component.set with the options you defined in component.setupState
			obj.setState( 'idle' );

		}

	} );

}

//

function raycast() {

	return objsToTest.reduce( ( closestIntersection, obj ) => {

		const intersection = raycaster.intersectObject( obj, true );

		if ( !intersection[ 0 ] ) return closestIntersection;

		if ( !closestIntersection || intersection[ 0 ].distance < closestIntersection.distance ) {

			intersection[ 0 ].object = obj;

			return intersection[ 0 ];

		}

		return closestIntersection;

	}, null );

}


// document.body.appendChild( VRButton.createButton( renderer ) );
// document.body.appendChild( renderer.domElement );



const roomMesh = new THREE.Mesh(
		new THREE.BoxGeometry( 12, 12, 12, 16, 16, 16 ).translate( 0, 3, 0 ),
		new THREE.MeshBasicMaterial( { side: THREE.BackSide } )
	);

// roomMesh.position(0.30, 0.5, 4.7),

objsToTest.push( roomMesh );

////////////////
// Controllers
////////////////
vrControl = VRControl( renderer, camera, scene );

scene.add( vrControl.controllerGrips[ 0 ], vrControl.controllers[ 0 ] );

vrControl.controllers[ 0 ].addEventListener( 'selectstart', () => {
	selectState = true;
} );
vrControl.controllers[ 0 ].addEventListener( 'selectend', () => {
	selectState = false;
} );

////////////////////
// Primitive Meshes
////////////////////
meshContainer = new THREE.Group();
meshContainer.position.set( 0.30, 1, 4.7 ); 
scene.add( meshContainer );

    gui.add(meshContainer.position, 'x').min(-4).max(4).step(0.01).name('Mesh container position X')
    gui.add(meshContainer.position, 'y').min(-4).max(4).step(0.01).name('Mesh container position Y')
    gui.add(meshContainer.position, 'z').min(-4).max(4).step(0.01).name('Mesh container position Z')
//
const sphereVR1 = new THREE.Mesh(
	new THREE.IcosahedronBufferGeometry( 0.3, 1 ),
	new THREE.MeshStandardMaterial( { color: 0x3de364, flatShading: true } )
);

// const sphereVR1 = makeTextPanel();

const boxVR1 = new THREE.Mesh(
	new THREE.BoxBufferGeometry( 0.45, 0.45, 0.45 ),
	new THREE.MeshStandardMaterial( { color: 0x643de3, flatShading: true } )
);
const coneVR1 = new THREE.Mesh(
	new THREE.ConeBufferGeometry( 0.28, 0.5, 10 ),
	new THREE.MeshStandardMaterial( { color: 0xe33d4e, flatShading: true } )
);
//
// contentContainer.visible = boxVR1.visible = coneVR1.visible = false;
// meshContainer.add( contentContainer, boxVR1, coneVR1 );
// meshes = [ contentContainer, boxVR1, coneVR1 ];
// currentMesh = 0;

///////////
// Panel // 
///////////
makePanel();

//

renderer.setAnimationLoop( loop );








// test buttonVR 2 

const buttonVR = new ButtonVR(scene, camera)




buttonVR.update(renderer)

const containerVR = new ThreeMeshUI.Block({
	height: 2,
	width: 1, 
    backgroundOpacity: 0,
});

// container.position.set( -2, 0.5, -4);

const textBlockVR = new ThreeMeshUI.Block({
	height: 0.75,
	width: 1.1,
	margin: 0.01, 
});



buttonVR.addEventListener('pressed', (intersection) => {
    // console.log('pressed')
	scene.add( formationTextVR );
	scene.add( hobbiesTextVR );

    

})

buttonVR.addEventListener('pressedEnd', () => {
    // console.log('pressedEnd')
	scene.remove( formationTextVR );
	scene.remove( hobbiesTextVR );
})

// text VR Formation
const formationTextVR = new ThreeMeshUI.Block( {
	width: 1.2,
	height: 0.5,
	padding: 0.05,
	justifyContent: 'center',
	alignContent: 'left',
	fontFamily: FontJson,
	fontTexture: FontImage
} );

formationTextVR.position.set( -3.1, 0.95, 0.7);
formationTextVR.rotation.y = 2;

formationTextVR.add(
	new ThreeMeshUI.Text( {
		content: 'Formations \n',
		fontSize: 0.055
	} ),
	new ThreeMeshUI.Text( {
		content: '  Test hello world blablabla blablabla blablabla ',
		fontSize: 0.08
	} )
);
// fin text VR Formation

// text VR Hobbies
const hobbiesTextVR = new ThreeMeshUI.Block( {
	width: 1.2,
	height: 0.5,
	padding: 0.05,
	justifyContent: 'center',
	alignContent: 'left',
	fontFamily: FontJson,
	fontTexture: FontImage
} );

hobbiesTextVR.position.set( 3.45, 0.85, 1.05);
hobbiesTextVR.rotation.y = -2.02;



hobbiesTextVR.add(
	new ThreeMeshUI.Text( {
		content: 'Hobbies\n',
		fontSize: 0.08
	} ),
	new ThreeMeshUI.Text( {
		content: ' Test hello world blablabla blablabla blablabla ',
		fontSize: 0.055
	} )
);

// gui.add(hobbiesTextVR.position, 'x').min(-3).max(3).step(0.01).name('Text Hobbies position X')
// gui.add(hobbiesTextVR.rotation, 'y').min(-3).max(3).step(0.01).name('Text Hobbies rotation Y')


// fin text VR Hobbies

const boxVR = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1.5, 8, 8),
    new THREE.MeshBasicMaterial({
        transparent: true, 
        visible: false,
    })
)
boxVR.name = 'Formations'
// Formation
boxVR.position.set(-4.2, 0.5, 1.4)
scene.add(boxVR)
buttonVR.buttons.push(boxVR)

// Expérience
const sphereVR = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1.5, 8, 8),
    new THREE.MeshBasicMaterial({
        transparent: true, 
        visible: false,
    })
)

sphereVR.name = 'Expériences'

sphereVR.position.set(0.30, 0.5, 4.7)
scene.add(sphereVR)
buttonVR.buttons.push(sphereVR)

// Hobbies
const pyramidVR = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1.5, 8, 8),
    new THREE.MeshBasicMaterial({
        transparent: true, 
        visible: false,
    })
)

pyramidVR.textVR1 = 'Hobbies'


pyramidVR.position.set(3.7, 0.7, 0.5)
scene.add(pyramidVR)
buttonVR.buttons.push(pyramidVR)

// Stats VR
const statsVR = new StatsVR(scene, camera)
statsVR.setX(0)
statsVR.setY(0)
statsVR.setZ(0)
// Fin stats VR


// Exp block text VR 

// makeTextPanel();














function makeTextPanel() {
  const containerImg = new ThreeMeshUI.Block({
    ref: "container",
    padding: 0.025,
    fontFamily: FontJson,
    fontTexture: FontImage,
    fontColor: new THREE.Color(0xffffff),
    backgroundOpacity: 0,
  });

  containerImg.position.set(0, 1.14, 4.5);
//   containerImg.rotation.x = -0.55;
  containerImg.rotation.set(0.48, 3.15, 0);
  scene.add(containerImg);

  //

  const title = new ThreeMeshUI.Block({
    height: 0.2,
    width: 1.5,
    margin: 0.025,
    justifyContent: "center",
    fontSize: 0.09,
  });

  title.add(
    new ThreeMeshUI.Text({
      content: "spiny bush viper",
    })
  );

  containerImg.add(title);

  //

  const leftSubBlock = new ThreeMeshUI.Block({
    height: 0.95,
    width: 1.0,
    margin: 0.025,
    padding: 0.025,
    alignContent: "left",
    justifyContent: "end",
  });

  const caption = new ThreeMeshUI.Block({
    height: 0.07,
    width: 0.37,
    alignContent: "center",
    justifyContent: "center",
  });

  caption.add(
    new ThreeMeshUI.Text({
      content: "Mind your fingers",
      fontSize: 0.04,
    })
  );

  leftSubBlock.add(caption);

  //

  const rightSubBlock = new ThreeMeshUI.Block({
    margin: 0.025,
  });

  const subSubBlock1 = new ThreeMeshUI.Block({
    height: 0.35,
    width: 0.5,
    margin: 0.025,
    padding: 0.02,
    fontSize: 0.04,
    justifyContent: "center",
    backgroundOpacity: 0,
  }).add(
    new ThreeMeshUI.Text({
      content: "Known for its extremely keeled dorsal scales that give it a ",
    }),

    new ThreeMeshUI.Text({
      content: "bristly",
      fontColor: new THREE.Color(0x92e66c),
    }),

    new ThreeMeshUI.Text({
      content: " appearance.",
    })
  );

  const subSubBlock2 = new ThreeMeshUI.Block({
    height: 0.53,
    width: 0.5,
    margin: 0.01,
    padding: 0.02,
    fontSize: 0.025,
    alignContent: "left",
    backgroundOpacity: 0,
  }).add(
    new ThreeMeshUI.Text({
      content:
        "The males of this species grow to maximum total length of 73 cm (29 in): body 58 cm (23 in), tail 15 cm (5.9 in). Females grow to a maximum total length of 58 cm (23 in). The males are surprisingly long and slender compared to the females.\nThe head has a short snout, more so in males than in females.\nThe eyes are large and surrounded by 9–16 circumorbital scales. The orbits (eyes) are separated by 7–9 scales.",
    })
  );

  rightSubBlock.add(subSubBlock1, subSubBlock2);

  //

  const contentContainer = new ThreeMeshUI.Block({
    contentDirection: "row",
    padding: 0.02,
    margin: 0.025,
    backgroundOpacity: 0,
  });

  contentContainer.add(leftSubBlock, rightSubBlock);
//   containerImg.position.set(0, 0.6, 3.5)
  gui.add(containerImg.position, 'x').min(-4).max(4).step(0.01).name('Container avec image position X')
  gui.add(containerImg.position, 'y').min(-4).max(4).step(0.01).name('Container avec image position Y')
  gui.add(containerImg.position, 'z').min(-4).max(4).step(0.01).name('Container avec image position Z')

  gui.add(containerImg.rotation, 'x').min(-4).max(4).step(0.01).name('Container avec image rotation X')
  gui.add(containerImg.rotation, 'y').min(-4).max(4).step(0.01).name('Container avec image rotation Y')
  gui.add(containerImg.rotation, 'z').min(-4).max(4).step(0.01).name('Container avec image rotation Z')


  containerImg.add(contentContainer);

//   containerImg.push( roomMesh )

  //

  new THREE.TextureLoader().load(SnakeImage, (texture) => {
    leftSubBlock.set({
      backgroundTexture: texture,
    });
  });
}


makeTextPanel();

sphereVR1.visible = boxVR1.visible = coneVR1.visible = false;
meshContainer.add( sphereVR1, boxVR1, coneVR1 );
meshes = [ sphereVR1, boxVR1, coneVR1 ];
currentMesh = 0;











































// fin exp block text VR 























// fin test buttonVR

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
    //cube.rotation.x = 0.4 * elapsedTime
    //cube.rotation.y = 0.4 * elapsedTime

    //cone.rotation.y = 0.4 * elapsedTime
    //cone.rotation.x = 0.4 * elapsedTime
    
    //torus.rotation.y = 0.4 * elapsedTime
    //torus.rotation.z = 0.4 * elapsedTime

    /**
    * Render
    */
    //renderer.render(scene, camera)

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
    //ThreeMeshUI.update();
    
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

    /**
    * Render
    */
    // button VR test
    statsVR.update()
    buttonVR.update(renderer)
    // fin test button VR
    renderer.render(scene, camera)

    // For VR 
    renderer.setAnimationLoop( function () {
        cube.rotation.x = 0.4 * elapsedTime
        cube.rotation.y = 0.4 * elapsedTime

        cone.rotation.y = 0.4 * elapsedTime
        cone.rotation.x = 0.4 * elapsedTime
    
        torus.rotation.y = 0.4 * elapsedTime
        torus.rotation.z = 0.4 * elapsedTime

        ThreeMeshUI.update();

	    controls.update();

        // Rotation elements meshContainer (VR) 
	    // meshContainer.rotation.z += 0.01;
	    // meshContainer.rotation.y += 0.01;

	    renderer.render( scene, camera );

        updateButtons();
    } );
    






    // // test ButtonVR

    // // renderer = new THREE.WebGLRenderer( { antialias: true } );
	// // renderer.setPixelRatio( window.devicePixelRatio );
	// // renderer.setSize( window.innerWidth, window.innerHeight );
	// // renderer.outputEncoding = THREE.sRGBEncoding;
	// // renderer.xr.enabled = true;
	// document.body.appendChild( VRButton.createButton( renderer ) );
	// document.body.appendChild( renderer.domElement );

    // // Orbit controls for no-vr
	// // controls = new OrbitControls( camera, renderer.domElement );
	// // camera.position.set( 0, 1.6, 0 );
	// // controls.target = new THREE.Vector3( 0, 1, -1.8 );

    // /////////
	// // Room
	// /////////

	// const room = new THREE.LineSegments(
	// 	new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
	// 	new THREE.LineBasicMaterial( { color: 0x808080 } )
	// );

	// const roomMesh = new THREE.Mesh(
	// 	new THREE.BoxGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
	// 	new THREE.MeshBasicMaterial( { side: THREE.BackSide } )
	// );

	// scene.add( room );
	// objsToTest.push( roomMesh );

    // ////////////////
	// // Controllers
	// ////////////////

	// vrControl = VRControl( renderer, camera, scene );

	// scene.add( vrControl.controllerGrips[ 0 ], vrControl.controllers[ 0 ] );

	// vrControl.controllers[ 0 ].addEventListener( 'selectstart', () => {

	// 	selectState = true;

	// } );
	// vrControl.controllers[ 0 ].addEventListener( 'selectend', () => {

	// 	selectState = false;

	// } );

    // ////////////////////
	// // Primitive Meshes
	// ////////////////////

	// meshContainer = new THREE.Group();
	// meshContainer.position.set( 0, 1, -1.9 );
	// scene.add( meshContainer );

	// //

	// const sphere = new THREE.Mesh(
	// 	new THREE.IcosahedronBufferGeometry( 0.3, 1 ),
	// 	new THREE.MeshStandardMaterial( { color: 0x3de364, flatShading: true } )
	// );

	// const box = new THREE.Mesh(
	// 	new THREE.BoxBufferGeometry( 0.45, 0.45, 0.45 ),
	// 	new THREE.MeshStandardMaterial( { color: 0x643de3, flatShading: true } )
	// );

	// const cone = new THREE.Mesh(
	// 	new THREE.ConeBufferGeometry( 0.28, 0.5, 10 ),
	// 	new THREE.MeshStandardMaterial( { color: 0xe33d4e, flatShading: true } )
	// );

	// //

	// sphere.visible = box.visible = cone.visible = false;

	// meshContainer.add( sphere, box, cone );

	// meshes = [ sphere, box, cone ];
	// currentMesh = 0;

	// showMesh( currentMesh );

    // //////////
	// // Panel
	// //////////

	// makePanel();

	// //

	// renderer.setAnimationLoop( loop );

    // // fin test buttonVR
    
    

}

// window.addEventListener( 'load', tick );
// window.addEventListener( 'resize', onWindowResize );

tick()

