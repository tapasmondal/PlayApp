import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { PersonDataService } from '../../services/PersonData.service';

@Component({
  selector: 'page-modal-content',
  templateUrl: 'modal-content.html',
  providers: [PersonDataService]
})
export class ModalContentPage {
  
  private personGameScheduleList: any;
  gameNo:Number;
  tournamentId:Number ;
  personId:Number;
  teamAId:String;
  teamBId:String;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private personDataService: PersonDataService,
    private loadingCtrl: LoadingController
  ) {
    
     this.gameNo = this.params.get('gameNo');
     this.tournamentId = this.params.get('tournamentId');
     this. personId= this.params.get('personId');
     this. teamAId= this.params.get('teamAId');
     this. teamBId= this.params.get('teamBId');
     
   console.log("g no:"+this.gameNo);
   console.log("person no:"+this.personId);
   console.log("tournamet no:"+this.tournamentId);
   console.log("tournamet no:"+this.teamAId);
   console.log("tournamet no:"+this.teamBId);

    this.personGameScheduleList = [];
  
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  ionViewDidLoad() {
    let self = this;
    self.fetchGameStats();
  }

  fetchGameStats(){
      let self = this;
      let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loading.present();
      self.personDataService.getGameStatsList(self.personId,self.tournamentId,self.gameNo).then(function (personData) {
      self.personGameScheduleList = personData;
      console.log("g Stats:"+JSON.stringify(self.personGameScheduleList));
      loading.dismiss();
    });

  }
}
