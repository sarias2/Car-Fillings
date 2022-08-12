import { Component, OnInit } from '@angular/core';
import { Filling } from 'src/app/models/filling.model';
import { FillingsService } from 'src/app/services/fillings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-fillings',
  templateUrl: './all-fillings.component.html',
  styleUrls: ['./all-fillings.component.sass']
})
export class AllFillingsComponent implements OnInit {

  public showModal = true;

  constructor( private fillingService: FillingsService) { }
  
  public fillings:Filling[] = [];
  public all:any;

  ngOnInit(): void {
    this.all = this.loadFillings(); 
    // this.calculateAverage(this.all);
  }
  
  openModal() {
    this.showModal = !this.showModal;
  }

  // calculateAverage(arr:Filling[]) {
  //   const km = arr.map(element => element.km);
  //   console.log(`${km}  from calculate average `);
  //   return km;
  // }

  loadFillings() {
    this.fillingService.getFillings()
      .subscribe(resp => { 
        this.fillings = resp.reverse();
        return this.fillings
      } )
    
  }

  
  deleteFilling( filling: Filling ) {
      console.log(`Deleting ${filling.km}`);

      Swal.fire({
        title: `Delete entry ${filling.km}?`,
        text: `Are you sure you want to delete this entry? `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.fillingService.deleteFilling(filling).subscribe(
            resp => { 
              Swal.fire('Entry deleted');
              this.loadFillings();
        });
        }
      })
      
  }
}

