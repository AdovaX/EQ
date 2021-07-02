import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSpocComponent } from './create-spoc.component';

describe('CreateSpocComponent', () => {
  let component: CreateSpocComponent;
  let fixture: ComponentFixture<CreateSpocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSpocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSpocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
