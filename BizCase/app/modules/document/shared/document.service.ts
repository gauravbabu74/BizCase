import { Injectable, NgZone } from "@angular/core";
import { Http, Headers, Response, ResponseOptions } from "@angular/http";
import { Observable, BehaviorSubject } from "rxjs/Rx";
import "rxjs/add/operator/map";
import { Document } from "./document.model";
import { request } from "http";
import * as appSettings from "application-settings";
import { XmltojsonService } from "../../xmltojson.service";

@Injectable()
export class DocumentService {
  items: BehaviorSubject<Array<Document>> = new BehaviorSubject([]);

  public allItems: Array<Document> = [];

  constructor(private zone: NgZone,
  private xmltojsonservice: XmltojsonService) { }

  load() {
       request({
                url: "https://sandbox.biz2services.com/mobapp/api/folder/",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({ apiaction: 'getlistfilesfolders', userID: appSettings.getString("userID"), parentID: 0, parentName: ''})
            }).then(response => {
                let result = response.content;
                let resData = this.xmltojsonservice.xmlToJson(result);
                if (resData['results']['faultcode'] === 1 || resData['results']['faultcode'] === '1') {
                    alert("Result :" + JSON.stringify(resData));
                    var listArray = resData['results']['DocLists']["DocList"];
                    for (let entry of listArray) {
                        this.allItems.push(
                            new Document(
                                entry.Id,
                                entry.Name
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
}