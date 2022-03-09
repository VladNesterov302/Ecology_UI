import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWaterObjectBigPredictionComponent } from './user-water-object-big-prediction.component';

describe('UserWaterObjectBigPredictionComponent', () => {
  let component: UserWaterObjectBigPredictionComponent;
  let fixture: ComponentFixture<UserWaterObjectBigPredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWaterObjectBigPredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWaterObjectBigPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
