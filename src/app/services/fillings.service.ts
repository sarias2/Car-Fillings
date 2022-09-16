import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Filling } from '../models/filling.model';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class FillingsService {

  constructor(private http: HttpClient) { }

  getFillings() {
    
    const url = `${ base_url }/fillings`;
    return this.http.get<Filling[]>( url ).pipe(
      map((resp: any) => resp.fillings)
    );
  }

  getSingleFilling(id: string | null) {
    const url = `${ base_url }/fillings/${ id }`;
    return this.http.get<Filling[]>( url ).pipe(map((resp:any) => resp.filling));
  }

  saveFilling( data: any ) {
    const url = `${ base_url }/fillings`;
    return this.http.post( url, data );
  }

  updateFilling( id: string | null, filling: Filling) {
    const url = `${ base_url}/fillings/${ id }`;
    return this.http.put( url, filling);
  }

  deleteFilling( filling:Filling ) {
    const url = `${ base_url }/fillings/${ filling._id }`;
    return this.http.delete( url );
  }

}
