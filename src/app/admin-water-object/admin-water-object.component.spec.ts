import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWaterObjectComponent } from './admin-water-object.component';

describe('AdminWaterObjectComponent', () => {
  let component: AdminWaterObjectComponent;
  let fixture: ComponentFixture<AdminWaterObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWaterObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWaterObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
