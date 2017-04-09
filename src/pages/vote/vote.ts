import { Component } from '@angular/core';
import { Platform,Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController,NavController,NavParams, LoadingController ,ToastController} from 'ionic-angular';
import { PersonDataService } from '../../services/PersonData.service';
import { PersonDashboard } from '../../models/person-dashboard';
import { PersonGame } from '../../models/person-game';
import { VoteInfo } from '../../models/vote-info';
import { ModalContentPage } from '../../pages/home/model-content';
import{TeamModalContentPage } from '../team/team-model-content';
import * as moment from 'moment';

@Component({
  selector: 'page-vote',
  templateUrl: 'vote.html',
  providers: [PersonDataService]
})
export class VotePage {


  //Form Control
  private isValidForm: boolean = false;
  // this model will be sent to server 
  private voteInfo: VoteInfo = new VoteInfo();
  private voteInfoResponse: VoteInfo = new VoteInfo();
  private personGameScheduleList: any;
  private scheduleDate: any;
  loggedInUser: Number ;
  loggedInUserTournamentId: Number ;
  loggedInUserTeamID: Number ;
  

  constructor(public navCtrl: NavController, private personDataService: PersonDataService,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController,
    public params: NavParams,public toastCtrl: ToastController,public modalCtrl: ModalController,
    public events: Events) {
    this.personGameScheduleList = [];
    this.scheduleDate = new Date().toISOString();

    this.loggedInUser=params.data.personId;
    this.loggedInUserTournamentId=params.data.tournamentId;
    this.loggedInUserTeamID=params.data.teamId;
   
    console.log("Vote Page user Details params.data:"+JSON.stringify(params.data));
    console.log("Vote Page user Details:"+JSON.stringify(this.loggedInUser));
    console.log("Vote Page loggedInUserTeamID:"+JSON.stringify(this.loggedInUserTeamID));
    
     events.subscribe('homeHadle:schedule', (data) => {	
            this.scheduleDate = moment(+data.schedule).format("YYYY-MM-DD");
            console.log(" schedule : "+this.scheduleDate);
            this.ionViewWillEnter();
      });
  }

  private fetchPersonGameScheduleList() {

    let self = this;

    console.log(self.scheduleDate);

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loading.present();
    self.personDataService.getPersonGameScheduleList(self.loggedInUser, self.loggedInUserTournamentId, self.scheduleDate).then(function (personData) {
      self.personGameScheduleList = personData;
      loading.dismiss();
    });

  }

  ionViewWillEnter() {
    let self = this;
    self.fetchPersonGameScheduleList();
  }


  vote(gameNo: Number) {
    let self = this;
     console.log("Selected g: "+gameNo);
    for (let personGame of self.personGameScheduleList) {

     
      if (personGame.gameNo == gameNo) {
         console.log(personGame);
            
            if (personGame.teamAValue == 0 && personGame.teamBValue==0){
                  self.alertMessage("Validation Error","Both points can not be 0");
            }
            else if ((personGame.teamAValue > 0 
            && personGame.teamAValue < (personGame.personPointBaseValue * personGame.personePointMultiplier))
            ||
            (personGame.teamBValue > 0 
            && personGame.teamBValue < (personGame.personPointBaseValue * personGame.personePointMultiplier))
            
            ){
                  self.alertMessage("Validation Error","Selected value is less than base point");
            }
             //TODO:Home team validation 

            else if (personGame.teamAValue == personGame.teamBValue){
                  self.alertMessage("Validation Error","Both points can not be equal");
            }
            else if((self.loggedInUserTeamID==personGame.teamAId && personGame.teamAValue < (personGame.personPointBaseValue * personGame.personePointMultiplier))
            ||(self.loggedInUserTeamID==personGame.teamBId && personGame.teamBValue < (personGame.personPointBaseValue * personGame.personePointMultiplier))){
                self.alertMessage("Validation Error","Must vote for Home team !");
            }
            else{

                  console.log("----creating object----");
                  self.voteInfo.gameNo = personGame.gameNo;
                  self.voteInfo.tournamentId = personGame.tournamentId;
                  self.voteInfo.personId = personGame.personId;
                  self.voteInfo.teamAId = personGame.teamAId;
                  self.voteInfo.teamBId = personGame.teamBId;
                  self.voteInfo.teamAValue = personGame.teamAValue;
                  self.voteInfo.teamBValue = personGame.teamBValue;
                  //self.voteInfo.voteingTime=new Date();
                  console.log("----completed object----");
                  console.log("Saving Voting info : "+JSON.stringify(self.voteInfo));
                  
                  
                  let loading = this.loadingCtrl.create({
                    content: 'Updating...'
                  });

                  self.personDataService.saveVote(self.voteInfo).then(function (data) {
                    self.voteInfoResponse = data;
                    self.voteInfo=new VoteInfo();
                    loading.dismiss();

                    self.presentToast(self.voteInfoResponse.message);
                    self.ionViewWillEnter();
                  });
            }
        }
    }

  }
  openModal(gameNo:number,personId:Number,tournamentId:Number,teamAId:Number,teamBId:Number) {
  

   console.log("g no:"+gameNo);
   console.log("person no:"+personId);
   console.log("tournamet no:"+tournamentId);
   console.log("teamATitle :"+teamAId);
   console.log("teamBTitle :"+teamBId);
   console.log("---> model opening ");

   let self = this;
   let modal = self.modalCtrl.create(ModalContentPage,{personId:personId,tournamentId:tournamentId,
     gameNo:gameNo,teamAId:teamAId,teamBId:teamBId});
   modal.present();
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Select approprite value !',
      buttons: ['Dismiss']
    });
    alert.present();
  }

   alertMessage(title,message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentToast(messageTxt) {
    let toast = this.toastCtrl.create({
      message: messageTxt,
      duration: 3000,
      position:'bottom'
    });
    toast.present();
  }

    openTeamModal(personId:Number,tournamentId:Number,teamId:Number) {
  
   console.log("person no:"+personId);
   console.log("tournamet no:"+tournamentId);
   console.log("---> Team model opening ");

   let self = this;
   let modal = self.modalCtrl.create(TeamModalContentPage,{personId:personId,tournamentId:tournamentId,teamId:teamId});
   modal.present();
  }
}
