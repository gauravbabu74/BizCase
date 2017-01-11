"use strict";
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
var document_model_1 = require("./document.model");
var http_1 = require("http");
var appSettings = require("application-settings");
var xmltojson_service_1 = require("../../xmltojson.service");
var DocumentService = (function () {
    function DocumentService(zone, xmltojsonservice) {
        this.zone = zone;
        this.xmltojsonservice = xmltojsonservice;
        this.items = new Rx_1.BehaviorSubject([]);
        this.allItems = [];
    }
    DocumentService.prototype.load = function () {
        var _this = this;
        http_1.request({
            url: "https://sandbox.biz2services.com/mobapp/api/folder/",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ apiaction: 'getlistfilesfolders', userID: appSettings.getString("userID"), parentID: 0, parentName: '' })
        }).then(function (response) {
            var result = response.content;
            var resData = _this.xmltojsonservice.xmlToJson(result);
            if (resData['results']['faultcode'] === 1 || resData['results']['faultcode'] === '1') {
                alert("Result :" + JSON.stringify(resData));
                var listArray = resData['results']['DocLists']["DocList"];
                for (var _i = 0, listArray_1 = listArray; _i < listArray_1.length; _i++) {
                    var entry = listArray_1[_i];
                    _this.allItems.push(new document_model_1.Document(entry.Id, entry.Name));
                    _this.publishUpdates();
                }
            }
            else {
                alert("Result :" + JSON.stringify(resData));
            }
        }).catch(function (err) {
            alert("Error occurred :" + JSON.stringify(err.stack));
        });
    };
    DocumentService.prototype.publishUpdates = function () {
        var _this = this;
        // Make sure all updates are published inside NgZone so that change detection is triggered if needed
        this.zone.run(function () {
            // must emit a *new* value (immutability!)
            _this.items.next(_this.allItems.slice());
        });
    };
    DocumentService.prototype.handleErrors = function (error) {
        console.log(error);
        return Rx_1.Observable.throw(error);
    };
    DocumentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.NgZone, xmltojson_service_1.XmltojsonService])
    ], DocumentService);
    return DocumentService;
}());
exports.DocumentService = DocumentService;
//# sourceMappingURL=document.service.js.map