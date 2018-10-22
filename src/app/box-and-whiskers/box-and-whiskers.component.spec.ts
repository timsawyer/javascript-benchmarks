import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxAndWhiskersComponent } from './box-and-whiskers.component';

describe('BoxAndWhiskersComponent', () => {
  let component: BoxAndWhiskersComponent;
  let fixture: ComponentFixture<BoxAndWhiskersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxAndWhiskersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxAndWhiskersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
