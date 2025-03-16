import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmsInfoComponent } from './firms-info.component';

describe('FirmsInfoComponent', () => {
  let component: FirmsInfoComponent;
  let fixture: ComponentFixture<FirmsInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirmsInfoComponent]
    });
    fixture = TestBed.createComponent(FirmsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
