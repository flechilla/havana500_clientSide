import { Component, OnInit } from '@angular/core';
import { BaseTableContainerComponent } from '../../../shared/components/base-table-container.component';
import { MarketingContent, Picture } from '@hav500workspace/shared';

@Component({
  selector: 'admin-marketing-home',
  templateUrl: 'marketing-home.component.html',
  styleUrls: ['marketing-home.component.scss']
})
export class MarketingHomeComponent
  extends BaseTableContainerComponent<Picture>
  implements OnInit {
  constructor() {
    super([], null);
  }

  ngOnInit() {}
}
