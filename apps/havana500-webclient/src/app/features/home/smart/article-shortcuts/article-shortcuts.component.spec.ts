import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleShortcutsComponent } from './article-shortcuts.component';

describe('ArticleShortcutsComponent', () => {
  let component: ArticleShortcutsComponent;
  let fixture: ComponentFixture<ArticleShortcutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleShortcutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
