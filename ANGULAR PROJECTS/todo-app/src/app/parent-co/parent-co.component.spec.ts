import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentCoComponent } from './parent-co.component';

describe('ParentCoComponent', () => {
  let component: ParentCoComponent;
  let fixture: ComponentFixture<ParentCoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentCoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentCoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
