import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ant-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class AntToolbarComponent implements OnInit {
  @Output()
  public toggleSideNav: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public toggleSNav() {
    this.toggleSideNav.emit();
  }
}
