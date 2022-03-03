import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInterfacesComponent } from './all-interfaces.component';

describe('AllInterfacesComponent', () => {
  let component: AllInterfacesComponent;
  let fixture: ComponentFixture<AllInterfacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllInterfacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
