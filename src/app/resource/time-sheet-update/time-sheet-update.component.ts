import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-sheet-update',
  templateUrl: './time-sheet-update.component.html',
  styleUrls: ['./time-sheet-update.component.css']
})
export class TimeSheetUpdateComponent implements OnInit {
  viewDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }
  dayClicked(e){

    console.log(e);

  }
}
