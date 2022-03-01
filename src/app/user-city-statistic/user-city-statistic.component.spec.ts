import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCityStatisticComponent } from './user-city-statistic.component';

describe('UserCityStatisticComponent', () => {
  let component: UserCityStatisticComponent;
  let fixture: ComponentFixture<UserCityStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCityStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCityStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
