import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercelsComponent } from './percels.component';

describe('PercelsComponent', () => {
  let component: PercelsComponent;
  let fixture: ComponentFixture<PercelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
