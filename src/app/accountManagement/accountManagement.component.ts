import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-accountManagement',
  templateUrl: './accountManagement.component.html',
  styleUrls: ['./accountManagement.component.css'],
  standalone: true,
  imports: [RouterModule],
})
export class AccountManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
