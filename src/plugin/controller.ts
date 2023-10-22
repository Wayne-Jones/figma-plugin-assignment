figma.showUI(__html__);

figma.ui.resize(300, 400);

figma.ui.onmessage = (msg) => {
  if (msg.type === 'find-and-replace') {
    const findStr = msg.findVal;
    const replaceStr = msg.replaceVal;
    const caseSensitive = msg.caseSensitive;
    const exactMatch = msg.exactMatch;
    const searchInOption = msg.searchInOption;

    let nodeArr: readonly SceneNode[];

    const replaceHandling = (nodeArr) => {
      for (const node of nodeArr) {
        if(caseSensitive){
          node.name = node.name.replace(findStr, replaceStr);
        }
        else{
          var regEx = new RegExp(findStr, "ig");
          node.name = node.name.replace(regEx, replaceStr);
        }
      }
    }

    const findNodeHandling = (node) => {
      if (caseSensitive){
        if(exactMatch){
          return node.name === findStr;
        }
        return node.name.includes(findStr);
      }
      if(exactMatch){
        return node.name.toLowerCase() === findStr.toLowerCase();
      }
      return node.name.toLowerCase().includes(findStr.toLowerCase());
    }

    if(searchInOption === "Selection"){
      nodeArr = figma.currentPage.selection;
      if (nodeArr.length === 0) {
        figma.closePlugin('Please select at least one layer');
        return;
      }
      nodeArr = nodeArr.filter((node) => {
        return findNodeHandling(node);
      });
    }
    else {
      nodeArr = figma.currentPage.findAll((node) => {
        if(node.type !== "TEXT"){
          return findNodeHandling(node);
        }
      });
    }

    replaceHandling(nodeArr);

    figma.ui.postMessage({
      type: 'find-and-replace',
      message: `Found and replaced names from ${nodeArr.length} layers`,
    });
    figma.closePlugin(`Found and replaced names from ${nodeArr.length} layers`);
  }
  else{
    figma.closePlugin();
  }
  
};
