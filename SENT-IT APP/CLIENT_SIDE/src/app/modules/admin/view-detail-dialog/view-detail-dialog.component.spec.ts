import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailDialogComponent } from './view-detail-dialog.component';

describe('ViewDetailDialogComponent', () => {
  let component: ViewDetailDialogComponent;
  let fixture: ComponentFixture<ViewDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
