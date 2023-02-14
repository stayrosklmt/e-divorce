import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaryComponent } from './notary.component';

describe('NotaryComponent', () => {
  let component: NotaryComponent;
  let fixture: ComponentFixture<NotaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
