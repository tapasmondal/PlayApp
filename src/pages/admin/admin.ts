import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { PersonDataService } from '../../services/PersonData.service';
import { PersonDashboard } from '../../models/person-dashboard';
import { PersonGame } from '../../models/person-game';
import { AdminUpdateInfo } from '../../models/admin-updated-info';
import {PersonInfo} from '../../models/person-info'

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
  providers: [PersonDataService]
})
export class AdminPage {

private personGameScheduleList: any;
private scheduleDate: string;
private adminUpdateInfo: AdminUpdateInfo = new AdminUpdateInfo();
private adminUpdateInfoResponse: AdminUpdateInfo = new AdminUpdateInfo();
loggedInUser: Number ;
loggedInUserTournamentId: Number ;
personInfo:PersonInfo;

  constructor(public navCtrl: NavController, private personDataService: PersonDataService,
    private loadingCtrl: LoadingController,private alertCtrl: AlertController,public params: NavParams,public toastCtrl: ToastController) {
    this.personGameScheduleList = [];
    this.scheduleDate = new Date().toISOString();

    this.loggedInUser=params.data.personId;
    this.loggedInUserTournamentId=params.data.tournamentId;
    console.log("Home Page user Details params.data:"+JSON.stringify(params.data));
    console.log("Home Page user Details:"+JSON.stringify(this.loggedInUser));
  }


  private fetchPersonGameScheduleList() {

    let self = this;

    console.log(self.scheduleDate);

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loading.present();
    self.personDataService.getPersonGameScheduleList(self.loggedInUser, self.loggedInUserTournamentId,self.scheduleDate).then(function (personData) {
      self.personGameScheduleList = personData;

      for (let i of self.personGameScheduleList) {
      console.log(i); // "species"
        i.gameStatusByAdmin=i.status;
      }

      loading.dismiss();
    });

  }

  ionViewWillEnter() {
    let self = this;
    self.fetchPersonGameScheduleList();
  }

  updateGameStatus(gameNo:Number){
   
   let self = this;
     console.log("Selected g: "+gameNo);
    for (let personGame of self.personGameScheduleList) {

     
      if (personGame.gameNo == gameNo) {
          
          if(personGame.winerId!= 0 && personGame.gameStatusByAdmin=="SCH"){
            
            self.alertMessage("Validation Error","Select Game Status");
          }
          else {

                console.log(JSON.stringify(personGame));
                console.log("----creating object----");
                self.adminUpdateInfo.gameNo = personGame.gameNo;
                self.adminUpdateInfo.tournamentId = personGame.tournamentId;
                self.adminUpdateInfo.adminId = personGame.personId;
                self.adminUpdateInfo.gameLockStatus = personGame.overlookLockSchedule;
                self.adminUpdateInfo.gameLockDelayBy = personGame.gameLockDelayedBy;
                self.adminUpdateInfo.gameStatus=personGame.gameStatusByAdmin;
                self.adminUpdateInfo.gameWinnerId = personGame.winerId;

                let loading = this.loadingCtrl.create({
                  content: 'Updating...'
                });
                console.log("----completed object----");
                console.log("Saving admin update info : "+JSON.stringify(self.adminUpdateInfo));

                self.personDataService.updateByAdmin(self.adminUpdateInfo).then(function (data) {
                self.adminUpdateInfoResponse = data;
                self.adminUpdateInfo=new AdminUpdateInfo();

                loading.dismiss();

               // self.alertMessage('Notification',self.adminUpdateInfoResponse.message);
                self.presentToast(self.adminUpdateInfoResponse.message);
                self.ionViewWillEnter();
                
            
          });

         }
            
        }
     }

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
}
