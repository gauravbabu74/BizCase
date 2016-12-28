import { Component, ChangeDetectionStrategy, NgZone, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { RouterExtensions } from 'nativescript-angular/router';
import { isAndroid, isIOS, device, screen } from "platform";
import { connectionType, getConnectionType } from "connectivity";
import { request } from "http";
import { Page } from "ui/page";
import { View } from "ui/core/view";
import * as dialogs from "ui/dialogs";
import * as XmlObjects from "nativescript-xmlobjects";
import * as appSettings from "application-settings";
import { TextField } from "ui/text-field";
import * as Toast from 'nativescript-toast';
import * as connectivity from "connectivity";
import "rxjs/Rx";

@Component({
    moduleId: module.id,
    selector: "b2c-login",
    templateUrl: "login.component.html",
    styleUrls: ["login.component.css"]
})

export class LoginComponent implements OnInit, OnDestroy {

    public username: string = "";
    public isLogin: boolean = false;
    public isAuthenticating: boolean = false;
    public pass: string = "";
    public deviceToken: string = "APA91bFuXV0ZSvWmJJjLiNDNDrPJkAaeZ39cgGHf4jZiv_MMndzkn3m5ZXB1mkyNz5lJtQPCvUQ0VjnMpVVzjuVAA8PRotP-ZnWO-_fzvVNUvk2LNw2e5vbCxxO37tG4SLsHO5HhihAS-wPpy3mrJFBnJ8l6UBVFWlmXLjtXMjh8bY3urp-IIT0";
    public deviceType: string = "simulator";
    public imageType: string = "none";
    public connectionType: string;
    

    @ViewChild("password") password: ElementRef;
    @ViewChild("uname") uname: ElementRef;

    public constructor(private router: Router,
        private page: Page ,
        private routerExtensions: RouterExtensions,
        private zone: NgZone) {
             let connectionType = connectivity.getConnectionType();
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

    ngOnInit() {
        //this.page.actionBarHidden = true;
        this.isLogin = appSettings.getBoolean("isLogin");
        if (this.isLogin === true) {
            this.router.navigate(["home"]);
        }
        if (isAndroid)
        {
            this.imageType ="aspectFit";
        }
        if (isIOS)
        {
            this.imageType ="aspectFit";
        }
        connectivity.startMonitoring((newConnectionType: number) => {
            this.zone.run(() => {
                switch (newConnectionType) {
                    case connectivity.connectionType.none:
                        this.connectionType = "None";
                        console.log("Connection type changed to none.");
                        break;
                    case connectivity.connectionType.wifi:
                        this.connectionType = "Wi-Fi";
                        console.log("Connection type changed to WiFi.");
                        break;
                    case connectivity.connectionType.mobile:
                        this.connectionType = "Mobile";
                        console.log("Connection type changed to mobile.");
                        break;
                    default:
                        break;
                }
            });
        });
    }
    ngOnDestroy() {
        // >> connectivity-stop-code
        connectivity.stopMonitoring();
        // << connectivity-stop-code
    }

    public validateUser() {
        let username = this.username;
        let password = this.pass;

        if (username === "") {
            let options = {
                title: "Notification",
                message: "Please enter your username.",
                okButtonText: "Ok",
                neutralButtonText: "Cancel"
            };
            dialogs.confirm(options).then((result: boolean) => {
                if (result === true) { this.uname.nativeElement.focus(); }
            });
            return;
        }
        if (password === "") {
            let options = {
                title: "Notification",
                message: "Please enter your password.",
                okButtonText: "Ok",
                neutralButtonText: "Cancel"
            };
            dialogs.confirm(options).then((result: boolean) => {
                if (result === true) { this.password.nativeElement.focus(); }
            });
            return;
        }
        if (getConnectionType() === connectionType.none) {
            let options = {
                title: "Notification",
                message: "No Active Connection Found.",
                okButtonText: "Retry",
                neutralButtonText: "Cancel"
            };
            dialogs.confirm(options).then((result: boolean) => {
                if (result === true) { this.validateUser(); }
            });
        }
        else {
            this.userLogin()
        }
    }
    public userLogin() {
        // >> post-request-http-module
        this.isAuthenticating = true;
        request({
            url: "https://sandbox.biz2services.com/mobapp3.0/api/user/",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ apiaction: 'userlogin', userID: this.username, password: this.pass, devicetoken: this.deviceToken, devicetype: this.deviceType })
        }).then(response => {
            
            let result = response.content;
            this.isAuthenticating = false;
            //alert("Result :" + result);
            let resData = this.xmlToJson(result);
            if (resData['results']['faultcode'] === 1 || resData['results']['faultcode'] === '1') {
                appSettings.setBoolean("isLogin", true);
                //this.router.navigate(["home"]);
                Toast.makeText("success.","long").show();
                this.routerExtensions.navigate(["/home"], { clearHistory: true });
            }
            else {
                alert("Result :" + JSON.stringify(resData));
            }

        }).catch(err => {
            alert("Error occurred :" + JSON.stringify(err.stack));
        });

        // << post-request-http-module
    }
    forgotPass() {
        let options = {
            title: "Forgot Password",
            message: "Enter the email address you used to register for Biz2Credit to reset your password.",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        };
        dialogs.prompt(options).then((result: dialogs.PromptResult) => {
            if(result.result === true){
                let forgotmail = result.text;
                if (forgotmail === "") {
                    let options = {
                        title: "Notification",
                        message: "Please enter your email!.",
                        okButtonText: "Ok",
                        neutralButtonText: "Cancel"
                    };
                    dialogs.confirm(options).then((result: boolean) => {
                        if (result === true) { 
                            this.forgotPass();
                        }
                    });
                    return;
                }
                if (!this.validateEmail(forgotmail)) {
                    let options = {
                        title: "Notification",
                        message: "Please enter a valid email address.",
                        okButtonText: "Ok",
                        neutralButtonText: "Cancel"
                    };
                    dialogs.confirm(options).then((result: boolean) => {
                        if (result === true) { this.forgotPass(); }
                    });
                    return;  
                }
                if (getConnectionType() === connectionType.none) {
                    let options = {
                        title: "Notification",
                        message: "No Active Connection Found.",
                        okButtonText: "Retry",
                        neutralButtonText: "Cancel"
                    };
                    dialogs.confirm(options).then((result: boolean) => {
                        if (result === true) { this.forgotPass(); }
                    });
                }
                else {
                    this.isAuthenticating = true;
                    request({
                        url: "https://sandbox.biz2services.com/mobapp3.0/api/user/",
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        content: JSON.stringify({ apiaction: 'forgotpassword', useremail: forgotmail })
                    }).then(response => {
                        let result = response.content;
                        this.isAuthenticating = false;
                        //alert("Result :" + result);
                        let resData = this.xmlToJson(result);
                        if (resData['results']['faultcode'] === 1 || resData['results']['faultcode'] === '1') {
                            Toast.makeText("New password has been created and sent successfully to your email account.","long").show();
                            //this.router.navigate(["/"],{ clearHistory: true });
                            this.routerExtensions.navigate(["/"], { clearHistory: true });
                        }
                        else {
                            alert("Result :" + JSON.stringify(resData));
                        }

                    }).catch(err => {
                        alert("Error occurred :" + JSON.stringify(err.stack));
                        this.isAuthenticating = false;
                    });
                }
            }
        });
    }
    registerPage() {
        //this.router.navigate(["register"]);
        this.routerExtensions.navigate(["/register"]);
    }
    testcall() {
        alert("debug123");
    }

    private xmlToJson(xml: string): any {
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
    public validateEmail(email)
    {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}