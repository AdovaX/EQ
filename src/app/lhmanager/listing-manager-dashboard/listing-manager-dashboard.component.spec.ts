import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingManagerDashboardComponent } from './listing-manager-dashboard.component';

describe('ListingManagerDashboardComponent', () => {
  let component: ListingManagerDashboardComponent;
  let fixture: ComponentFixture<ListingManagerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingManagerDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingManagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
