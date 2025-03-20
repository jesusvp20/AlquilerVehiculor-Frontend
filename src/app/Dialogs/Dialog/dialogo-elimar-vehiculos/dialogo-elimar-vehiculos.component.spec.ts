import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoElimarVehiculosComponent } from './dialogo-elimar-vehiculos.component';

describe('DialogoElimarVehiculosComponent', () => {
  let component: DialogoElimarVehiculosComponent;
  let fixture: ComponentFixture<DialogoElimarVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoElimarVehiculosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoElimarVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
