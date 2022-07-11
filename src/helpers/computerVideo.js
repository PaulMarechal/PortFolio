import * as THREE from 'three'

export function video(){
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
}