import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';
import { Case } from 'src/app/models/case';
@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {
  pipe = new DatePipe('en-US');
  todayWithPipe: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  cases:any=[];
  caseId:string='';
  case:Case=new Case();
  constructor(private http: HttpClient,
    
    private caseService: CaseService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true,
      dom: '<"top"f>rt<"bottom"lip><"clear">',
    };
    this.get();
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy  h:mm:ss a');
  }
  
  get(){
    this.caseService.getCase(this.caseId).subscribe((cases: any) => {
      this.cases.push(cases);
      this.dtTrigger.next(0);
      console.log(this.cases[0].data);
    });
  }
  view(caseId: string){
    this.caseService.getCase(caseId).subscribe((viewcase:any) => {
      
      this.case=viewcase.data;
      console.log(this.case);
    });
  }

}
