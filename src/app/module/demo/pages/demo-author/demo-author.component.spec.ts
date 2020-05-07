import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAuthorComponent } from './demo-author.component';

describe('AuthorComponent', () => {
  let component: DemoAuthorComponent;
  let fixture: ComponentFixture<DemoAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DemoAuthorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
