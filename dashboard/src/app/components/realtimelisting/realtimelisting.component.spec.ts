import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimelistingComponent } from './realtimelisting.component';

describe('RealtimelistingComponent', () => {
  let component: RealtimelistingComponent;
  let fixture: ComponentFixture<RealtimelistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealtimelistingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealtimelistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
