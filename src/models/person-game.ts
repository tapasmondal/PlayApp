export class PersonGame{

   personId:Number;
	 canParticipate:Boolean;
	 personTitle:String;
   tournamentId:Number;
    gameNo:Number;
    gameTournamentSequenceNo:Number;
	//final,semi final ,group match, 
	  gametype:Number;
	  personePointMultiplier:Number;
	  location:Number;
	  schedule:String;
	  lockschedule:Date;
	  overlookLockSchedule:boolean;
	  lockStatus:boolean;
	  teamAId:Number;
	  teamBId:Number;
    teamATitle:String;
    teamBTitle:String;
	  homeTeamId:Number;
	  winerId:Number;
	//P=Play,C=cancel,D=draw
	  status:String;
	
	  teamAValue:Number;
	  teamBValue:Number;

	  points:Number;
	  result:Number;
	  participated:Boolean;
	  modifiedCount:Number;

	 
	//calculated 
	  totalParticipated:Number;
	  totalPerson:Number;
	  totalTeamAValue:Number;
	  totalTeamBValue:Number;
	  totalTeamA:Number;
	  totalTeamB:Number;

		tournamentTitile:String;
		personPointBaseValue:Number;
		personPointNextIncrementValue:Number;

		gameLockDelayedBy:Number;

		//Total point so far for a person
	  totalPoints:Number;

		gameStatusByAdmin:String;

		teamAColor:string;
		teamBColor:string;

    scheduleISOtxt:String;





 

}