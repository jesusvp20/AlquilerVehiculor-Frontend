import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoCreateComponent } from './dialogo-create.component';

describe('DialogoCreateComponent', () => {
  let component: DialogoCreateComponent;
  let fixture: ComponentFixture<DialogoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
