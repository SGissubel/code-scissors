import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserDetailComponent } from './dashboard-user-detail.component';

describe('DashboardUserDetailComponent', () => {
  let component: DashboardUserDetailComponent;
  let fixture: ComponentFixture<DashboardUserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardUserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
