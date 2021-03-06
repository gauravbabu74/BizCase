"use strict";
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var router_2 = require('nativescript-angular/router');
var platform_1 = require("platform");
var connectivity_1 = require("connectivity");
var http_1 = require("http");
var page_1 = require("ui/page");
var dialogs = require("ui/dialogs");
var xmltojson_service_1 = require("../xmltojson.service");
var appSettings = require("application-settings");
var Toast = require('nativescript-toast');
var connectivity = require("connectivity");
require("rxjs/Rx");
var LoginComponent = (function () {
    function LoginComponent(router, page, routerExtensions, zone, xmltojsonservice) {
        this.router = router;
        this.page = page;
        this.routerExtensions = routerExtensions;
        this.zone = zone;
        this.xmltojsonservice = xmltojsonservice;
        this.username = "gaurav.babu@sakshay.in";
        this.isLogin = false;
        this.isAuthenticating = false;
        this.pass = "mobileapp";
        this.deviceToken = "APA91bFuXV0ZSvWmJJjLiNDNDrPJkAaeZ39cgGHf4jZiv_MMndzkn3m5ZXB1mkyNz5lJtQPCvUQ0VjnMpVVzjuVAA8PRotP-ZnWO-_fzvVNUvk2LNw2e5vbCxxO37tG4SLsHO5HhihAS-wPpy3mrJFBnJ8l6UBVFWlmXLjtXMjh8bY3urp-IIT0";
        this.deviceType = "simulator";
        this.imageType = "none";
        var connectionType = connectivity.getConnectionType();
        switch (connectionType) {
            case connectivity.connectionType.none:
                this.connectionType = "None";
                break;
            case connectivity.connectionType.wifi:
                this.connectionType = "Wi-Fi";
                break;
            case connectivity.connectionType.mobile:
                this.connectionType = "Mobile";
                break;
            default:
                break;
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = true;
        this.isLogin = appSettings.getBoolean("isLogin");
        if (this.isLogin === true) {
            this.routerExtensions.navigate(["home"]);
        }
        if (platform_1.isAndroid) {
            this.imageType = "none";
        }
        if (platform_1.isIOS) {
            this.imageType = "aspectFit";
        }
        connectivity.startMonitoring(function (newConnectionType) {
            _this.zone.run(function () {
                switch (newConnectionType) {
                    case connectivity.connectionType.none:
                        _this.connectionType = "None";
                        console.log("Connection type changed to none.");
                        break;
                    case connectivity.connectionType.wifi:
                        _this.connectionType = "Wi-Fi";
                        console.log("Connection type changed to WiFi.");
                        break;
                    case connectivity.connectionType.mobile:
                        _this.connectionType = "Mobile";
                        console.log("Connection type changed to mobile.");
                        break;
                    default:
                        break;
                }
            });
        });
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        // >> connectivity-stop-code
        connectivity.stopMonitoring();
        // << connectivity-stop-code
        //alert('ngOnDestroy');
    };
    LoginComponent.prototype.validateUser = function () {
        var _this = this;
        var username = this.username;
        var password = this.pass;
        if (username === "") {
            var options = {
                title: "Notification",
                message: "Please enter your username.",
                okButtonText: "Ok",
                neutralButtonText: "Cancel"
            };
            dialogs.confirm(options).then(function (result) {
                if (result === true) {
                    _this.uname.nativeElement.focus();
                }
            });
            return;
        }
        if (password === "") {
            var options = {
                title: "Notification",
                message: "Please enter your password.",
                okButtonText: "Ok",
                neutralButtonText: "Cancel"
            };
            dialogs.confirm(options).then(function (result) {
                if (result === true) {
                    _this.password.nativeElement.focus();
                }
            });
            return;
        }
        if (connectivity_1.getConnectionType() === connectivity_1.connectionType.none) {
            var options = {
                title: "Notification",
                message: "No Active Connection Found.",
                okButtonText: "Retry",
                neutralButtonText: "Cancel"
            };
            dialogs.confirm(options).then(function (result) {
                if (result === true) {
                    _this.validateUser();
                }
            });
        }
        else {
            this.userLogin();
        }
    };
    LoginComponent.prototype.userLogin = function () {
        var _this = this;
        // >> post-request-http-module
        this.isAuthenticating = true;
        http_1.request({
            url: "https://sandbox.biz2services.com/mobapp/api/user/",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ apiaction: 'userlogin', userID: this.username, password: this.pass, devicetoken: this.deviceToken, devicetype: this.deviceType })
        }).then(function (response) {
            var result = response.content;
            _this.isAuthenticating = false;
            //alert("Result :" + result);
            var resData = _this.xmltojsonservice.xmlToJson(result);
            if (resData['results']['faultcode'] === 1 || resData['results']['faultcode'] === '1') {
                appSettings.setBoolean("isLogin", true);
                appSettings.setString("userID", resData['results']['UserData']['userID']);
                Toast.makeText("success.", "long").show();
                _this.routerExtensions.navigate(["/home"]);
            }
            else {
                alert("Result :" + JSON.stringify(resData));
            }
        }).catch(function (err) {
            alert("Error occurred :" + JSON.stringify(err.stack));
        });
        // << post-request-http-module
    };
    LoginComponent.prototype.forgotPass = function () {
        var _this = this;
        var options = {
            title: "Forgot Password",
            message: "Enter the email address you used to register for Biz2Credit to reset your password.",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        };
        dialogs.prompt(options).then(function (result) {
            if (result.result === true) {
                var forgotmail = result.text;
                if (forgotmail === "") {
                    var options_1 = {
                        title: "Notification",
                        message: "Please enter your email!.",
                        okButtonText: "Ok",
                        neutralButtonText: "Cancel"
                    };
                    dialogs.confirm(options_1).then(function (result) {
                        if (result === true) {
                            _this.forgotPass();
                        }
                    });
                    return;
                }
                if (!_this.validateEmail(forgotmail)) {
                    var options_2 = {
                        title: "Notification",
                        message: "Please enter a valid email address.",
                        okButtonText: "Ok",
                        neutralButtonText: "Cancel"
                    };
                    dialogs.confirm(options_2).then(function (result) {
                        if (result === true) {
                            _this.forgotPass();
                        }
                    });
                    return;
                }
                if (connectivity_1.getConnectionType() === connectivity_1.connectionType.none) {
                    var options_3 = {
                        title: "Notification",
                        message: "No Active Connection Found.",
                        okButtonText: "Retry",
                        neutralButtonText: "Cancel"
                    };
                    dialogs.confirm(options_3).then(function (result) {
                        if (result === true) {
                            _this.forgotPass();
                        }
                    });
                }
                else {
                    _this.isAuthenticating = true;
                    http_1.request({
                        url: "https://sandbox.biz2services.com/mobapp/api/user/",
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        content: JSON.stringify({ apiaction: 'forgotpassword', useremail: forgotmail })
                    }).then(function (response) {
                        var result = response.content;
                        _this.isAuthenticating = false;
                        //alert("Result :" + result);
                        var resData = _this.xmlToJson(result);
                        if (resData['results']['faultcode'] === 1 || resData['results']['faultcode'] === '1') {
                            Toast.makeText("New password has been created and sent successfully to your email account.", "long").show();
                            //this.router.navigate(["/"],{ clearHistory: true });
                            _this.routerExtensions.navigate(["/"], { clearHistory: true });
                        }
                        else {
                            alert("Result :" + JSON.stringify(resData));
                        }
                    }).catch(function (err) {
                        alert("Error occurred :" + JSON.stringify(err.stack));
                        _this.isAuthenticating = false;
                    });
                }
            }
        });
    };
    LoginComponent.prototype.registerPage = function () {
        //this.router.navigate(["register"]);
        this.routerExtensions.navigate(["/register"]);
    };
    LoginComponent.prototype.testcall = function () {
        alert("debug123");
    };
    LoginComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    __decorate([
        core_1.ViewChild("password"), 
        __metadata('design:type', (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object)
    ], LoginComponent.prototype, "password", void 0);
    __decorate([
        core_1.ViewChild("uname"), 
        __metadata('design:type', (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object)
    ], LoginComponent.prototype, "uname", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "b2c-login",
            templateUrl: "login.component.html",
            styleUrls: ["login.component.css"]
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _c) || Object, (typeof (_d = typeof page_1.Page !== 'undefined' && page_1.Page) === 'function' && _d) || Object, (typeof (_e = typeof router_2.RouterExtensions !== 'undefined' && router_2.RouterExtensions) === 'function' && _e) || Object, (typeof (_f = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _f) || Object, xmltojson_service_1.XmltojsonService])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c, _d, _e, _f;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map