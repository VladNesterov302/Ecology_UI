import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOzonComponent } from './user-ozon.component';

describe('UserOzonComponent', () => {
  let component: UserOzonComponent;
  let fixture: ComponentFixture<UserOzonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOzonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOzonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
