import { Injectable } from '@angular/core';
import * as XmlObjects from "nativescript-xmlobjects";

@Injectable()
export class XmltojsonService {
    
    xmlToJson(xml: string): any {
        let result: any = {};
        let doc = XmlObjects.parse(xml);
        var rootElement = doc.root;
        var allNodes = rootElement.nodes();
        var allNodesData = rootElement.elements();
        if (allNodesData.length > 0) {
            for (var i = 0; i < allNodes.length; i++) {
                var node = allNodes[i];
                if (node instanceof XmlObjects.XElement) {
                    if (typeof (result[<any>node.name]) == "undefined") {
                        result[<any>node.name] = this.xmlToJson(<any>node);
                    } else {
                        if (typeof (result[<any>node.name].push) == "undefined") {
                            var old = result[<any>node.name];
                            result[<any>node.name] = [];
                            result[<any>node.name].push(old);
                        }
                        result[<any>node.name].push(this.xmlToJson(<any>node));
                    }
                }
            }
        }
        else {
            var node = allNodes[0];
            if (node instanceof XmlObjects.XText) {
                result = node.value;
            }

        }
        return result;
    }
}