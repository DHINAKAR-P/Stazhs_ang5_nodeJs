import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailurealertComponent } from './failurealert.component';

describe('FailurealertComponent', () => {
  let component: FailurealertComponent;
  let fixture: ComponentFixture<FailurealertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailurealertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailurealertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
