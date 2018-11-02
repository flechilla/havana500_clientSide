import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'dots',
  templateUrl: 'dots.component.html',
  styleUrls: ['dots.component.scss']
})
export class DotsComponent implements OnInit {
  numbers: Array<number>;

  @Input('active-dot')
  activeDot: number = 0;
  @Input('dots-count')
  dotsCount: number;

  @HostBinding('class')
  @Input()
  position: string = 'flex-center';

  @Output('on-click')
  onClick: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {
    this.numbers = Array(this.dotsCount)
      .fill(0)
      .map((x, i) => i);
  }

  click(index: any) {
    this.onClick.emit(index);
    this.activeDot = index;
  }
}
