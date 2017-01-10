import { Component, ChangeDetectionStrategy, NgZone, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { Router } from "@angular/router";
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from "ui/page";
import { request } from "http";
import * as appSettings from "application-settings";
import { XmltojsonService } from "../xmltojson.service";

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
  moduleId: module.id,
  selector: 'Mydocument',
  templateUrl: 'document.component.html',
  styleUrls: ["document.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentComponent implements OnInit, OnDestroy {
    public text: string = 'About Page';
    public listArr: string[] = [];

    public constructor(private router: Router,
    private page: Page ,
    private routerExtensions: RouterExtensions,
    private zone: NgZone,
    private xmltojsonservice: XmltojsonService) {
    
    }
    ngOnInit() {
        this.zone.run(() => {
            request({
                url: "https://sandbox.biz2services.com/mobapp/api/folder/",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({ apiaction: 'getlistfilesfolders', userID: appSettings.getString("userID"), parentID: 0, parentName: ''})
            }).then(response => {
                let result = response.content;
                let resData = this.xmltojsonservice.xmlToJson(result);
                if (resData['results']['faultcode'] === 1 || resData['results']['faultcode'] === '1') {
                    var listArray = resData['results']['DocLists']["DocList"];
                    for (let entry of listArray) {
                        this.listArr.push(new DataItem(entry.id , entry.name));
                    }
                }
                else {
                    alert("Result :" + JSON.stringify(resData));
                }
            }).catch(err => {
                alert("Error occurred :" + JSON.stringify(err.stack));
            }); 
        }    
    }
    ngOnDestroy() {
        alert("ngOnDestroy");

    }
    public onItemTap(args) {
        alert("------------------------ ItemTapped: " + args.index);
    }
}
