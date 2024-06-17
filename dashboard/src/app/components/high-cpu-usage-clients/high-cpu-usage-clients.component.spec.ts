import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighCpuUsageClientsComponent } from './high-cpu-usage-clients.component';

describe('HighCpuUsageClientsComponent', () => {
  let component: HighCpuUsageClientsComponent;
  let fixture: ComponentFixture<HighCpuUsageClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighCpuUsageClientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighCpuUsageClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
