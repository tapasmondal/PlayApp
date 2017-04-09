import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { PersonDataService } from '../../services/PersonData.service';
import { TeamPerformance} from '../../models/team-performance';

@Component({
  selector: 'page-team-modal-content',
  templateUrl: 'team-modal-content.html',
  providers: [PersonDataService]
})
export class TeamModalContentPage {
  
  private teaminfo: TeamPerformance;
  tournamentId:Number ;
  personId:Number;
  teamId:Number;
  private bgColor:String="bgdefault";

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private personDataService: PersonDataService, 
    private loadingCtrl: LoadingController
  ) {
    

     this.tournamentId = this.params.get('tournamentId');
     this.personId= this.params.get('personId');
     this.teamId= this.params.get('teamId');

   console.log("person no:"+this.personId);
   console.log("Team no:"+this.teamId);
    
    this.updateTeamColor(this.teamId);

    this.teaminfo = new TeamPerformance();
  
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  ionViewDidLoad() {
    let self = this;
    self.fetchGameStats();
  }

  fetchGameStats(){
    console.log("fetchGameStats");
      let self = this;
      let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

      self.personDataService.getTeamPerfomanceByTeam(self.personId,self.tournamentId,self.teamId).then(function (personData) {
      self.teaminfo = personData;
     
      console.log("g Stats:"+JSON.stringify(self.teaminfo));
      loading.dismiss();
    });

  }

  updateTeamColor(teamId:Number){

    let self=this;

    switch(teamId) { 
      case 1: { 
          self.bgColor= "dd";
          break; 
      } 
      case 2: { 
          self.bgColor= 'rc';
          break; 
      } 
      case 3: {
          self.bgColor= 'kk';
          break;    
      } 
      case 4: { 
          self.bgColor= 'mi';
          break; 
      }  

      case 5: { 
          self.bgColor= 'kx';
          break; 
      } 

      case 6: { 
          self.bgColor= 'sh';
          break; 
      } 

      case 7: { 
          self.bgColor= 'gr';
          break; 
      } 
      case 8: { 
          self.bgColor= 'pu';
          break; 
      } 
      
    }
  }

}
