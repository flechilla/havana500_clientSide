import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'arrow',
  templateUrl: 'arrow.component.html',
  styleUrls: ['arrow.component.scss']
})
export class ArrowComponent {
  @Input()
  dir: string;

  @Input()
  disabled: boolean = true;

  @Output()
  click: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  onClick() {
    if (!this.disabled) this.click.emit();
  }
}
