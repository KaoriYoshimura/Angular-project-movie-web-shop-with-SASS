import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmComponent } from './confirm.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { MockDataService } from '../services/mock-data.service';

describe('ConfirmComponent', () => {
  let component: ConfirmComponent;
  let fixture: ComponentFixture<ConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmComponent ],
      imports: [HttpClientModule, RouterTestingModule]
    })
    //Override component's own provider to test with MockData.service
    .overrideComponent(ConfirmComponent, {
      set: {
        providers: [
          { provide: DataService, useClass: MockDataService }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Should show user info`, () => {
    // getUserData() function is in ngOnInit
    expect(component.userData).toBeDefined();
    expect(component.userData.firstName).toBe('Kaori');
  });

  it(`Should create orderRows`, () => {
    expect(component.orderRows).toBeDefined();
    expect(component.orderRows.length).toBe(0);
    component.createOrderRows();
    expect(component.orderRows[0].productid).toBe(76);
    expect(component.orderRows.length).toBe(2);
  });

  it(`Should create orders`, () => {
    // Why this is undefined?
    expect(component.orders).toBeUndefined();
    // expect(component.orders).toBeNull();
    component.createOrders();
    expect(component.orders).toBeDefined();
    expect(component.orders.companyId).toBe(25);
  });

});
