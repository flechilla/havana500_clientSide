import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSummayMostImportantComponent } from './article-summay-most-important.component';

describe('ArticleSummayMostImportantComponent', () => {
  let component: ArticleSummayMostImportantComponent;
  let fixture: ComponentFixture<ArticleSummayMostImportantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleSummayMostImportantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSummayMostImportantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
