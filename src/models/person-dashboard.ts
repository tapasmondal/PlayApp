import { PersonGame } from '../models/person-game';

export class PersonDashboard {
    
      personId :number;
	  personTitle:string;
	  tournamentId:number;
	  tournamentTitle:string;
	  teamId:number;
	  teamTitle:string;
	  totalPoints:number;
	  ranking:number;
	  gamePlayed:number;
	  gameLeft:number;
	  win:number;
	  loss:number;
	  draw:number;
	  participate:Boolean;
	  balance:Number;

      currentPersonGameModel:PersonGame;
      lastPersonGameModel:PersonGame;

}