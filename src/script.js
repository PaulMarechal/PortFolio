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

import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

// import FontJSON from '/src/assets/Roboto-msdf.json';
// import FontImage from '/src/assets/Roboto-msdf.png';
// const ThreeMeshUI = require('three-mesh-ui');

/**
 * Loaders
*/

// screen.lockOrientation('landscape');

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



// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager)
gltfLoader.setDRACOLoader(dracoLoader)


/**
 * Base
 */
// Debug
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
// const geometry = new THREE.TorusGeometry(2.5, 3, 20, 45)
const materialCloud = new THREE.MeshBasicMaterial( { color: 0xffffff } );
// const torus = new THREE.Mesh( geometry, material );
// torus.rotation.x = 250
// torus.position.y = -4.5
const geometryCloud = new THREE.TorusGeometry(0.3, 0.4, 20, 45)


// Others small clouds
for(let i = 0; i < 14; i++)
{
    // const geometryCloud = new THREE.TorusGeometry(0.3, 0.4, 20, 45)
    // const cloudTorus = new THREE.Mesh(geometryCloud, material)

    // const scaleCloud = Math.random()
    // cloudTorus.scale.set(scaleCloud, scaleCloud, scaleCloud)

    // cloudTorus.position.x = (Math.random() - 0.2) * 20
    // cloudTorus.position.y = (Math.random() - 0.6) * 20
    // cloudTorus.position.z = (Math.random() - 0.2) * 20

    // cloudTorus.rotation.x = 250

    // scene.add( cloudTorus );

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
            // child.position.y = 1
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
        // pour charger une animation
        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[1])
        const stay = mixer.clipAction(gltf.animations[0])
        //mixer.clipAction(action).play();
        stay.play()

        gltf.scene.scale.set(0.007, 0.007, 0.007) // for the Fox
        gltf.scene.position.z = -3
        gltf.scene.position.x = -4.8
        gltf.scene.position.y = -0.15

        // test 

        
        
        document.onkeydown = function(e) {
            switch (e.keyCode) {
            case 37:
                action.play()
                gltf.scene.position.x += 0.02;
                //camera.position.x += 0.01
                gltf.scene.position.z += 0.01;
                //camera.position.z += 0.01
                gltf.scene.rotation.y += 0.06;
                //camera.position.y += 0.02
                break;

            case 38:
                action.play()
                gltf.scene.position.z += 0.02;
                //camera.position.z += 0.01
                break;

            case 39:
                action.play()
                gltf.scene.position.x -= 0.02;
                //camera.position.x += 0.01
                gltf.scene.position.z += 0.01;
                //camera.position.z += 0.01
                gltf.scene.rotation.y -= 0.06;
                //camera.rotation.y += 0.02
                break;

            case 40:
                action.play()
                gltf.scene.position.z -= 0.02;
                camera.position.z -= 0.01
                break;
            }
            stay.play();
        };

        document.onkeyup = function(e) {
            switch (e.keyCode) {
            case 37:
                action.stop()
                break;

            case 38:
                action.stop()
                break;

            case 39:
                action.stop()
                break;

            case 40:
                action.stop()
                break;
            }
            stay.play();
        };
        

        // fin test 
        scene.add(gltf.scene)

        
    }
    // () => {
    //     console.log('progress')
    // },
    // () => {
    //     console.log('error')
    // },
)

/**
 * Elvis
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
//directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)


/**
 * Points of interest
 */
const raycaster = new THREE.Raycaster()
const points = [
    {
        position: new THREE.Vector3(0.30, 1.5, 4.7),
        element: document.querySelector('.point-0')
    },
    {
        position: new THREE.Vector3(0.5, 1.7, -4.0),
        element: document.querySelector('.point-1')
    }, 
    {
        position: new THREE.Vector3(3.7, 1.7, 0.5), 
        element: document.querySelector('.point-2')
    }, 
    {
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
debugObject.depthColor = '#11aced'
debugObject.surfaceColor = '#00FFFF'
// debugObject.depthColor = 'rgb(114 ,212 ,253, .7)'
// debugObject.surfaceColor = 'rgb(134,218,253, .7)'

// Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
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
        uColorMultiplier: { value: 3.68}
    }
})

// gui.add(waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.01).name('uBigWavesElevation')

// gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.01).name('uBigWavesFrequencyX')
// gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.01).name('uBigWavesFrequencyY')

// gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.01).name('uBigWavesSpeed')

// gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
// gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
// gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
// gui.add(waterMaterial.uniforms.uSmallWavesIterations, 'value').min(0).max(5).step(1).name('uSmallWavesIterations')

// Mesh 
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
    // valeur par défaut en bout de ligne : 4
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

// gui.add(firefliesMaterial.uniforms.uSize, 'value').min(0).max(500).step(1).name('fireflies Size')

// Points 
const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial)
scene.add(fireflies)

// // test Text VR
// const container = new ThreeMeshUI.Block({
// 	height: 1.5,
// 	width: 1
// });

// container.position.set( 0, 1, -1.8 );
// container.rotation.x = -0.55;
// scene.add( container );

// const imageBlock = new ThreeMeshUI.Block({
// 	height: 1,
// 	width: 1,
// 	offset: 0.1 // distance separating the inner block from its parent
// });

// const textBlock = new ThreeMeshUI.Block({
// 	height: 0.4,
// 	width: 0.8,
// 	margin: 0.05, // like in CSS, horizontal and vertical distance from neighbour
// 	offset: 0.1 // distance separating the inner block from its parent
// });

// container.add( imageBlock, textBlock );

// const loader = new THREE.TextureLoader();

// loader.load( Image, (texture)=> {

// 	imageBlock.set({ backgroundTexture: texture });

// });

// container.set({
// 	fontFamily: FontJson,
// 	fontTexture: FontImage,
// });

// const text = new ThreeMeshUI.Text({
// 	content: 'The spiny bush viper is known for its extremely keeled dorsal scales.'
// });

// textBlock.add(
// 	new ThreeMeshUI.Text({
// 		content: ' Mind your fingers.',
// 		fontSize: 0.07,
// 		fontColor: new THREE.Color( 0xefffe8 )
// 	})
// );
// textBlock.add( text );
// fin test vr 









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
// Valeurs camera vant changement (45, sizes.width/sizes.height, 1, 50)
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

// Brouillard 
scene.fog = new THREE.FogExp2( '#38c3fc', 0.04 );

// couleur du ciel 
debugObject.clearColor = '#38c3fc'
renderer.setClearColor(debugObject.clearColor)
// gui
//     .addColor(debugObject, 'clearColor')
//     .onChange(() => {
//         renderer.setClearColor(debugObject.clearColor)
//     })

// Soleil 
const sunGeometry = new THREE.SphereGeometry( 1,32, 16 );
const sunMaterial = new THREE.MeshBasicMaterial( { color: '#efd807' } );
const sun = new THREE.Mesh( sunGeometry, sunMaterial );
sun.radius = 3
sun.position.y = 5.5
sun.position.x = -15.7
sun.position.z = 1.5

scene.add( sun );

// Image tableau noir 
var loaderTab = new THREE.TextureLoader();

var materialTab = new THREE.MeshLambertMaterial({
  map: loaderTab.load('https://ak.picdn.net/shutterstock/videos/30298276/thumb/12.jpg')
});

// Create a plane geometry for the image and preserve the image aspect ratio 
var geometryTab = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// combine our image geometry and material into a mesh
var meshTab = new THREE.Mesh(geometryTab, materialTab);

// set the position of the image mesh in the x,y,z dimensions
meshTab.position.set(0,0,0)
meshTab.rotation.y = 3.165


meshTab.position.x = 0.2
meshTab.position.z = 6.399
meshTab.position.y = 0.9

// add the image to the scene
scene.add(meshTab);

//
// test VR 
//
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
	margin: 0.01, // like in CSS, horizontal and vertical distance from neighbour
	//offset: 0.1 // distance separating the inner block from its parent
});

container.add(textBlock );

// textureLoader.load( ImageLozere, (texture)=> {
// 	imageBlock.set({ backgroundTexture: texture });
// });

container.set({
	fontFamily: FontJson,
	fontTexture: FontImage,
});

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

// controllers

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



// fin test VR

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // // test 
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
    // // Update mixer
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
        for(const point of points)
        {
            const screenPosition = point.position.clone()
            screenPosition.project(camera)

            const translateX = screenPosition.x * sizes.width * 0.5
            const translateY = - screenPosition.y * sizes.height * 0.5
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }

    }
    
    
    // Rotation elements bibliotheque
    //cube.rotation.x = 0.4 * elapsedTime
    //cube.rotation.y = 0.4 * elapsedTime
    


    //cone.rotation.y = 0.4 * elapsedTime
    //cone.rotation.x = 0.4 * elapsedTime
    


    //torus.rotation.y = 0.4 * elapsedTime
    //torus.rotation.z = 0.4 * elapsedTime

    // test animation VR

    


    // fin de test animation VR 
    


    // Render
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
        // test rendu avec Oculus 
        renderer.xr.setFramebufferScaleFactor( 2.0 );
        // torus.rotation.z += 0.01
        // cone.rotation.y += 0.01
        // cube.rotation.x += 0.01

        renderer.setAnimationLoop( function () {
            renderer.render( scene, camera);
        } );
        ThreeMeshUI.update();
        // fonctionne aussi : 
        //renderer.setAnimationLoop(tick)
    
    ThreeMeshUI.update();
}




tick()


// test waves
// uniform float uTime;
// uniform vec2 uFrequency;
// uniform float uSpeed;
// uniform float uThreshold;

// varying vec2 vUv;

// #pragma glslify: getClassicNoise2d = require('../partials/getClassicNoise2d.glsl')

// void main()
// {
//     /**
//      * Waves
//      */
//     vec2 wavesUv = vUv * uFrequency;
//     wavesUv.y += uTime * uSpeed;

//     float edgeTreshold = 0.5;
//     float edgeStrength = 1.0 - abs(vUv.y - edgeTreshold) * 2.0;
//     edgeStrength = pow(edgeStrength, 3.0);
    
//     float waveStrength = getClassicNoise2d(wavesUv);
//     waveStrength += edgeStrength;
//     waveStrength = step(uThreshold, waveStrength);

//     /**
//      * Final color
//      */
//     gl_FragColor = vec4(1.0, 1.0, 1.0, waveStrength);

//     #include <tonemapping_fragment>
//     #include <encodings_fragment>
// }