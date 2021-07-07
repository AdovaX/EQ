import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringManagerDashboardComponent } from './hiring-manager-dashboard.component';

describe('HiringManagerDashboardComponent', () => {
  let component: HiringManagerDashboardComponent;
  let fixture: ComponentFixture<HiringManagerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringManagerDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringManagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
