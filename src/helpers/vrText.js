import * as THREE from 'three'
import ThreeMeshUI from '../../src/three-mesh-ui.js';
import FontJson from '../assets/Roboto-msdf.json'
import FontImage from '../assets/Roboto-msdf.png'
import Aerobay from "../assets/aerobay.png"
import ColorFoot from "../assets/colorFoot.png"


export function textVr(){
    // Card VR projet 1 
    const containerImg = new ThreeMeshUI.Block({
    ref: "container",
    padding: 0.025,
    fontFamily: FontJson,
    fontTexture: FontImage,
    fontColor: new THREE.Color(0xffffff),
    backgroundOpacity: 0,
    });

    containerImg.rotation.set(0.48, 3.15, 0);

    const title = new ThreeMeshUI.Block({
    height: 0.2,
    width: 1.9,
    margin: 0.025,
    justifyContent: "center",
    fontSize: 0.09,
    });

    title.add(
    new ThreeMeshUI.Text({
        content: "Front-end developer apprenticeship - Aero-Bay",
    })
    );

    containerImg.add(title);

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
        content: "2021/22",
        fontSize: 0.04,
    })
    );

    leftSubBlock.add(caption);

    const rightSubBlock = new ThreeMeshUI.Block({
    margin: 0.025,
    });

    const subSubBlock1 = new ThreeMeshUI.Block({
        height: 0.35,
        width: 0.9,
        margin: 0.025,
        padding: 0.02,
        fontSize: 0.05,
        justifyContent: "center",
        backgroundOpacity: 0,
    }).add(
        new ThreeMeshUI.Text({
            content: "Apprenticeship as front-end developer | UI/UX in a company selling spare parts and services for aircraft and helicopters.",
        }), 
    );

    const subSubBlock2 = new ThreeMeshUI.Block({
        height: 0.53,
        width: 0.9,
        margin: 0.01,
        padding: 0.02,
        fontSize: 0.04,
        alignContent: "left",
        backgroundOpacity: 0,
    }).add(
        new ThreeMeshUI.Text({
        content: 
            "- Realization of the new visual identity. \n",
        }),

        new ThreeMeshUI.Text({
        content:
            "- Using Figma / HTML5 / CSS3 / JS / Java \n",
        }),
        new ThreeMeshUI.Text({
        content:
            "- Redesign of the intranet (UI/UX) \n",
        }),
        new ThreeMeshUI.Text({
        content:
            "- Realization of the design of the LinkedIn posts \n",
        }),

        new ThreeMeshUI.Text({
        content: 
            "- Launch of new functionalities (services) \n",
        })
        
    );

    rightSubBlock.add(subSubBlock1, subSubBlock2);

    const contentContainer = new ThreeMeshUI.Block({
        contentDirection: "row",
        padding: 0.02,
        margin: 0.025,
        backgroundOpacity: 0,
    });

    contentContainer.add(leftSubBlock, rightSubBlock);
    // gui.add(containerImg.position, 'x').min(-4).max(4).step(0.01).name('Container avec image position X')
    // gui.add(containerImg.position, 'y').min(-4).max(4).step(0.01).name('Container avec image position Y')
    // gui.add(containerImg.position, 'z').min(-4).max(4).step(0.01).name('Container avec image position Z')

    // gui.add(containerImg.rotation, 'x').min(-4).max(4).step(0.01).name('Container avec image rotation X')
    // gui.add(containerImg.rotation, 'y').min(-4).max(4).step(0.01).name('Container avec image rotation Y')
    // gui.add(containerImg.rotation, 'z').min(-4).max(4).step(0.01).name('Container avec image rotation Z')

    containerImg.add(contentContainer);

    new THREE.TextureLoader().load(Aerobay, (texture) => {
        leftSubBlock.set({
        backgroundTexture: texture,
        });
    });
    // }

    const projet1 = new THREE.Mesh(
        containerImg
    )

    scene.add(containerImg)
    containerImg.visible = false

    // Card VR projet 2
    const containerImg1 = new ThreeMeshUI.Block({
    ref: "container",
    padding: 0.025,
    fontFamily: FontJson,
    fontTexture: FontImage,
    fontColor: new THREE.Color(0xffffff),
    backgroundOpacity: 0,
    });

    containerImg1.rotation.set(0.48, 3.15, 0);

    const title1 = new ThreeMeshUI.Block({
    height: 0.2,
    width: 1.9,
    margin: 0.025,
    justifyContent: "center",
    fontSize: 0.09,
    });

    title1.add(
    new ThreeMeshUI.Text({
        content: "Full-stack developer internship - BBFT",
    })
    );

    containerImg1.add(title1);

    const leftSubBlock1 = new ThreeMeshUI.Block({
    height: 0.95,
    width: 1.0,
    margin: 0.025,
    padding: 0.025,
    alignContent: "left",
    justifyContent: "end",
    });

    const caption1 = new ThreeMeshUI.Block({
    height: 0.07,
    width: 0.37,
    alignContent: "center",
    justifyContent: "center",
    });

    caption1.add(
    new ThreeMeshUI.Text({
        content: "2021",
        fontSize: 0.04,
    })
    );

    leftSubBlock1.add(caption1);

    const rightSubBlock1 = new ThreeMeshUI.Block({
    margin: 0.025,
    });

    const subSubBlock11 = new ThreeMeshUI.Block({
        height: 0.35,
        width: 0.9,
        margin: 0.025,
        padding: 0.02,
        fontSize: 0.05,
        justifyContent: "center",
        backgroundOpacity: 0,
    }).add(
        new ThreeMeshUI.Text({
            content: "Creation of a web platform for the sale of fitness products. \n ",
        }),    
    );

    const subSubBlock21 = new ThreeMeshUI.Block({
        height: 0.53,
        width: 0.9,
        margin: 0.01,
        padding: 0.02,
        fontSize: 0.04,
        alignContent: "left",
        backgroundOpacity: 0,
    }).add(
        new ThreeMeshUI.Text({
            content:
                "- Global vision of the objectives of accessibility, attractiveness, referencing, ergonomics and legitimacy as well as a module of visualization of the room in 3D.\n",
        }),

        new ThreeMeshUI.Text({
            content: 
                "- Creation of the website in PHP / MySQL / JS / Three.js.\n",
        }),

        new ThreeMeshUI.Text({
            content: 
                "- Code monitoring and validation to ensure compatibility and security of the sales platform"
        }),
    );

    rightSubBlock1.add(subSubBlock11, subSubBlock21);

    const contentContainer1 = new ThreeMeshUI.Block({
        contentDirection: "row",
        padding: 0.02,
        margin: 0.025,
        backgroundOpacity: 0,
    });

    contentContainer1.add(leftSubBlock1, rightSubBlock1);

    containerImg1.add(contentContainer1);

    new THREE.TextureLoader().load(ColorFoot, (texture) => {
        leftSubBlock1.set({
        backgroundTexture: texture,
        });
    });
    // }

    scene.add(containerImg1)
    containerImg1.visible = false

    // School & U - VR Card 
    const containerImg2 = new ThreeMeshUI.Block({
    ref: "container",
    padding: 0.025,
    fontFamily: FontJson,
    fontTexture: FontImage,
    fontColor: new THREE.Color(0xffffff),
    backgroundOpacity: 0,
    });

    containerImg2.rotation.set(0.48, 3.15, 0);

    const title2 = new ThreeMeshUI.Block({
    height: 0.2,
    width: 1.9,
    margin: 0.025,
    justifyContent: "center",
    fontSize: 0.09,
    });

    title2.add(
    new ThreeMeshUI.Text({
        content: "SCHOOL & U - Connected notebook application",
    })
    );

    containerImg2.add(title2);

    const leftSubBlock2 = new ThreeMeshUI.Block({
    height: 0.95,
    width: 1.0,
    margin: 0.025,
    padding: 0.025,
    alignContent: "left",
    justifyContent: "end",
    });

    const caption2 = new ThreeMeshUI.Block({
    height: 0.07,
    width: 0.37,
    alignContent: "center",
    justifyContent: "center",
    });

    caption2.add(
    new ThreeMeshUI.Text({
        content: "2021",
        fontSize: 0.04,
    })
    );

    leftSubBlock2.add(caption2);

    const rightSubBlock2 = new ThreeMeshUI.Block({
    margin: 0.025,
    });

    const subSubBlock12 = new ThreeMeshUI.Block({
        height: 0.35,
        width: 0.9,
        margin: 0.025,
        padding: 0.02,
        fontSize: 0.05,
        justifyContent: "center",
        backgroundOpacity: 0,
    }).add(
        new ThreeMeshUI.Text({
            content: "Realization of a React-Native application to facilitate communication between parents and teachers. The app is available for iOS, Android and Web.\n ",
        }),    
    );

    const subSubBlock22 = new ThreeMeshUI.Block({
        height: 0.53,
        width: 0.9,
        margin: 0.01,
        padding: 0.02,
        fontSize: 0.04,
        alignContent: "left",
        backgroundOpacity: 0,
    }).add(
        new ThreeMeshUI.Text({
            content:
                "- Identification\n",
        }),

        new ThreeMeshUI.Text({
            content: 
                "- Messaging: common chat and/or between two parents of the class\n",
        }),

        new ThreeMeshUI.Text({
            content: 
                "- Blog: posting photos and messages from the teacher about the class"
        }),

        new ThreeMeshUI.Text({
            content: 
                "- Liaison book"
        }),

        new ThreeMeshUI.Text({
            content: 
                "- Editing information and adding a new child"
        }),

        new ThreeMeshUI.Text({
            content: 
                "- Database: Firebase & Firestore"
        }),
    );

    rightSubBlock2.add(subSubBlock12, subSubBlock22);

    const contentContainer2 = new ThreeMeshUI.Block({
        contentDirection: "row",
        padding: 0.02,
        margin: 0.025,
        backgroundOpacity: 0,
    });

    contentContainer2.add(leftSubBlock2, rightSubBlock2);

    containerImg2.add(contentContainer2);

    new THREE.TextureLoader().load(School, (texture) => {
        leftSubBlock2.set({
        backgroundTexture: texture,
        });
    });
    // }

    scene.add(containerImg2)
    containerImg2.visible = false

    // Feelin'Food - VR Card 
    const feelinFoodContainerImg = new ThreeMeshUI.Block({
    ref: "container",
    padding: 0.025,
    fontFamily: FontJson,
    fontTexture: FontImage,
    fontColor: new THREE.Color(0xffffff),
    backgroundOpacity: 0,
    });

    feelinFoodContainerImg.rotation.set(0.48, 3.15, 0);

    const feelinnFoodTitle = new ThreeMeshUI.Block({
    height: 0.2,
    width: 1.9,
    margin: 0.025,
    justifyContent: "center",
    fontSize: 0.09,
    });

    feelinnFoodTitle.add(
    new ThreeMeshUI.Text({
        content: "Feelin'Food - website for click & collect restaurants",
    })
    );

    feelinFoodContainerImg.add(feelinnFoodTitle);

    const feelinfoodLeftSubBlock = new ThreeMeshUI.Block({
    height: 0.95,
    width: 1.0,
    margin: 0.025,
    padding: 0.025,
    alignContent: "left",
    justifyContent: "end",
    });

    const feelinFoodAnnee = new ThreeMeshUI.Block({
    height: 0.07,
    width: 0.37,
    alignContent: "center",
    justifyContent: "center",
    });

    feelinFoodAnnee.add(
    new ThreeMeshUI.Text({
        content: "2021",
        fontSize: 0.04,
    })
    );

    feelinfoodLeftSubBlock.add(feelinFoodAnnee);

    const feelinnFoodRightSubBlock = new ThreeMeshUI.Block({
    margin: 0.025,
    });

    const feelinFoodSubSubBlock1 = new ThreeMeshUI.Block({
        height: 0.35,
        width: 0.9,
        margin: 0.025,
        padding: 0.02,
        fontSize: 0.05,
        justifyContent: "center",
        backgroundOpacity: 0,
    }).add(
        new ThreeMeshUI.Text({
            content: "Realization of a dynamic site for restaurant wishing to set up take-out sales This project was carried out in: HTML5, CSS3, PHP, mySQL, Vanilla JS.\n ",
        }),    
    );

    const feelinFoodSubSubBlock2 = new ThreeMeshUI.Block({
        height: 0.53,
        width: 0.9,
        margin: 0.01,
        padding: 0.02,
        fontSize: 0.04,
        alignContent: "left",
        backgroundOpacity: 0,
    }).add(
        new ThreeMeshUI.Text({
            content:
                "- Identification\n",
        }),

        new ThreeMeshUI.Text({
            content: 
                "- User account\n",
        }),

        new ThreeMeshUI.Text({
            content: 
                "- Follow-up of suppliers, stocks, technical sheets\n"
        }),

        new ThreeMeshUI.Text({
            content: 
                "- Click & collect\n"
        })
    );

    feelinnFoodRightSubBlock.add(feelinFoodSubSubBlock1, feelinFoodSubSubBlock2);

    const contentContainer3 = new ThreeMeshUI.Block({
        contentDirection: "row",
        padding: 0.02,
        margin: 0.025,
        backgroundOpacity: 0,
    });

    contentContainer3.add(feelinfoodLeftSubBlock, feelinnFoodRightSubBlock);

    feelinFoodContainerImg.add(contentContainer3);

    new THREE.TextureLoader().load(FeelingFood, (texture) => {
        feelinfoodLeftSubBlock.set({
        backgroundTexture: texture,
        });
    });

    scene.add(feelinFoodContainerImg)
    feelinFoodContainerImg.visible = false


    feelinFoodContainerImg.visible = containerImg2.visible = containerImg1.visible = containerImg.visible = false;
    meshContainer.add(feelinFoodContainerImg, containerImg2, containerImg1, containerImg);
    meshes = [feelinFoodContainerImg, containerImg2, containerImg1, containerImg ];
    currentMesh = 0;
}