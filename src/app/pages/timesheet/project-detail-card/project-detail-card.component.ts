import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-detail-card',
  templateUrl: './project-detail-card.component.html',
  styleUrls: ['./project-detail-card.component.scss'],
})
export class ProjectDetailCardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  clickProject() {
    this.router.navigate(['/app/timesheet/project']);
  }
}
