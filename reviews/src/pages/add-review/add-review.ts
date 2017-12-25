import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-review',
  templateUrl: 'add-review.html',
})
export class AddReviewPage {
	 title: any;
  description: any;
  rating: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddReviewPage');
  }

  save(): void {
 
    let review = {
      title: this.title,
      description: this.description,
      
    };
 
    this.view.dismiss(review);
 
  }
 
  close(): void {
    this.view.dismiss();
  }

}
