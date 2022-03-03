import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SympDbComponent } from './symp-db.component';

describe('SympDbComponent', () => {
  let component: SympDbComponent;
  let fixture: ComponentFixture<SympDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SympDbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SympDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
