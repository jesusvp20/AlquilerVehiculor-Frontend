import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoCreateVehiculosComponent } from './dialogo-create-vehiculos.component';

describe('DialogoCreateVehiculosComponent', () => {
  let component: DialogoCreateVehiculosComponent;
  let fixture: ComponentFixture<DialogoCreateVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoCreateVehiculosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoCreateVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
