import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoApiExampleComponent } from './demo-api-example.component';

describe('DemoApiExampleComponent', () => {
  let component: DemoApiExampleComponent;
  let fixture: ComponentFixture<DemoApiExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DemoApiExampleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoApiExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
