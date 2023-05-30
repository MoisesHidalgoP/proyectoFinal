import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarClasificacionComponent } from './editar-clasificacion.component';

describe('EditarClasificacionComponent', () => {
  let component: EditarClasificacionComponent;
  let fixture: ComponentFixture<EditarClasificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarClasificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
