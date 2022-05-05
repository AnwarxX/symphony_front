import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceDefinitionComponent } from './interface-definition.component';

describe('InterfaceDefinitionComponent', () => {
  let component: InterfaceDefinitionComponent;
  let fixture: ComponentFixture<InterfaceDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfaceDefinitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
