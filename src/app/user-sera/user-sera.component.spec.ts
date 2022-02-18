import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSeraComponent } from './user-sera.component';

describe('UserSeraComponent', () => {
  let component: UserSeraComponent;
  let fixture: ComponentFixture<UserSeraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSeraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
