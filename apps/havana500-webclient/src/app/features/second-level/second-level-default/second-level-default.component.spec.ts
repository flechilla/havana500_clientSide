import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondLevelDefaultComponent } from './second-level-default.component';

describe('SecondLevelDeafultComponent', () => {
  let component: SecondLevelDefaultComponent;
  let fixture: ComponentFixture<SecondLevelDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SecondLevelDefaultComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondLevelDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
