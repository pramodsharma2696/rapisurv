import { Component, OnInit } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-create-timesheet',
  templateUrl: './create-timesheet.component.html',
  styleUrls: ['./create-timesheet.component.scss'],
  standalone: true,
  imports: [MatSlideToggleModule, MatRadioModule, MatCheckboxModule, MatIconModule],
  
})
export class CreateTimesheetComponent implements OnInit {
 

  constructor() { }

  ngOnInit(): void {
  }

}
