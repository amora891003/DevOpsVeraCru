import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturaChequeComponent } from './lectura-cheque.component';

describe('LecturaChequeComponent', () => {
  let component: LecturaChequeComponent;
  let fixture: ComponentFixture<LecturaChequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturaChequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturaChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
