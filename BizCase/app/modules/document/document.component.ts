import { Component, ChangeDetectionStrategy, NgZone, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { Router } from "@angular/router";
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from "ui/page";

@Component({
  moduleId: module.id,
  selector: 'Mydocument',
  templateUrl: 'document.component.html',
  styleUrls: ["document.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentComponent implements OnInit, OnDestroy {
  text: string = 'About Page';
  public listArr: string[] = ['Class A','Class B','Class C','Class D','Class E','Class F','Class G','Class H','Class I','Class J','Class K','Class L','Class M','Class N','Class O','Class P','Class A','Class B','Class C','Class D','Class E','Class F','Class G','Class H','Class I','Class J','Class K','Class L','Class M','Class N','Class O','Class P','Class A','Class B','Class C','Class D','Class E','Class F','Class G','Class H','Class I','Class J','Class K','Class L','Class M','Class N','Class O','Class P','Class A','Class B','Class C','Class D','Class E','Class F','Class G','Class H','Class I','Class J','Class K','Class L','Class M','Class N','Class O','Class P','Class A','Class B','Class C','Class D','Class E','Class F','Class G','Class H','Class I','Class J','Class K','Class L','Class M','Class N','Class O','Class P','Class A','Class B','Class C','Class D','Class E','Class F','Class G','Class H','Class I','Class J','Class K','Class L','Class M','Class N','Class O','Class P'];

    public constructor(private router: Router,
    private page: Page ,
    private routerExtensions: RouterExtensions,
    private zone: NgZone) {
    
    }

    ngOnInit() {
        
         alert("ngOnInit");
    
    }
    ngOnDestroy() {
        alert("ngOnDestroy");

    }
}
