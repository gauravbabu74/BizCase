import { Component, ChangeDetectionStrategy , OnInit } from '@angular/core';
import { Page } from "ui/page";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

@Component({
  moduleId: module.id,
  selector: "ns-register",
  templateUrl: "register.component.html",
  styleUrls: ["register.component.css"]
})

export class RegisterComponent implements OnInit  {
    public selectedIndex = 1;
    public itemsAmount: Array<string>;
    public itemsTimes: Array<string>;
    public itemsRev: Array<string>;
    public itemsCS: Array<string>;
    
    public constructor(private page: Page) {
        this.itemsAmount = [];

        this.itemsAmount.push("Less than $15,000");
        this.itemsAmount.push("$15,000 - $29,999");
        this.itemsAmount.push("$30,000 - $44,999");
        this.itemsAmount.push("$45,000 - $74,999");
        this.itemsAmount.push("$75,000 - $149,999");
        this.itemsAmount.push("$150,000 - $300,000");
        this.itemsAmount.push("More than $300,000");

        this.itemsTimes = [];
        this.itemsTimes.push("0 - 6 months");
        this.itemsTimes.push("7 - 12 months");
        this.itemsTimes.push("1 - 2 years");
        this.itemsTimes.push("2 - 5 years");
        this.itemsTimes.push("5+ years");

        this.itemsRev = [];
        this.itemsRev.push("Less than $50,000");
        this.itemsRev.push("$50,000 - $99,999");
        this.itemsRev.push("$100,000 - $149,999");
        this.itemsRev.push("$150,000 - $299,999");
        this.itemsRev.push("$300,000 - $499,999");
        this.itemsRev.push("$500,000 - $999,999");
        this.itemsRev.push("$1 million - $5 million");
        this.itemsRev.push("More than $5 million");

        this.itemsCS = [];
        this.itemsCS.push("Excellent (720+)");
        this.itemsCS.push("Good (660-720)");
        this.itemsCS.push("Fair (600-659)");
        this.itemsCS.push("Average (550-599)");
        this.itemsCS.push("Poor (&lt;550)");

    }
    ngOnInit() {
        this.page.actionBarHidden = true;
    }
    public onchange(args: SelectedIndexChangedEventData) {
        console.log('Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}');
    }

    public onopen() {
        console.log("Drop Down opened.");
    }
    registerSubmit() {
        alert("registerSubmit Call");
    }
}