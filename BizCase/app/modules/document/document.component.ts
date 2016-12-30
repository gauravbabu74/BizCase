import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'Mydocument',
  templateUrl: 'modules/document/document.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentComponent {
  text: string = 'About Page';
  public listArr: string[] = ['Class A','Class B','Class C','Class D','Class E','Class F','Class G','Class H','Class I','Class J','Class K','Class L','Class M','Class N','Class O','Class P','Class A','Class B','Class C','Class D','Class E','Class F','Class G','Class H','Class I','Class J','Class K','Class L','Class M','Class N','Class O','Class P','Class A','Class B','Class C','Class D','Class E','Class F','Class G','Class H','Class I','Class J','Class K','Class L','Class M','Class N','Class O','Class P','Class A','Class B','Class C','Class D','Class E','Class F','Class G','Class H','Class I','Class J','Class K','Class L','Class M','Class N','Class O','Class P','Class A','Class B','Class C','Class D','Class E','Class F','Class G','Class H','Class I','Class J','Class K','Class L','Class M','Class N','Class O','Class P','Class A','Class B','Class C','Class D','Class E','Class F','Class G','Class H','Class I','Class J','Class K','Class L','Class M','Class N','Class O','Class P'];

}
