import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCitySmallPredictionComponent } from './user-city-small-prediction.component';

describe('UserCitySmallPredictionComponent', () => {
  let component: UserCitySmallPredictionComponent;
  let fixture: ComponentFixture<UserCitySmallPredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCitySmallPredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCitySmallPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
