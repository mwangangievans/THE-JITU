import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotworkingComponent } from './notworking.component';

describe('NotworkingComponent', () => {
  let component: NotworkingComponent;
  let fixture: ComponentFixture<NotworkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotworkingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotworkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
