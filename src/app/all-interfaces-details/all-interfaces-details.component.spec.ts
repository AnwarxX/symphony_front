import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInterfacesDetailsComponent } from './all-interfaces-details.component';

describe('AllInterfacesDetailsComponent', () => {
  let component: AllInterfacesDetailsComponent;
  let fixture: ComponentFixture<AllInterfacesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllInterfacesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInterfacesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
