import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Filling } from 'src/app/models/filling.model';
import { DatePipe } from '@angular/common'
import { FillingsService } from 'src/app/services/fillings.service';

@Component({
  selector: 'app-edit-filling',
  templateUrl: './edit-filling.component.html',
})
export class EditFillingComponent implements OnInit {

  id: string | null = '';

  editForm = new FormGroup({
    km: new FormControl(),
    volume: new FormControl(),
    date: new FormControl(),
  }); 

  public current:any;

  constructor( private fillingService: FillingsService, private route: ActivatedRoute, public datepipe: DatePipe ) {
  }
 
  
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadFilling();
  }
  
  loadFilling (){
    this.fillingService.getSingleFilling(this.id).subscribe( filling => {
      this.current = filling;

      this.editForm.setValue( {
        km: this.current.km,
        volume: this.current.volume,
        date: this.datepipe.transform(this.current.createdAt, 'yyyy-MM-dd'),
      })

    });
  }
  
  hideModal() {
  }
  
  saveFilling( filling: string | null ) {

    this.current = this.editForm.value

    this.fillingService.updateFilling(filling, this.current)    
  }
  
}

