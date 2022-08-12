import { keyframes } from '@angular/animations';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var Plotly: any;

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styles: [
  ]
})
export class GraphicsComponent implements OnInit {

  constructor() { }


   diff(ary: number[]) {
    var newA = [];
    for (var i = 1; i < ary.length; i++)  newA.push(ary[i] - ary[i - 1])
    return newA;
}

  ngOnInit(): void {
  }
  
  km = [12877, 12559, 12293];
  difference = this.diff(this.km)
  avg = Math.abs(this.difference.reduce((a, b) => (a + a) ) / this.difference.length);

  graph2 = {
    data: [
      { x: this.km, y: [6.758, 6.162, 5.562], type: 'scatter' },
    ],
    layout: {title: 'Some Data to Highlight'}
  };

}
