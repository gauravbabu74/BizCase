"use strict";
var core_1 = require('@angular/core');
var XmlObjects = require("nativescript-xmlobjects");
var XmltojsonService = (function () {
    function XmltojsonService() {
    }
    XmltojsonService.prototype.xmlToJson = function (xml) {
        var result = {};
        var doc = XmlObjects.parse(xml);
        var rootElement = doc.root;
        var allNodes = rootElement.nodes();
        var allNodesData = rootElement.elements();
        if (allNodesData.length > 0) {
            for (var i = 0; i < allNodes.length; i++) {
                var node = allNodes[i];
                if (node instanceof XmlObjects.XElement) {
                    if (typeof (result[node.name]) == "undefined") {
                        result[node.name] = this.xmlToJson(node);
                    }
                    else {
                        if (typeof (result[node.name].push) == "undefined") {
                            var old = result[node.name];
                            result[node.name] = [];
                            result[node.name].push(old);
                        }
                        result[node.name].push(this.xmlToJson(node));
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
    };
    XmltojsonService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], XmltojsonService);
    return XmltojsonService;
}());
exports.XmltojsonService = XmltojsonService;
//# sourceMappingURL=xmltojson.service.js.map