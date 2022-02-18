import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPmComponent } from './user-pm.component';

describe('UserPmComponent', () => {
  let component: UserPmComponent;
  let fixture: ComponentFixture<UserPmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
