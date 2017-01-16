import { Component, ChangeDetectorRef, ChangeDetectionStrategy, NgZone, OnInit, ViewChild, ElementRef, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { Router } from "@angular/router";
import { RouterExtensions } from 'nativescript-angular/router';
import { Observable, BehaviorSubject } from "rxjs/Rx";
import { Page } from "ui/page";
import { request } from "http";
import * as appSettings from "application-settings";
import { XmltojsonService } from "../xmltojson.service";
import { Document, DocumentService } from "./shared";
import * as dialogs from "ui/dialogs";
let imagepicker = require("nativescript-imagepicker");

@Component({
    moduleId: module.id,
    selector: 'Mydocument',
    templateUrl: 'document.component.html',
    styleUrls: ["document.component.css"],
    providers: [DocumentService]
})
export class DocumentComponent implements OnInit, OnDestroy {
    public text: string = 'About Page';
    public isAuthenticating: boolean = false;
    items: BehaviorSubject<Array<Document>> = new BehaviorSubject([]);

    public allItems: Array<Document> = [];
    itemsArr = [];

    public constructor(private _changeDetectionRef: ChangeDetectorRef,
        private store: DocumentService,
        private router: Router,
        private page: Page,
        private routerExtensions: RouterExtensions,
        private zone: NgZone,
        private xmltojsonservice: XmltojsonService) {

    }
    @Output() loaded = new EventEmitter();

    ngOnInit() {

    }
    ngOnDestroy() {

    };
    load() {
        this.isAuthenticating = true;
        request({
            url: "https://sandbox.biz2services.com/mobapp/api/folder/",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ apiaction: 'getlistfilesfolders', userID: appSettings.getString("userID"), parentID: 0, parentName: '' })
        }).then(response => {
            let result = response.content;
            let resData = this.xmltojsonservice.xmlToJson(result);
            if (resData['results']['faultcode'] === 1 || resData['results']['faultcode'] === '1') {
                this.isAuthenticating = false;
                var listArray = resData['results']['DocLists']["DocList"];
                for (let entry of listArray) {
                    this.allItems.push(
                        new Document(
                            entry.id,
                            entry.name
                        )
                    );
                    this.publishUpdates();
                }
            }
            else {
                alert("Result :" + JSON.stringify(resData));
            }
        }).catch(err => {
            alert("Error occurred :" + JSON.stringify(err.stack));
        });
    }
    public onItemTap(args) {
        alert("------------------------ ItemTapped: " + args.index);
    }
    private publishUpdates() {
        // Make sure all updates are published inside NgZone so that change detection is triggered if needed
        this.zone.run(() => {
            // must emit a *new* value (immutability!)
            this.items.next([...this.allItems]);
        });
    }

    private handleErrors(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
     
     private onTapNewFolder()
     {
        dialogs.prompt({
            title: "New Folder",
            okButtonText: "Create",
            cancelButtonText: "Cancel",
            defaultText: "",
            inputType: dialogs.inputType.text
        }).then(function (r) {
            alert("Dialog result: " + r.result + ", text: " + r.text);
        });
     }

     private onTapNewFile()
     {
         dialogs.action({
            message: "Add File",
            cancelButtonText: "Cancel",
            actions: ["Use Gallery"]
        }).then(result => {
            if (result == "Use Gallery") {
                this.onSelectSingleTap();
            }
        });
     }
     onSelectMultipleTap() {
        let context = imagepicker.create({
            mode: "multiple"
        });
        this.startSelection(context);
    }

    onSelectSingleTap() {
        let context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    }

    startSelection(context) {
        context
            .authorize()
            .then(() => {
                this.itemsArr = [];
                return context.present();
            })
            .then((selection) => {
                console.log("Selection done:");
                selection.forEach(function(selected) {
                    console.log("----------------");
                    alert("uri: " + selected.uri);
                    alert("fileUri: " + selected.fileUri);
                });
                this.itemsArr = selection;
                this._changeDetectionRef.detectChanges();
            }).catch(function (e) {
                console.log(e);
            });
    }
     
}
