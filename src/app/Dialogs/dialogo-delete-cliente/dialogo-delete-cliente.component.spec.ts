import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoDeleteClienteComponent } from './dialogo-delete-cliente.component';

describe('DialogoDeleteClienteComponent', () => {
  let component: DialogoDeleteClienteComponent;
  let fixture: ComponentFixture<DialogoDeleteClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoDeleteClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoDeleteClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
