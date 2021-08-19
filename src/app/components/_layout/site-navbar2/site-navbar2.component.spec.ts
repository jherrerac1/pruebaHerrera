import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteNavbar2Component } from './site-navbar2.component';

describe('SiteNavbar2Component', () => {
  let component: SiteNavbar2Component;
  let fixture: ComponentFixture<SiteNavbar2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteNavbar2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteNavbar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
