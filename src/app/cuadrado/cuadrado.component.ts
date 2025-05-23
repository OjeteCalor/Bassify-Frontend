import { Component } from '@angular/core';

@Component({
  selector: 'app-cuadrado',
  standalone: false,
  templateUrl: './cuadrado.component.html',
  styleUrl: './cuadrado.component.css'
})
export class CuadradoComponent {
  tilt:string | null=null;
}
