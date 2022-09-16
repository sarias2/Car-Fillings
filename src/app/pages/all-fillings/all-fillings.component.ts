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

  public showModal = false;

  constructor( private fillingService: FillingsService) { }
  
  public fillings:Filling[] = [];
  public all:any;

  ngOnInit(): void {
    this.all = this.loadFillings(); 
  }
  
  openModal() {
    this.showModal = true;
  }

  closeModal(evt: Event){
   this.showModal = false; 
  }

  loadFillings() {
    this.fillingService.getFillings()
      .subscribe(resp => { 
        this.fillings = resp.reverse();
        return this.fillings
      } )
    
  }

  editFilling(filling: Filling){

    
    //  Swal.fire({
    //     title: `You're editing the entry ${filling.km}?`,
    //     icon: 'info',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Save Filling',
    //     reverseButtons: true
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.fillingService.updateFilling(filling).subscribe(
    //         resp => { 
    //           Swal.fire('Entry Updated');
    //           this.loadFillings();
    //     });
    //     }
    //   })
  }

  deleteFilling( filling: Filling ) {
      Swal.fire({
        title: `Delete entry ${filling.km}?`,
        text: `Are you sure you want to delete this entry? `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        reverseButtons: true
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

