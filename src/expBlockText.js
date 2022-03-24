function makeTextPanel() {
  const container = new ThreeMeshUI.Block({
    ref: "container",
    padding: 0.025,
    fontFamily: FontJSON,
    fontTexture: FontImage,
    fontColor: new THREE.Color(0xffffff),
    backgroundOpacity: 0,
  });

  container.position.set(0, 1, -1.8);
  container.rotation.x = -0.55;
  scene.add(container);

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

  container.add(title);

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
  container.add(contentContainer);

  //

  new THREE.TextureLoader().load(SnakeImage, (texture) => {
    leftSubBlock.set({
      backgroundTexture: texture,
    });
  });
}
