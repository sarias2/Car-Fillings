import { keyframes } from '@angular/animations';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Filling } from 'src/app/models/filling.model';

import { FillingsService } from 'src/app/services/fillings.service';

declare var Plotly: any;

@Component({
  selector: 'app-graphcs',
  templateUrl: './graphics.component.html',
  styles: [
  ]
})
export class GraphicsComponent implements OnInit {


  constructor(private fillingService: FillingsService) { }

  // public all: any
  public fillings: Filling[] = []
  public km: number[] = []
  public difference: number[] = []
  public graph: any;
  public date: Date[] = [];
  public avg: string = '';

  ngOnInit(): void {
    this.calculateConsumption();
  }

  diff(ary: number[]) {
    var newA = [];
    for (var i = 1; i < ary.length; i++)  newA.push(ary[i - 1] - ary[i])
    return newA;
  }



  calculateConsumption = async () => {

    await this.fillingService.getFillings()
      .subscribe(resp => {
        this.fillings = resp.reverse()
        this.km = this.fillings.map(x => x.km)
        let volume = this.fillings.map(x => x.volume)
        this.date = this.fillings.map(x => x.date)
        this.difference = this.diff(this.km)
        let result = this.difference.map(function (n, i) { return n / volume[i]; });
        this.graph = {
          data: [
            {
              x: this.km,
              y: result,
              type: 'scatter',
              line: {
                color: '6200ea',
                width: 5,
              },
            }
          ],
          layout: { 
            title: {
              text: 'Km to Galons',
              font: {color: '#ffffff'}
            },
            font: {
              family: 'Roboto',
              color: '#ffffff'
            },
            paper_bgcolor: '#263238',
            plot_bgcolor: '#263238',
          }


        };
        this.avg = Math.abs(result.reduce((a, b) => (a + b)) / this.difference.length).toFixed(4);
        return
      });

  }



}
