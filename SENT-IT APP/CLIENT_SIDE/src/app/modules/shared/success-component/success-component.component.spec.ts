import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessComponentComponent } from './success-component.component';

describe('SuccessComponentComponent', () => {
  let component: SuccessComponentComponent;
  let fixture: ComponentFixture<SuccessComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
