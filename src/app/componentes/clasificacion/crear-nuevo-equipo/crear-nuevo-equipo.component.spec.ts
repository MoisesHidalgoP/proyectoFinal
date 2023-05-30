import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNuevoEquipoComponent } from './crear-nuevo-equipo.component';

describe('CrearNuevoEquipoComponent', () => {
  let component: CrearNuevoEquipoComponent;
  let fixture: ComponentFixture<CrearNuevoEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearNuevoEquipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearNuevoEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
