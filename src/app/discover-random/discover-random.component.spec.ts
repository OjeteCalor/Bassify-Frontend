import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverRandomComponent } from './discover-random.component';

describe('DiscoverRandomComponent', () => {
  let component: DiscoverRandomComponent;
  let fixture: ComponentFixture<DiscoverRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscoverRandomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoverRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
