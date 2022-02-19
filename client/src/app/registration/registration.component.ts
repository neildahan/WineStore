import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  firstFormGroup!:  FormGroup;
  secondFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
  
  onSubmit() {
    console.log(this.firstFormGroup.value);
    
    const formValue = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value
    }
  }

}