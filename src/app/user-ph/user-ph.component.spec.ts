import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPhComponent } from './user-ph.component';

describe('UserPhComponent', () => {
  let component: UserPhComponent;
  let fixture: ComponentFixture<UserPhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
