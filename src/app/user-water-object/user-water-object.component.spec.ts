import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWaterObjectComponent } from './user-water-object.component';

describe('UserWaterObjectComponent', () => {
  let component: UserWaterObjectComponent;
  let fixture: ComponentFixture<UserWaterObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWaterObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWaterObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
