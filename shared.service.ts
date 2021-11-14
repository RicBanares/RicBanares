import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
//readonly APIUrl = "http://localhost:53413/api";
readonly APIUrl = "http://localhost/WebAPI/api";

  constructor(private http: HttpClient) { }

  //Card API's
  getCardList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Card');
  }

  addCard(val: any){
    return this.http.post<any>(this.APIUrl+'/Card', val);
  }

  updateCard(val: any){
    return this.http.put<any>(this.APIUrl+'/Card', val);
  }

  deleteCard(val: any){
    return this.http.delete<any>(this.APIUrl+'/Card/'+ val);
  }
}
