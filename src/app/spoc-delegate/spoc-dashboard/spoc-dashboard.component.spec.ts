import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpocDashboardComponent } from './spoc-dashboard.component';

describe('SpocDashboardComponent', () => {
  let component: SpocDashboardComponent;
  let fixture: ComponentFixture<SpocDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpocDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpocDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
