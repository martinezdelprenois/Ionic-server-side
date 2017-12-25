import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the ReviewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReviewsProvider {

	 data: any;

  constructor(public http: HttpClient) {
    console.log('Hello ReviewsProvider Provider');
    this.data = null;
  }

   getReviews(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
 
      this.http.get('http://localhost:8080/reviews')
     
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }
 
  createReview(review){
 
let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    this.http.post('http://localhost:8080/review', JSON.stringify(review), {headers: headers})
      .subscribe(res => {
        console.log(res);
      },
      (err)=>{
        console.log(err);
      }
      );
 
  }
 
  deleteReview(id){
 this.http.delete('http://localhost:8080/review/' + id).subscribe((res) => {
      console.log(res);
    });   
 
  }

}
