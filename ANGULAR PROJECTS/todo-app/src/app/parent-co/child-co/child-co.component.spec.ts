import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCoComponent } from './child-co.component';

describe('ChildCoComponent', () => {
  let component: ChildCoComponent;
  let fixture: ComponentFixture<ChildCoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildCoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildCoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
