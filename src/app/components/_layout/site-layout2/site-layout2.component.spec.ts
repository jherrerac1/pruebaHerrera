import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLayout2Component } from './site-layout2.component';

describe('SiteLayout2Component', () => {
  let component: SiteLayout2Component;
  let fixture: ComponentFixture<SiteLayout2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteLayout2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteLayout2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
