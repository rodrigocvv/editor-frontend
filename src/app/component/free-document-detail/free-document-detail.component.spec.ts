import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeDocumentDetailComponent } from './free-document-detail.component';

describe('FreeDocumentDetailComponent', () => {
  let component: FreeDocumentDetailComponent;
  let fixture: ComponentFixture<FreeDocumentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeDocumentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeDocumentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
