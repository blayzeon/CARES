/*
    Returns a node
*/

function mkDom(type, text=false, attributeArray=[], classArray=[], container=false){
    const node = document.createElement(type);

    if (text !== false){
        node.innerHTML = text;
    }

    // set the attributes for the node
    for (let i = 0; i < attributeArray.length; i += 1){
        node.setAttribute(attributeArray[i][0], attributeArray[i][1]);
    }

    // set the classes
    for (let i = 0; i < classArray.length; i += 1){
        node.classList.add(classArray[i])
    }

    if (container !== false){
        container.appendChild(node);
    } else {
        return node;
    }
}

export default mkDom;