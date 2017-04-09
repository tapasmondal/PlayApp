import { Component } from '@angular/core';
import { ModalController,NavController ,AlertController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegistrationService } from '../../services/registration-service';
import{RegistrationPage} from '../registration/registration'
import{UserInfo} from'../../models/user-Info'
import{LoggedInUser} from'../../models/logged-in-user'
import {ForgotPasswordPage} from '../forgotpassword/forgotpassword';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'login.html',
  selector: 'page-login',
  providers: [RegistrationService]
})

export class LoginPage {

  private user: UserInfo = new UserInfo();

  loggedIn: LoggedInUser = new LoggedInUser();
   
    constructor(public navCtrl: NavController, public platform: Platform,private registrationService: RegistrationService,
    private alertCtrl: AlertController,public modalCtrl: ModalController,private events: Events) {
     // this.user.userName="sys";
     // this.user.password="123";
    }

   signup() {
    this.navCtrl.setRoot(RegistrationPage);
  }
    login() {
                      
               // this.navCtrl.setRoot(TabsPage);

             let self = this;
                if(self.isValidForm()) {
                  self.registrationService.login(self.user).then(function(response) {
                      
                      console.log("server response  --------- : "+response);
                      
                      //self.user=response.desc;
                      if(response.status == "Success") {

                          console.log("Logged Successfully : "+response.desc);
                         // self.navCtrl.setRoot(TabsPage)
                         self.loggedIn.personId=response.desc.personId;
                         self.loggedIn.personViewTitle=response.desc.person.title;
                         self.loggedIn.tournamentId=response.desc.tournamentId;
                         self.loggedIn.admin=response.desc.admin;
                         self.loggedIn.teamId=response.desc.teamId;
                         self.loggedIn.token=response.desc.token;
                         self.loggedIn.canParticipate=response.desc.person.participate;
                         self.loggedIn.balance=response.desc.person.balance;
                         console.log("Logged Successfully with user details as  : "+JSON.stringify(self.loggedIn));
                         self.events.publish('authHandler:userSuccessLogin', self.loggedIn);
                         self.navCtrl.push(TabsPage, { item: self.loggedIn });
                      }
                      else{
                        self.alertMessage("Error",response.desc);
                      }
                  });
                }
   }


  private isValidForm(): boolean {
    let self = this;
    
      if(!self.isEmpty(self.user.userName) && !self.isEmpty(self.user.password)) {
         return true; 
      }
 
    return false;
  }


  private isEmpty(val: String): boolean {
    if (val != null && val != undefined && val != "") {
      return false;
    }
    return true;
  }

  alertMessage(title,message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  forgotPassword() {
   let self = this;
    self.navCtrl.setRoot(ForgotPasswordPage);
 
  }


}
    
    