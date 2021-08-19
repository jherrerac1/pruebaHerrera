import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarContratosComponent } from './listar-contratos.component';

describe('ListarContratosComponent', () => {
  let component: ListarContratosComponent;
  let fixture: ComponentFixture<ListarContratosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarContratosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
