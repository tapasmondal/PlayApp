import { Component,ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { PersonDataService } from '../../services/PersonData.service';
import { PersonDashboard } from '../../models/person-dashboard';
import { PersonGame } from '../../models/person-game';
import { ModalContentPage } from '../../pages/home/model-content';
import{LoggedInUser} from'../../models/logged-in-user'

import { Events,ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import{TeamModalContentPage } from '../team/team-model-content';
import{TimerComponent} from '../../component/timer';
import {DateFormatter} from 'angular2/src/facade/intl';
/*export class PersonDashboard {
  id: number;
  title: string;
  totalPoints:number;
  rakning:number;
  gameCount:Number
}*/



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PersonDataService]
})
export class HomePage {


  private personDashboard: PersonDashboard;
  private personGameDashboardList: any;
  private personGameStatList: any;
  private borderColor:any;
  private circleBorder:String="defaultCircle";
  private teamAColor: string = "dd";
  loggedInUser: Number ;
  currentTime:Date;
  timerRequiredFlag:Boolean=false;

  @ViewChild(TimerComponent) timer: TimerComponent;

  constructor(public navCtrl: NavController, private personDataService: PersonDataService,
    private loadingCtrl: LoadingController,public modalCtrl: ModalController,
    public params: NavParams,public events: Events) {
    this.personDashboard = new PersonDashboard();
    this.personGameDashboardList = [];
    this.personGameStatList = [];
    this.loggedInUser=params.data.personId;
    this.currentTime=new Date();

    console.log("Home Page user Details params.data:"+JSON.stringify(params.data));
    console.log("Home Page user Details:"+JSON.stringify(this.loggedInUser));

    
  }

  public ionViewWillEnter() {
    let self = this;
    self.currentTime=new Date();
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loading.present();
    self.personDataService.getPersonData(self.loggedInUser).then(function (personData) {
      self.personDashboard = personData;

      self.events.publish('homeHandler:userData', self.personDashboard);
     
     if(personData.currentPersonGameModel!=null && personData.currentPersonGameModel.lockStatus==false)
         self.timerRequiredFlag==true;
     
      //this needs to be tested for 1st game use case
      if(personData.lastPersonGameModel!=null && personData.currentPersonGameModel!=null){
       
       self.updateTeamscolor(personData.currentPersonGameModel);
       self.updateTeamscolor(personData.lastPersonGameModel);
       console.log("personData.currentPersonGameModel--->"+JSON.stringify(personData.currentPersonGameModel));
       console.log("personData.lastPersonGameModel)--->"+JSON.stringify(personData.lastPersonGameModel));
       
      // personData.currentPersonGameModel.scheduleISOtxt=personData.currentPersonGameModel.schedule.toISOString();
       self.personGameDashboardList = [personData.currentPersonGameModel, personData.lastPersonGameModel];
       
      }
      else if(personData.currentPersonGameModel!=null){ 
        
         self.updateTeamscolor(personData.currentPersonGameModel);
         console.log("personData.currentPersonGameModel--->"+JSON.stringify(personData.currentPersonGameModel));
         //personData.currentPersonGameModel.scheduleISOtxt=personData.currentPersonGameModel.schedule.toISOString();
         self.personGameDashboardList = [personData.currentPersonGameModel]
     }
   
      self.updateTeamCircleColor(personData.teamId);
  
      console.log("--->"+self.circleBorder);
      loading.dismiss();
      if(personData.currentPersonGameModel!=null){
         self.timerInit();
      }
    });



    

  }
  
  timerInit(){
        let self=this;
            setTimeout(() => {
            self.timer.startTimer();
        }, 1500)
      
       self.events.subscribe('timer:timeEnd', (data) => {	
           console.log("timer:timeEnd---->");
            self.ionViewWillEnter();
      });
        
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

  openTeamModal(personId:Number,tournamentId:Number,teamId:Number) {
  
   console.log("person no:"+personId);
   console.log("tournamet no:"+tournamentId);
   console.log("---> Team model opening ");

   let self = this;
   let modal = self.modalCtrl.create(TeamModalContentPage,{personId:personId,tournamentId:tournamentId,teamId:teamId});
   modal.present();
  }


updateTeamCircleColor(teamId:Number){

    let self=this;

    switch(teamId) { 
      case 1: { 
          self.circleBorder= "ddCircle";
          break; 
      } 
      case 2: { 
          self.circleBorder= 'rcCircle';
          break; 
      } 
      case 3: {
          self.circleBorder= 'kkCircle';
          break;    
      } 
      case 4: { 
          self.circleBorder= 'miCircle';
          break; 
      }  

      case 5: { 
          self.circleBorder= 'kxCircle';
          break; 
      } 

      case 6: { 
          self.circleBorder= 'shCircle';
          break; 
      } 

      case 7: { 
          self.circleBorder= 'grCircle';
          break; 
      } 
      case 8: { 
          self.circleBorder= 'puCircle';
          break; 
      } 
        default: { 
            self.circleBorder= 'defaultCircle';
            break;              
        } 
    }
  }

updateTeamscolor(p:PersonGame):void{
 let self=this;
	p.teamAColor=self.getColor(p.teamAId);
	p.teamBColor=self.getColor(p.teamBId);
}
openVoteTab(data:any){
 let self=this;
  
  self.navCtrl.parent.select(1); 
  //var day = scheduleDate.getDate();
  //var monthIndex = scheduleDate.getMonth();
  //var year = scheduleDate.getFullYear();
  //let scheduleTxt:String =year+"-"+monthIndex+1+"-"+day;
 // var date:Date = new Date(+scheduleDate);
  //let scheduleTxt:String=scheduleDate;
  //  console.log("openVoteTab date :"+date);
  //  console.log("openVoteTab date ioso :"+date.toISOString);
  console.log("openVoteTab scheduleTxt :"+data);
  self.events.publish('homeHadle:schedule', data);
}
getColor(teamId:Number):string{

    let self=this;
    let color:string; 
    switch(teamId) { 
      case 1: { 
          color= "dd";
					break;
      } 
      case 2: { 
          color="rc"; 
          break;
      } 
      case 3: {
          color= "kk";
          break;    
      } 
      case 4: { 
          color= "mi";
          break; 
      }  

      case 5: { 
         color= "kx"; 
         break;
      } 

      case 6: { 
          color="sh"; 
          break;
      } 

      case 7: { 
          color= "gr";
          break; 
      } 
      case 8: { 
         color= "pu";
         break;
      } 

    }

		return color;
  }
  

}




