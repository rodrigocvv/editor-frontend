import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeDocumentEntryComponent } from './free-document-entry.component';

describe('FreeDocumentEntryComponent', () => {
  let component: FreeDocumentEntryComponent;
  let fixture: ComponentFixture<FreeDocumentEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeDocumentEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeDocumentEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
