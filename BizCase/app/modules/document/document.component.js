"use strict";
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var router_2 = require('nativescript-angular/router');
var page_1 = require("ui/page");
var DocumentComponent = (function () {
    function DocumentComponent(router, page, routerExtensions, zone) {
        this.router = router;
        this.page = page;
        this.routerExtensions = routerExtensions;
        this.zone = zone;
        this.text = 'About Page';
        this.listArr = ['Class A', 'Class B', 'Class C', 'Class D', 'Class E', 'Class F', 'Class G', 'Class H', 'Class I', 'Class J', 'Class K', 'Class L', 'Class M', 'Class N', 'Class O', 'Class P', 'Class A', 'Class B', 'Class C', 'Class D', 'Class E', 'Class F', 'Class G', 'Class H', 'Class I', 'Class J', 'Class K', 'Class L', 'Class M', 'Class N', 'Class O', 'Class P', 'Class A', 'Class B', 'Class C', 'Class D', 'Class E', 'Class F', 'Class G', 'Class H', 'Class I', 'Class J', 'Class K', 'Class L', 'Class M', 'Class N', 'Class O', 'Class P', 'Class A', 'Class B', 'Class C', 'Class D', 'Class E', 'Class F', 'Class G', 'Class H', 'Class I', 'Class J', 'Class K', 'Class L', 'Class M', 'Class N', 'Class O', 'Class P', 'Class A', 'Class B', 'Class C', 'Class D', 'Class E', 'Class F', 'Class G', 'Class H', 'Class I', 'Class J', 'Class K', 'Class L', 'Class M', 'Class N', 'Class O', 'Class P', 'Class A', 'Class B', 'Class C', 'Class D', 'Class E', 'Class F', 'Class G', 'Class H', 'Class I', 'Class J', 'Class K', 'Class L', 'Class M', 'Class N', 'Class O', 'Class P'];
    }
    DocumentComponent.prototype.ngOnInit = function () {
        var _this = this;
        alert("ngOnInit");
        this.isAuthenticating = true;
        request({
            url: "https://sandbox.biz2services.com/mobapp/api/user/",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ apiaction: 'getlistfilesfolders', userID: this.username, parentID: 0, parentName: '' })
        }).then(function (response) {
            var result = response.content;
            _this.isAuthenticating = false;
            //alert("Result :" + result);
            var resData = _this.xmlToJson(result);
            if (resData['results']['faultcode'] === 1 || resData['results']['faultcode'] === '1') {
                appSettings.setBoolean("isLogin", true);
                //this.router.navigate(["home"]);
                Toast.makeText("success.", "long").show();
                _this.routerExtensions.navigate(["/home"]);
            }
            else {
                alert("Result :" + JSON.stringify(resData));
            }
        }).catch(function (err) {
            alert("Error occurred :" + JSON.stringify(err.stack));
        });
    };
    DocumentComponent.prototype.ngOnDestroy = function () {
        alert("ngOnDestroy");
    };
    DocumentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Mydocument',
            templateUrl: 'document.component.html',
            styleUrls: ["document.component.css"],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [router_1.Router, page_1.Page, router_2.RouterExtensions, core_1.NgZone])
    ], DocumentComponent);
    return DocumentComponent;
}());
exports.DocumentComponent = DocumentComponent;
//# sourceMappingURL=document.component.js.map