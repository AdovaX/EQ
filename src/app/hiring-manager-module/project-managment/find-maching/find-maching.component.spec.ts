import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindMachingComponent } from './find-maching.component';

describe('FindMachingComponent', () => {
  let component: FindMachingComponent;
  let fixture: ComponentFixture<FindMachingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindMachingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindMachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
