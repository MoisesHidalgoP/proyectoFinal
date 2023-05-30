import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAsistenteComponent } from './nuevo-asistente.component';

describe('NuevoAsistenteComponent', () => {
  let component: NuevoAsistenteComponent;
  let fixture: ComponentFixture<NuevoAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoAsistenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
