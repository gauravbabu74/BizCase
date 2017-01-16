"use strict";
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var router_2 = require('nativescript-angular/router');
var Rx_1 = require("rxjs/Rx");
var page_1 = require("ui/page");
var http_1 = require("http");
var appSettings = require("application-settings");
var xmltojson_service_1 = require("../xmltojson.service");
var shared_1 = require("./shared");
var dialogs = require("ui/dialogs");
var imagepicker = require("nativescript-imagepicker");
var DocumentComponent = (function () {
    function DocumentComponent(_changeDetectionRef, store, router, page, routerExtensions, zone, xmltojsonservice) {
        this._changeDetectionRef = _changeDetectionRef;
        this.store = store;
        this.router = router;
        this.page = page;
        this.routerExtensions = routerExtensions;
        this.zone = zone;
        this.xmltojsonservice = xmltojsonservice;
        this.text = 'About Page';
        this.isAuthenticating = false;
        this.items = new Rx_1.BehaviorSubject([]);
        this.allItems = [];
        this.itemsArr = [];
        this.loaded = new core_1.EventEmitter();
    }
    DocumentComponent.prototype.ngOnInit = function () {
    };
    DocumentComponent.prototype.ngOnDestroy = function () {
    };
    ;
    DocumentComponent.prototype.load = function () {
        var _this = this;
        this.isAuthenticating = true;
        http_1.request({
            url: "https://sandbox.biz2services.com/mobapp/api/folder/",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ apiaction: 'getlistfilesfolders', userID: appSettings.getString("userID"), parentID: 0, parentName: '' })
        }).then(function (response) {
            var result = response.content;
            var resData = _this.xmltojsonservice.xmlToJson(result);
            if (resData['results']['faultcode'] === 1 || resData['results']['faultcode'] === '1') {
                _this.isAuthenticating = false;
                var listArray = resData['results']['DocLists']["DocList"];
                for (var _i = 0, listArray_1 = listArray; _i < listArray_1.length; _i++) {
                    var entry = listArray_1[_i];
                    _this.allItems.push(new shared_1.Document(entry.id, entry.name));
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
    DocumentComponent.prototype.onItemTap = function (args) {
        alert("------------------------ ItemTapped: " + args.index);
    };
    DocumentComponent.prototype.publishUpdates = function () {
        var _this = this;
        // Make sure all updates are published inside NgZone so that change detection is triggered if needed
        this.zone.run(function () {
            // must emit a *new* value (immutability!)
            _this.items.next(_this.allItems.slice());
        });
    };
    DocumentComponent.prototype.handleErrors = function (error) {
        console.log(error);
        return Rx_1.Observable.throw(error);
    };
    DocumentComponent.prototype.onTapNewFolder = function () {
        dialogs.prompt({
            title: "New Folder",
            okButtonText: "Create",
            cancelButtonText: "Cancel",
            defaultText: "",
            inputType: dialogs.inputType.text
        }).then(function (r) {
            alert("Dialog result: " + r.result + ", text: " + r.text);
        });
    };
    DocumentComponent.prototype.onTapNewFile = function () {
        var _this = this;
        dialogs.action({
            message: "Add File",
            cancelButtonText: "Cancel",
            actions: ["Use Gallery"]
        }).then(function (result) {
            if (result == "Use Gallery") {
                _this.onSelectSingleTap();
            }
        });
    };
    DocumentComponent.prototype.onSelectMultipleTap = function () {
        var context = imagepicker.create({
            mode: "multiple"
        });
        this.startSelection(context);
    };
    DocumentComponent.prototype.onSelectSingleTap = function () {
        var context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    };
    DocumentComponent.prototype.startSelection = function (context) {
        var _this = this;
        context
            .authorize()
            .then(function () {
            _this.itemsArr = [];
            return context.present();
        })
            .then(function (selection) {
            console.log("Selection done:");
            selection.forEach(function (selected) {
                console.log("----------------");
                alert("uri: " + selected.uri);
                alert("fileUri: " + selected.fileUri);
            });
            _this.itemsArr = selection;
            _this._changeDetectionRef.detectChanges();
        }).catch(function (e) {
            console.log(e);
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocumentComponent.prototype, "loaded", void 0);
    DocumentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Mydocument',
            templateUrl: 'document.component.html',
            styleUrls: ["document.component.css"],
            providers: [shared_1.DocumentService]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ChangeDetectorRef !== 'undefined' && core_1.ChangeDetectorRef) === 'function' && _a) || Object, shared_1.DocumentService, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof page_1.Page !== 'undefined' && page_1.Page) === 'function' && _c) || Object, (typeof (_d = typeof router_2.RouterExtensions !== 'undefined' && router_2.RouterExtensions) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object, xmltojson_service_1.XmltojsonService])
    ], DocumentComponent);
    return DocumentComponent;
    var _a, _b, _c, _d, _e;
}());
exports.DocumentComponent = DocumentComponent;
//# sourceMappingURL=document.component.js.map