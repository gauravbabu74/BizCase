import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import * as appSettings from "application-settings";
import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "logout.component.html"
})
export class LogoutComponent implements OnInit {

    public constructor(private router: Router) {

    }
    ngOnInit() {

        let loginStatus = appSettings.getBoolean("isLogin");
        if (loginStatus === true) {
            appSettings.setBoolean("isLogin", false);
            this.router.navigate(["/"]);

        }
    }

}
