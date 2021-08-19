import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCobrosComponent } from './add-cobros.component';

describe('AddCobrosComponent', () => {
  let component: AddCobrosComponent;
  let fixture: ComponentFixture<AddCobrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCobrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
