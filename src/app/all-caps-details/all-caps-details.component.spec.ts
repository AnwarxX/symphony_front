import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCAPSDetailsComponent } from './all-caps-details.component';

describe('AllCAPSDetailsComponent', () => {
  let component: AllCAPSDetailsComponent;
  let fixture: ComponentFixture<AllCAPSDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCAPSDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCAPSDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
