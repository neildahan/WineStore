import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  firstFormGroup!:  FormGroup;
  secondFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private registrationService:RegistrationService,
    private router: Router
    ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      identification: ['', [Validators.required, ]],//Validators.minLength(9), Validators.maxLength(9)//,
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
    });
  }
  
  onSubmit() {

    const formValue = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value
    }
    this.registrationService.addNewUser(formValue).subscribe()
    console.log(formValue)
    this.router.navigate(['home'], {queryParams: { registered: 'true' } });
  }

}