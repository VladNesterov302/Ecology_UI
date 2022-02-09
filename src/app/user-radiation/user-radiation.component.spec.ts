import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRadiationComponent } from './user-radiation.component';

describe('UserRadiationComponent', () => {
  let component: UserRadiationComponent;
  let fixture: ComponentFixture<UserRadiationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRadiationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRadiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
