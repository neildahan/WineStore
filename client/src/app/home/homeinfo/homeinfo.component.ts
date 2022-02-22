import { Component, OnInit } from '@angular/core';
import { MatCardLgImage } from '@angular/material/card';
import { StorestaticsService } from 'src/app/services/storestatics.service';

@Component({
  selector: 'app-homeinfo',
  templateUrl: './homeinfo.component.html',
  styleUrls: ['./homeinfo.component.css']
})
export class HomeinfoComponent implements OnInit {

  statics$ = this.staticsService.statics$ ;
statics2 : any
  constructor(private staticsService:StorestaticsService) { }

  ngOnInit(): void {
    this.staticsService.getStoreStatics().subscribe(statics => {
      this.staticsService.setStatics(statics);
      this.statics2 = statics;
console.log(this.statics2)
    })

  }


  availableProducts:number = 0;
  submittedOrders:number = 0;


  availableProductsstop:any = setInterval(()=>{
    this.availableProducts++;
    if(this.availableProducts == this.statics2.availableProducts)
    {
      clearInterval(this.availableProductsstop);
    }
  },80) 

  submittedOrdersstop:any = setInterval(()=>{
    this.submittedOrders++;
    if(this.submittedOrders == this.statics2.submittedOrders)
    {
      clearInterval(this.submittedOrdersstop);
    }
  },80) 


}
