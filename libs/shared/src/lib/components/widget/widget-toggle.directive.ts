import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[antWidgetToggle]'
})
export class AntWidgetToggleDirective implements OnInit, AfterViewInit
{

    constructor(public el: ElementRef)
    {
    }

    ngOnInit()
    {
    }

    ngAfterViewInit()
    {
    }

}
