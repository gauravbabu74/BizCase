import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Page } from "ui/page";
import * as dialogs from "ui/dialogs";
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'home',
  templateUrl: 'modules/home/home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent {
  text: string = 'Home Page';
   public itemsAmount: Array<string>;
   public constructor(private page: Page,
   private routerExtensions: RouterExtensions,) {
    this.itemsAmount = [];

        this.itemsAmount.push("Less than $15,000");
        this.itemsAmount.push("$15,000 - $29,999");
        this.itemsAmount.push("$30,000 - $44,999");
        this.itemsAmount.push("$45,000 - $74,999");
        this.itemsAmount.push("$75,000 - $149,999");
        this.itemsAmount.push("$150,000 - $300,000");
        this.itemsAmount.push("More than $300,000");
   }
    public profileAction()
    {
        dialogs.action({
            message: "User Menu",
            cancelButtonText: "Cancel",
            actions: ["My Account", "Logout"]
        }).then(result => {
            if(result == "Logout")
            {
                this.routerExtensions.navigate(["/logout"]);
            }
            else if(result == "My Account")
            {
                this.routerExtensions.navigate(["/myaccount"]);
            }
        });
    }
    
}
