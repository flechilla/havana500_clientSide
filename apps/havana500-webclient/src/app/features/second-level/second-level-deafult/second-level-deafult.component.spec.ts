import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondLevelDeafultComponent } from './second-level-deafult.component';

describe('SecondLevelDeafultComponent', () => {
  let component: SecondLevelDeafultComponent;
  let fixture: ComponentFixture<SecondLevelDeafultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondLevelDeafultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondLevelDeafultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
