import { Component, ChangeDetectionStrategy, NgZone, OnInit, OnDestroy } from '@angular/core';
import * as connectivity from "connectivity";
import * as application from 'application';

@Component({
  selector: "ns-main",
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent implements OnInit, OnDestroy{
    
    public connectionType: string;
    public constructor(private zone: NgZone) {
        alert('ngOnInitApp');
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
        alert('ngOnInitApp');
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
        alert('ngOnDestroyApp');
    }

}
