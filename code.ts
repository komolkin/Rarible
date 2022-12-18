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
