import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingDefinitionComponent } from './mapping-definition.component';

describe('MappingDefinitionComponent', () => {
  let component: MappingDefinitionComponent;
  let fixture: ComponentFixture<MappingDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappingDefinitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
