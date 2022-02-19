import { Component, OnInit } from '@angular/core';
import { StorestaticsService } from 'src/app/services/storestatics.service';

@Component({
  selector: 'app-homeinfo',
  templateUrl: './homeinfo.component.html',
  styleUrls: ['./homeinfo.component.css']
})
export class HomeinfoComponent implements OnInit {

  statics$ = this.staticsService.statics$ ;

  constructor(private staticsService:StorestaticsService) { }

  ngOnInit(): void {
    this.staticsService.getStoreStatics().subscribe(statics => {
      this.staticsService.setStatics(statics);
    })

  }

}
