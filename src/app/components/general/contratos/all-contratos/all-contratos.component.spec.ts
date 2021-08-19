import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContratosComponent } from './all-contratos.component';

describe('AllContratosComponent', () => {
  let component: AllContratosComponent;
  let fixture: ComponentFixture<AllContratosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllContratosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
