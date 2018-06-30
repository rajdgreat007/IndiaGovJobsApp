/*  This file could  be used for parsing html and converting them to 
    corresponding view element. 
    Not being in use right now as we are using 'react-native-render-html'
    which provides the same functionality out of the box.
*/
import {DOMParser} from 'react-native-html-parser';

export const NODE_TYPES = {"STRONG" : "STRONG", "TEXT" : "TEXT", "ANCHOR" : "ANCHOR", "LIST" : "LIST"}

const processSingleNode = (node)=>{
    if(node.nodeType === 3 ){//text node
        renderDOM(node.nodeValue, NODE_TYPES.TEXT);
    }else if(node.tagName === "strong"){
        renderDOM(node.firstChild.nodeValue, NODE_TYPES.STRONG);
    }else if(node.tagName === 'a'){
        renderDOM(node.firstChild.nodeValue, NODE_TYPES.ANCHOR, node.attributes[0].nodeValue);
    }else if(node.tagName === 'li'){
        renderDOM(node.firstChild.nodeValue, NODE_TYPES.LIST);
    }
}
export const parseDOM = (domString) => {
    const parser = new DOMParser();
    let html = parser.parseFromString(domString, "text/html");
    let childNodes = Array.prototype.slice.apply(html.childNodes);
    childNodes.forEach((childNode)=>{
        if(childNode.tagName === 'p' || childNode.tagName === 'ul'){
            const pTag = childNode;
            const pTagChildNodes = Array.prototype.slice.apply(pTag.childNodes);
            if(pTagChildNodes.length === 1){
                processSingleNode(pTagChildNodes[0]);
            }else{
                pTagChildNodes.forEach((node)=>{
                    processSingleNode(node);
                });
            }
        }
    })
};

export const renderDOM = (text, nodeType, href) => {
    if(!text.trim()) return;
};