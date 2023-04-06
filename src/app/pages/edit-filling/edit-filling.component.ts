import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { FillingsService } from 'src/app/services/fillings.service';
import Swal from 'sweetalert2';
import { Filling } from 'src/app/models/filling.model';

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
  
  constructor( private fillingService: FillingsService, private route: ActivatedRoute, public datepipe: DatePipe, private router:Router ) {
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
        date: this.datepipe.transform(this.current.date, 'yyyy-MM-dd'),
      })

    });
  }
  
  saveFilling( filling: string | null ) {

    this.current = this.editForm.value
    
    let fixedDay = new Date(this.current.date)
    fixedDay.setHours(fixedDay.getHours() + 12)
    let timeStamp = this.datepipe.transform(fixedDay, `yyyy-MM-dd'T'HH:mm:ss'Z'`)
    this.current.date = timeStamp

    console.log(this.current);        
    this.fillingService.updateFilling(filling, this.current).subscribe(
      (res) => {
        Swal.fire('Filling saved');
        this.router.navigate(['/'])
      },
      (err) => console.error(err)
    )
  }
  
}

