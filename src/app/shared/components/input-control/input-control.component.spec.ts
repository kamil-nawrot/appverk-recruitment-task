import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputControlComponent } from './input-control.component';
import { FormControlName, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { forwardRef } from '@angular/core';

describe('InputControlComponent', () => {
  let component: InputControlComponent;
  let fixture: ComponentFixture<InputControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputControlComponent, ReactiveFormsModule, FormsModule],
      declarations: [],
      providers: [
        { provide: FormControlName, useValue: FormControlName },
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputControlComponent), multi: true },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputControlComponent);
    component = fixture.componentInstance;
    fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
