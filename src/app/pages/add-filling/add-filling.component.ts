import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { FillingsService } from 'src/app/services/fillings.service';
import { Filling } from 'src/app/models/filling.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-filling',
  templateUrl: './add-filling.component.html',
  styleUrls: ['./add-filling.component.sass']
})
export class AddFillingComponent implements OnInit {
  
  public addFillingForm = this.fb.group({
    km: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    volume: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
  }); 
  
  
  constructor( private fb: FormBuilder, private fs: FillingsService, private router:Router) { }
  
  ngOnInit(): void {
  }
  
  @Input() 
  @Output() closeModal = new EventEmitter();

    hideModal() {
      this.closeModal.emit(false)
      console.log('False emited');
      
    }

    saveFilling() {
      this.fs.saveFilling( this.addFillingForm.value ).subscribe(
        resp => {
          Swal.fire('Filling Added');
        this.router.navigate(['/'])
          this.addFillingForm.reset();
        }, (err) => console.error(err)        
      );      
    }
}


