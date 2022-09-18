import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParcelComponent } from './update-parcel.component';

describe('UpdateParcelComponent', () => {
  let component: UpdateParcelComponent;
  let fixture: ComponentFixture<UpdateParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateParcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
