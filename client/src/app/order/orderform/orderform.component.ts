import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-orderform",
  templateUrl: "./orderform.component.html",
  styleUrls: ["./orderform.component.css"],
})
export class OrderformComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();
  constructor(private fb: FormBuilder, private authService: AuthenticationService) {}

  orderForm = this.fb.group({
    city: [],
    street: [],
    deliveryDate: [],
    creditCard: [],
  });

  ngOnInit(): void {}

  submitForm() {
    this.onSubmit.emit(this.orderForm.value);
  }

  fill(type: "city" | "street") {
    this.orderForm.get(type)?.setValue(this.authService.user?.[type]);
  }
}
