import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController,NavParams, LoadingController } from 'ionic-angular';
import { PersonDataService } from '../../services/PersonData.service';
import{PersonStatPage} from '../stat/personstat';

@Component({
  selector: 'page-stat',
  templateUrl: 'stat.html',
   providers: [PersonDataService]
})
export class StatPage {

 private personTournamentDashboardList: any;
 loggedInUser: Number ;
 loggedInUserTournamentId: Number ;

  constructor(public navCtrl: NavController, private personDataService: PersonDataService,
    private loadingCtrl: LoadingController,public params: NavParams) {

    this.personTournamentDashboardList = [];

    this.loggedInUser=params.data.personId;
    this.loggedInUserTournamentId=params.data.tournamentId;
    console.log("Home Page user Details params.data:"+JSON.stringify(params.data));
    console.log("Home Page user Details:"+JSON.stringify(this.loggedInUser));
  }

openNavDetailsPage(item) {
  
  console.log("openNavDetailsPage.........");

  let self=this;
    self.navCtrl.push(PersonStatPage, { item: item });
}


private fetchPersonTournamentList() {

    let self = this;

      let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

   loading.present();
    self.personDataService.getPersonTournamentPerformanceList(self.loggedInUser, self.loggedInUserTournamentId).then(function (data) {
      self.personTournamentDashboardList = data;
      loading.dismiss();
    });

  }

  ionViewWillEnter() {
    let self = this;
    self.fetchPersonTournamentList();
  }
}
