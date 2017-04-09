import { Component,ViewChild } from '@angular/core';
import { Platform,Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { VotePage } from '../pages/vote/vote';
import { StatPage } from '../pages/stat/stat';
import { HomePage } from '../pages/home/home';
/*import { TabsPage } from '../pages/tabs/tabs';*/
import { LoginPage } from '../pages/login/login';
import{LoggedInUser} from'../models/logged-in-user';

@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {
  rootPage = LoginPage;
  private nav: any;
  private loggedInUser:LoggedInUser;
public menuItems = [
    {
      title: 'Home',
      icon: 'ios-home-outline',
      count: 0,
      component: HomePage
    },
    {
      title: 'My Bookings',
      icon: 'ios-list-box-outline',
      count: 0,
      component: VotePage
    },
     {
      title: 'My Rewards',
      icon: 'ios-basket-outline',
      count: 0,
      component: StatPage
    },    
 
  
  ];
  constructor(platform: Platform,public events: Events) {
     let self = this;
     self.loggedInUser=new LoggedInUser();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    events.subscribe('authHandler:userSuccessLogin', (loggedInUser) => {	
            self.loggedInUser = loggedInUser;
            console.log("post authentication  :::::: "+JSON.stringify(self.loggedInUser));
      });

       events.subscribe('homeHandler:userData', (userData) => {	
            self.loggedInUser.balance = userData.balance;
            self.loggedInUser.canParticipate=userData.participate;
            console.log("Afere user data update   :::::: "+JSON.stringify(self.loggedInUser));
      });
  }

  openPage(page) {
    let self = this;
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
   
        self.nav.setRoot(page.component);
    
  }
}
