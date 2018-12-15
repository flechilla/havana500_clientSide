import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AntTranslateService } from '@hav500workspace/shared';

@Component({
  selector: 'hav-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnDestroy(): void {}

  ngOnInit() {}
}
