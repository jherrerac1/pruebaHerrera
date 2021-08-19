import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCobrosComponent } from './update-cobros.component';

describe('UpdateCobrosComponent', () => {
  let component: UpdateCobrosComponent;
  let fixture: ComponentFixture<UpdateCobrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCobrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
