import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpDeskProfileComponent } from './help-desk-profile.component';

describe('HelpDeskProfileComponent', () => {
  let component: HelpDeskProfileComponent;
  let fixture: ComponentFixture<HelpDeskProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpDeskProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpDeskProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
