import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBioOxygenComponent } from './user-bio-oxygen.component';

describe('UserBioOxygenComponent', () => {
  let component: UserBioOxygenComponent;
  let fixture: ComponentFixture<UserBioOxygenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBioOxygenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBioOxygenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
