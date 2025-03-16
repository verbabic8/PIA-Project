import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerMeniComponent } from './owner-meni.component';

describe('OwnerMeniComponent', () => {
  let component: OwnerMeniComponent;
  let fixture: ComponentFixture<OwnerMeniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerMeniComponent]
    });
    fixture = TestBed.createComponent(OwnerMeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
