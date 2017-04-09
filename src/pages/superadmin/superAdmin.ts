import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { PersonDataService } from '../../services/PersonData.service';
import { PersonDashboard } from '../../models/person-dashboard';
import { PersonGame } from '../../models/person-game';
import { AdminUpdateInfo } from '../../models/admin-updated-info';
import {PersonInfo} from '../../models/person-info'

@Component({
  selector: 'page-superadmin',
  templateUrl: 'superadmin.html',
  providers: [PersonDataService]
})
export class SuperAdminPage {

private personList: any;
private adminUpdateInfo: AdminUpdateInfo = new AdminUpdateInfo();
private adminUpdateInfoResponse: AdminUpdateInfo = new AdminUpdateInfo();
loggedInUser: Number ;
loggedInUserTournamentId: Number ;
personInfo:PersonInfo=null;
personId:Number;
private personData: any;

  constructor(public navCtrl: NavController, private personDataService: PersonDataService,
    private loadingCtrl: LoadingController,private alertCtrl: AlertController,public params: NavParams,public toastCtrl: ToastController) {
    this.personList = [];
    this.personData=[];
    this.personInfo=new PersonInfo();
    //this.personId = params.data.personId;
    this.loggedInUser=params.data.personId;
    this.loggedInUserTournamentId=params.data.tournamentId;
    console.log("Home Page user Details params.data:"+JSON.stringify(params.data));
    console.log("Home Page user Details:"+JSON.stringify(this.loggedInUser));
  }


  private fetchPersonDetails() {

    let self = this;

    console.log(self.personId);

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loading.present();
    self.personDataService.getPersonDetails(self.personId).then(function (personData) {
      self.personData = personData;
      self.personInfo.personId=self.personId;
      self.personInfo.personTitle=self.personData.title;
      self.personInfo.participate=self.personData.participate;
      self.personInfo.perviousBalance=self.personData.balance;
      loading.dismiss();
    });

  }

  private fetchAllPersonList() {

    let self = this;

    console.log(self.personId);

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loading.present();
    self.personDataService.getAllPersonDetails(self.loggedInUser, self.loggedInUserTournamentId).then(function (personData) {
      self.personList = personData;
      loading.dismiss();
    });

  }

  ionViewWillEnter() {
    let self = this;
    self.fetchAllPersonList();
  }

  updatePersonData(){
   
   let self = this;
     console.log("Selected person data is : "+JSON.stringify(self.personInfo));
    
  
          
          if(self.personInfo.balance<0){       
            self.alertMessage("Validation Error","Value can not be less than 0");
          }
          else {

                let loading = this.loadingCtrl.create({
                  content: 'Updating...'
                });
                self.personDataService.updatePersonDataByAdmin(self.personInfo).then(function (data) {
                self.personInfo = new PersonInfo();
                loading.dismiss();
                // self.alertMessage('Notification',self.adminUpdateInfoResponse.message);

                let response:PersonInfo=data
                console.log("server Response : "+JSON.stringify(response));
                self.presentToast(response.message);
                self.personId=response.personId;
                self.fetchPersonDetails();
                
            
          });

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
