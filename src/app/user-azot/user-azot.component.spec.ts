import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAzotComponent } from './user-azot.component';

describe('UserAzotComponent', () => {
  let component: UserAzotComponent;
  let fixture: ComponentFixture<UserAzotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAzotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAzotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
