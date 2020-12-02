import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubforumlistComponent } from './subforumlist.component';

describe('SubforumlistComponent', () => {
  let component: SubforumlistComponent;
  let fixture: ComponentFixture<SubforumlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubforumlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubforumlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
