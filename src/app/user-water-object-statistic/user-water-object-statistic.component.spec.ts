import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWaterObjectStatisticComponent } from './user-water-object-statistic.component';

describe('UserWaterObjectStatisticComponent', () => {
  let component: UserWaterObjectStatisticComponent;
  let fixture: ComponentFixture<UserWaterObjectStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWaterObjectStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWaterObjectStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
