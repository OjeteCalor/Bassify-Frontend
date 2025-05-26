import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent {
  movimiento: string = 'translateX(0)';
  aceptCard(){
    this.movimiento = 'translateX(100px)';
  }

}
