import {
  AfterContentChecked,
  Directive,
  ElementRef,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[antIfOnDom]'
})
export class IfOnDomDirective implements AfterContentChecked {
  isCreated = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private element: ElementRef
  ) {}

  ngAfterContentChecked() {
    if (document.body.contains(this.element.nativeElement) && !this.isCreated) {
      setTimeout(() => {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }, 300);
      this.isCreated = true;
    } else if (
      this.isCreated &&
      !document.body.contains(this.element.nativeElement)
    ) {
      this.viewContainer.clear();
      this.isCreated = false;
    }
  }
}
