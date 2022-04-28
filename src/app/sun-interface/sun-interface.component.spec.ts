import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunInterfaceComponent } from './sun-interface.component';

describe('NewInterfaceComponent', () => {
  let component: SunInterfaceComponent;
  let fixture: ComponentFixture<SunInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SunInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SunInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
