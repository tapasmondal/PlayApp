import { Component } from '@angular/core';
import { NavController ,AlertController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegistrationService } from '../../services/registration-service';
import{UserRegistrationInfo} from'../../models/user-registartion'
import{LoginPage} from '../login/login'

@Component({
  templateUrl: 'registration.html',
  selector: 'page-registration',
  providers: [RegistrationService]
})

export class RegistrationPage {

   user: UserRegistrationInfo ;

   
    constructor(public navCtrl: NavController, public platform: Platform,private registrationService: RegistrationService,
    private alertCtrl: AlertController) {
     this.user = new UserRegistrationInfo();
    }

    register() {
   

             let self = this;

             if(self.isEmpty(self.user.token) || self.isEmpty(self.user.userName) 
              || self.isEmpty(self.user.confirmPassword) 
               || self.isEmpty(self.user.password) 
                ){
                  self.alertMessage("Validation Error","Enter all mandatory fields ! ");
                } 
                if(self.user.confirmPassword!=self.user.password) {
                  self.alertMessage("Validation Error","Password & Confirm Passowrd are not matching !");
                } 
                else {
                  self.registrationService.registerNewUser(self.user).then(function(response) {
                      
                      console.log("server response  --------- : "+response);
                      self.user=response.desc;
                      if(response.status == "Success") {
                          console.log("Logged Successfully : "+response.status);
                          
                          self.alertMessage("Notifiation",self.user.message);


                          //self.navCtrl.setRoot(TabsPage);
                          if(self.user.registrationStatus){

                            console.log("status is true");
                            self.navCtrl.setRoot(LoginPage);
                            
                          }
                          else{
                            console.log("status is false");
                          }
                          //self.navCtrl.setRoot(TabsPage);
                         
                      }
                  });
                }
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

  loadLoginPage() {
   let self = this;
    self.navCtrl.setRoot(LoginPage);
 
  }

}
    
    