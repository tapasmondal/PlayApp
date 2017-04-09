import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { VotePage } from '../vote/vote';
import { StatPage } from '../stat/stat';
import {AdminPage  } from '../admin/admin';
import{LoggedInUser} from'../../models/logged-in-user';
import{SuperAdminPage} from '../superadmin/superAdmin';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = VotePage;
  tab3Root: any = StatPage;
  tab4Root: any = AdminPage;
  tab5Root: any = SuperAdminPage;

  loggedInUser: LoggedInUser = new LoggedInUser();


  constructor(public navCtrl: NavController,public params: NavParams) {
  
   this.loggedInUser=params.data.item;
   console.log("Tabs user Details:"+JSON.stringify(this.loggedInUser));
  }

  onHomeSelect() {
    let self=this;
    console.log("Home selected ............");
    //self.tab1Root.
    
  }
}
