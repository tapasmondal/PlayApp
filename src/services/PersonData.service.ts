import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { PersonDashboard } from '../models/person-dashboard';
import { PersonGame } from '../models/person-game';
import { VoteInfo } from '../models/vote-info';
import { AdminUpdateInfo } from '../models/admin-updated-info';
import{GlobalVarsService} from '../services/global-var-service'
import { TeamPerformance} from '../models/team-performance';
import{PersonInfo} from '../models/person-info';

@Injectable()
export class PersonDataService {
    private personDashboard: PersonDashboard; 
    private personGameScheduleList: any;
   
    private votingResponse:VoteInfo;
    private adminUpdateInfoResponse:AdminUpdateInfo;
    private adminPersonInfoUpdateResponse:PersonInfo;

    private baseURL:String;
    private globalVarsService:GlobalVarsService =new GlobalVarsService();

    constructor(public http: Http) {
    this.baseURL=this.globalVarsService.getBaseURL()+"public-api/infoService";

    }
    public getPersonData(personId:Number): Promise<PersonDashboard> {
        let self = this;
        return new Promise((resolve) => {
            self.http.get(self.baseURL+'/person/'+personId+'/dashboard').map(res => res.json()).subscribe(data => {
                self.personDashboard = data;
                resolve(self.personDashboard)
            },
                (error) => {
                    resolve("Error")
                })
        });
    }


    public getPersonGameScheduleList(personId:Number,tournamentId:Number,scheduleDate:String): Promise<PersonDashboard> {
        let self = this;
        return new Promise((resolve) => {
            self.http.get(self.baseURL+'/person/'+personId+'/voteview/tournament/'+tournamentId+'/schedule/'+scheduleDate).map(res => res.json()).subscribe(data => {
                self.personGameScheduleList = data;
                resolve(self.personGameScheduleList)
            },
                (error) => {
                    resolve("Error")
                })
        });
    }


    public postVote(personGame:PersonGame) {


    }

 
public getPersonTournamentPerformanceList(personId:Number,tournamentId:Number): Promise<PersonDashboard> {
        let self = this;
        return new Promise((resolve) => {
            self.http.get(self.baseURL+'/person/'+personId+'/leaderboard/tournament/'+tournamentId).map(res => res.json()).subscribe(data => {
                self.personGameScheduleList = data;
                resolve(self.personGameScheduleList)
            },
                (error) => {
                    resolve("Error")
                })
        });
    }

public getPersonGamePerformanceHistoryList(personId:Number,tournamentId:Number): Promise<PersonDashboard> {
        let self = this;
        return new Promise((resolve) => {
            self.http.get(self.baseURL+'/person/'+personId+'/leaderboardperson/tournament/'+tournamentId).map(res => res.json()).subscribe(data => {
                self.personGameScheduleList = data;
                resolve(self.personGameScheduleList)
            },
                (error) => {
                    resolve("Error")
                })
        });
    }


public getGameStatsList(personId:Number,tournamentId:Number,gameNo:Number): Promise<PersonGame[]> {
        let self = this;
        return new Promise((resolve) => {
            self.http.get(self.baseURL+'/person/'+personId+'/gamestats/tournament/'+tournamentId+'/game/'+gameNo).map(res => res.json()).subscribe(data => {
                console.log("data:"+data);
                self.personGameScheduleList = data;
                resolve(self.personGameScheduleList)
            },
                (error) => {
                    resolve("Error")
                })
        });
    }


public getTeamPerfomanceByTeam(personId:Number,tournamentId:Number,teamNo:Number): Promise<TeamPerformance> {
        let self = this;
        return new Promise((resolve) => {
            self.http.get(self.baseURL+'/person/'+personId+'/teamperfomance/tournament/'+tournamentId+'/team/'+teamNo).map(res => res.json()).subscribe(data => {
                console.log("data:"+data);
                self.personGameScheduleList = data;
        console.log("getTeamPerfomanceByTeam :"+JSON.stringify(data));

                resolve(self.personGameScheduleList)
            },
                (error) => {
                    resolve("Error")
                })
        });
    }
public saveVote(voteInfo:VoteInfo) :Promise<VoteInfo>{
    var self = this;
    self.votingResponse=new VoteInfo();

    var url = self.baseURL + '/updatedPersonVote';
    let body = JSON.stringify(voteInfo);
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return new Promise((resolve) => {
                this.http.post(url, body, { headers: headers })
                .map(res => res.json())
                .subscribe(data => {
                    self.votingResponse = data;
                    resolve(self.votingResponse)
                },
                    (error) => {
                        resolve("Error")
                    })
            });

  }


  public updateByAdmin(voteInfo:AdminUpdateInfo) :Promise<AdminUpdateInfo>{
    var self = this;
    self.adminUpdateInfoResponse=new AdminUpdateInfo();

    var url = self.baseURL + '/updatedAdminInfo';
    let body = JSON.stringify(voteInfo);
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return new Promise((resolve) => {
                this.http.post(url, body, { headers: headers })
                .map(res => res.json())
                .subscribe(data => {
                    self.adminUpdateInfoResponse = data;
                    resolve(self.adminUpdateInfoResponse)
                },
                    (error) => {
                        resolve("Error")
                    })
            });

  }



public getPersonDetails(personId:Number): Promise<PersonDashboard> {
        let self = this;

        console.log("getPersonDetails() for person Id"+personId);
        return new Promise((resolve) => {
            self.http.get(self.baseURL+'/person/'+personId).map(res => res.json()).subscribe(data => {
                self.personDashboard = data;
                resolve(self.personDashboard)
            },
                (error) => {
                    resolve("Error")
                })
        });
    }



    public getAllPersonDetails(personId:Number,tournamentId:Number): Promise<PersonDashboard> {
        let self = this;
        return new Promise((resolve) => {
            self.http.get(self.baseURL+'/person/'+personId+'/tournament/'+tournamentId+'/listAllPersonDetails').map(res => res.json()).subscribe(data => {
                self.personDashboard = data;
                resolve(self.personDashboard)
            },
                (error) => {
                    resolve("Error")
                })
        });
    }



public updatePersonDataByAdmin(personInfo:PersonInfo) :Promise<PersonInfo>{
    var self = this;
    self.adminPersonInfoUpdateResponse=new PersonInfo();

    var url = self.baseURL + '/updatedPersonData';
    let body = JSON.stringify(personInfo);
    console.log("Service ---updatePersonDataByAdmin --personInfo::"+JSON.stringify(personInfo));
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return new Promise((resolve) => {
                this.http.post(url, body, { headers: headers })
                .map(res => res.json())
                .subscribe(data => {
                    self.adminUpdateInfoResponse = data;
                    console.log("updatePersonByAdmin-->"+JSON.stringify(self.adminUpdateInfoResponse));
                    resolve(self.adminUpdateInfoResponse)
                },
                    (error) => {
                        resolve("Error")
                    })
            });

  }
}