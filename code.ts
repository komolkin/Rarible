figma.showUI(__html__);
figma.ui.resize(360, 218);

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

  selectedSize.createInstance();

  figma.closePlugin();
};

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

// figma.ui.onmessage = (msg) => {
//   // One way of distinguishing between different types of messages sent from
//   // your HTML page is to use an object with a "type" property like this.
//   if (msg.type === "create-rectangles") {
//     const nodes: SceneNode[] = [];
//     for (let i = 0; i < msg.count; i++) {
//       const rect = figma.createEllipse();
//       rect.x = i * 150;
//       rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
//       figma.currentPage.appendChild(rect);
//       nodes.push(rect);
//     }
//     figma.currentPage.selection = nodes;
//     figma.viewport.scrollAndZoomIntoView(nodes);
//   }

//   // Make sure to close the plugin when you're done. Otherwise the plugin will
//   // keep running, which shows the cancel button at the bottom of the screen.
//   // figma.closePlugin();
// };
