import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteHeader2Component } from './site-header2.component';

describe('SiteHeader2Component', () => {
  let component: SiteHeader2Component;
  let fixture: ComponentFixture<SiteHeader2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteHeader2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteHeader2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
