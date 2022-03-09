import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCityBigPredictionComponent } from './user-city-big-prediction.component';

describe('UserCityBigPredictionComponent', () => {
  let component: UserCityBigPredictionComponent;
  let fixture: ComponentFixture<UserCityBigPredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCityBigPredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCityBigPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
