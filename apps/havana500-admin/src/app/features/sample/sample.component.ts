import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sample',
  templateUrl: 'sample.component.html',
  styles: [
    `
      .main {
        padding: 1rem 3rem;
      }
    `
  ]
})
export class SampleComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
