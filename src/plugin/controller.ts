figma.showUI(__html__);

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'find-and-replace') {
    const findStr = msg.findVal;
    const replaceStr = msg.replaceVal;

    const selection = figma.currentPage.selection;
  
    if (selection.length === 0) {
      figma.closePlugin('Please select at least one layer');
      return;
    }

    for (const node of selection) {
      if (node.type === 'TEXT') {
        // For text layers, replace text content
        try {
          await figma.loadFontAsync({ family: "Inter", style: "Medium" });
        } catch(err) {
          console.error(`Error: ${err}`);
        }
        
        node.characters = node.characters.replace(findStr, replaceStr);        
      } else {
        // For other layers, replace the name
        node.name = node.name.replace(findStr, replaceStr);
      }
    }

    figma.ui.postMessage({
      type: 'find-and-replace',
      message: `Found and replaced names from ${selection.length} layers`,
    });
    figma.closePlugin('Layer names replaced');
  }
  else{
    figma.closePlugin();
  }
  
};
