import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { DataService } from '../services/data.service';
import { MockDataService } from '../services/mock-data.service';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      imports: [HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatFormFieldModule]
    })
    //Override component's own provider
    .overrideComponent(CheckoutComponent, {
      set: {
        providers: [
          { provide: DataService, useClass: MockDataService }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('should validate email field', () => {
    let itemfirstName = component.userForm.controls["firstName"];
    itemfirstName.setValue("Media");
    let itemLasttName = component.userForm.controls["lastName"];
    itemLasttName.setValue("institutet");
    let itemEmailName = component.userForm.controls["email"];
    itemEmailName.setValue("Media@institutet.com");
    let itemConfirmEmail = component.userForm.controls["confirmEmail"];
    itemConfirmEmail.setValue("Media@institutet.com");
    let itempaymentMethod = component.userForm.controls["paymentMethod"];
    itempaymentMethod.setValue("Paypal");
    let itemStreet = component.userForm.controls["street"];
    itemStreet.setValue("Tulegatan 41");
    let itemCity = component.userForm.controls["city"];
    itemCity.setValue("Stockholm");
    let itemPostCode = component.userForm.controls["postcode"];
    itemPostCode.setValue("12345");
    let itemphoneNumber = component.userForm.controls["phoneNumber"];
    itemphoneNumber.setValue("1234567");

    expect(component.userForm.valid).toBeTruthy();
    expect(component.userForm.controls["firstName"].valid).toBeTruthy;
    expect(component.userForm.controls["lastName"].valid).toBeTruthy;
    expect(component.userForm.controls["postcode"].valid).toBeTruthy;
    expect(component.userForm.controls["phoneNumber"].valid).toBeTruthy;
  });

  it(`Should add a new phone number field`, () => {
  expect(component.phoneNumbers.length).toBe(1);
     component.addPhoneNumber();
     expect(component.phoneNumbers.length).toBe(2);
  });

  it(`Should caluculate total cost`, () => {
    expect(component.cartItems.length).toBe(2);
    // caluculateCost is in ngOnInit so writing component.caluculateCost() is not necessary;
    expect(component.totalCost).toBe(328);

  });

});
