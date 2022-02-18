import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChemicalOxygenComponent } from './user-chemical-oxygen.component';

describe('UserChemicalOxygenComponent', () => {
  let component: UserChemicalOxygenComponent;
  let fixture: ComponentFixture<UserChemicalOxygenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChemicalOxygenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChemicalOxygenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
