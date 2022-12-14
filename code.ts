figma.showUI(__html__);
figma.ui.resize(360, 336);

figma.ui.onmessage = (pluginMessage) => {
  const previewComponentSet = figma.root.findOne(
    (node) => node.type == "COMPONENT_SET" && node.name == "preview"
  ) as ComponentSetNode;

  let selectedSize;

  if (pluginMessage.darkModeState === true) {
    switch (pluginMessage.previewSize) {
      case "2":
        selectedSize = previewComponentSet.findOne(
          (node) =>
            node.type == "COMPONENT" && node.name == "Image=M, Dark mode=true"
        ) as ComponentNode;
        break;
      case "3":
        selectedSize = previewComponentSet.findOne(
          (node) =>
            node.type == "COMPONENT" && node.name == "Image=S, Dark mode=true"
        ) as ComponentNode;
        break;
      default:
        selectedSize = previewComponentSet.findOne(
          (node) =>
            node.type == "COMPONENT" && node.name == "Image=L, Dark mode=true"
        ) as ComponentNode;
        break;
    }
  } else {
    switch (pluginMessage.previewSize) {
      case "2":
        selectedSize = previewComponentSet.findOne(
          (node) =>
            node.type == "COMPONENT" && node.name == "Image=M, Dark mode=false"
        ) as ComponentNode;
        break;
      case "3":
        selectedSize = previewComponentSet.findOne(
          (node) =>
            node.type == "COMPONENT" && node.name == "Image=S, Dark mode=false"
        ) as ComponentNode;
        break;
      default:
        selectedSize = previewComponentSet.findOne(
          (node) =>
            node.type == "COMPONENT" && node.name == "Image=L, Dark mode=false"
        ) as ComponentNode;
        break;
    }
  }
  const nodes: SceneNode[] = [];
  for (let i = 0; i < pluginMessage.amount; i++) {
    const prev = selectedSize.createInstance();
    prev.x = i * (prev.width + 16);
    figma.currentPage.appendChild(prev);
    nodes.push(prev);
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
  figma.closePlugin();
};

// function randomIntFromInterval(min, max) { // min and max included
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }

// const rndInt = randomIntFromInterval(1, 6)
// console.log(rndInt)
