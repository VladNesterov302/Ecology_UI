import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWaterObjectSmallPredictionComponent } from './user-water-object-small-prediction.component';

describe('UserWaterObjectSmallPredictionComponent', () => {
  let component: UserWaterObjectSmallPredictionComponent;
  let fixture: ComponentFixture<UserWaterObjectSmallPredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWaterObjectSmallPredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWaterObjectSmallPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
