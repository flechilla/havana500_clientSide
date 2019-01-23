import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserProfileAfterCreationComponent } from './update-user-profile-after-creation.component';

describe('UpdateUserProfileAfterCreationComponent', () => {
  let component: UpdateUserProfileAfterCreationComponent;
  let fixture: ComponentFixture<UpdateUserProfileAfterCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUserProfileAfterCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserProfileAfterCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
