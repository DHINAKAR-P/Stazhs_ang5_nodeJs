import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncServiceComponent } from './sync-service.component';

describe('SyncServiceComponent', () => {
  let component: SyncServiceComponent;
  let fixture: ComponentFixture<SyncServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyncServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
