import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapsInterfaceComponent } from './caps-interface.component';

describe('CapsInterfaceComponent', () => {
  let component: CapsInterfaceComponent;
  let fixture: ComponentFixture<CapsInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapsInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapsInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
