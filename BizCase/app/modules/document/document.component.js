"use strict";
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var router_2 = require('nativescript-angular/router');
var page_1 = require("ui/page");
var http_1 = require("http");
var appSettings = require("application-settings");
var xmltojson_service_1 = require("../xmltojson.service");
var DataItem = (function () {
    function DataItem(id, name) {
        this.id = id;
        this.name = name;
    }
    return DataItem;
}());
var DocumentComponent = (function () {
    function DocumentComponent(router, page, routerExtensions, zone, xmltojsonservice) {
        this.router = router;
        this.page = page;
        this.routerExtensions = routerExtensions;
        this.zone = zone;
        this.xmltojsonservice = xmltojsonservice;
        this.text = 'About Page';
        this.listArr = [];
    }
    DocumentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.zone.run(function () {
            http_1.request({
                url: "https://sandbox.biz2services.com/mobapp/api/folder/",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({ apiaction: 'getlistfilesfolders', userID: appSettings.getString("userID"), parentID: 0, parentName: '' })
            }).then(function (response) {
                var result = response.content;
                var resData = _this.xmltojsonservice.xmlToJson(result);
                if (resData['results']['faultcode'] === 1 || resData['results']['faultcode'] === '1') {
                    var listArray = resData['results']['DocLists']["DocList"];
                    for (var _i = 0, listArray_1 = listArray; _i < listArray_1.length; _i++) {
                        var entry = listArray_1[_i];
                        _this.listArr.push(new DataItem(entry.id, entry.name));
                    }
                }
                else {
                    alert("Result :" + JSON.stringify(resData));
                }
            }).catch(function (err) {
                alert("Error occurred :" + JSON.stringify(err.stack));
            });
        });
    };
    DocumentComponent.prototype.ngOnDestroy = function () {
        alert("ngOnDestroy");
    };
    DocumentComponent.prototype.onItemTap = function (args) {
        alert("------------------------ ItemTapped: " + args.index);
    };
    DocumentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Mydocument',
            templateUrl: 'document.component.html',
            styleUrls: ["document.component.css"],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [router_1.Router, page_1.Page, router_2.RouterExtensions, core_1.NgZone, xmltojson_service_1.XmltojsonService])
    ], DocumentComponent);
    return DocumentComponent;
}());
exports.DocumentComponent = DocumentComponent;
//# sourceMappingURL=document.component.js.map