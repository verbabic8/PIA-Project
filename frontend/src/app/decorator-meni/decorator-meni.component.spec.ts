import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorMeniComponent } from './decorator-meni.component';

describe('DecoratorMeniComponent', () => {
  let component: DecoratorMeniComponent;
  let fixture: ComponentFixture<DecoratorMeniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecoratorMeniComponent]
    });
    fixture = TestBed.createComponent(DecoratorMeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
