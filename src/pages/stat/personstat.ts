import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { PersonDataService } from '../../services/PersonData.service';
import { PersonDashboard } from '../../models/person-dashboard';
import { PersonGame } from '../../models/person-game';
import { ModalContentPage } from '../../pages/home/model-content';
import { Chart } from 'chart.js';



@Component({
  selector: 'page-personalstats',
  templateUrl: 'personstat.html',
  providers: [PersonDataService]
})
export class PersonStatPage {
 
  private personGameHistoryList: any;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('barCanvas') barCanvas;
  barChart: any;
  lineChart: any;
  item:any; 
 
    constructor(public navCtrl: NavController,public params: NavParams,private personDataService: PersonDataService,
    private loadingCtrl: LoadingController) {
 
     this.item = params.data.item;
     console.log(" inside ----->"+this.item);

    }



  ionViewWillEnter() {
    let self = this;
    self.fetchPersonGameHistoryList();
  }
 

  private fetchPersonGameHistoryList() {

      let self = this;
      let loading = this.loadingCtrl.create({
       content: 'Loading...'
      });

      loading.present();
      self.personDataService.getPersonGamePerformanceHistoryList(self.item.personId,self.item.tournamentId).then(function (data) {
      self.personGameHistoryList = data;

      let labels : String[]=[];
      let graphData:number[]=[];
      let bargraphData:number[]=[];
      let i:number=0
      for (let personGameHistory of self.personGameHistoryList) {
       console.log(personGameHistory); // 1, "string", false
       labels[i]=""+personGameHistory.gameNo
       graphData[i]=personGameHistory.totalPoints
       bargraphData[i]=personGameHistory.points
       i=i+1;

      }

       loading.dismiss();
       self.loadGraph(labels,graphData,bargraphData);
     
    });

  }

    loadGraph(graphlabels : String[],graphData:number[],bargraphData:number[]) {
 
       
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',
            data: {
               // labels: ["January", "February", "March", "April", "May", "June", "July","January", "February", "March", "April", "May", "June", "July","January", "February", "March", "April", "May", "June", "July","January", "February", "March", "April", "May", "June", "July","January", "February", "March", "April", "May", "June", "July","January", "February", "March", "April", "May", "June", "July","January", "February", "March", "April", "May", "June", "July","January", "February", "March", "April", "May", "June", "July"],
                labels:graphlabels,
                datasets: [
                    {
                        
                        label: "My First dataset",
                        fill: false,
                        lineTension: .1,
                        backgroundColor: "#434D98",
                        borderColor: "#434D98",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "#f3cd58",
                        pointBackgroundColor: "#f3cd58",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "#434D98",
                        pointHoverBorderColor: "#f3cd58",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        //data: [65, -20, 80, 100, 120, 20, 40,65, -20, 80, 100, 120, 67, 40,65, -20, 70, 100, 120, 20, 49,65, -20, 50, -100, 120, 20, 40,65, -20, 80, 100, -120, 20, 40,65, -20, 80, 100, 120, 20, 40,65, -20, 80, 100, 120, 67, 40,65, -20, 70, 100, 120, 20, 49,65, -20, 50, -100, 120, 20, 40,65, -20, 80, 100, -120, 20, 40],
                        data:graphData,
                        spanGaps: false,
                        stepped:true
                    }
                ]
            },

            options: {
            title: {
            display: true,
            text: 'Custom Chart Title'
        },
        legend: {
            display: false,
            labels: {
                fontColor: '#f3cd58'
            }
        }
    }
 
        });


        this.barChart = new Chart(this.barCanvas.nativeElement, {
 
            type: 'bar',
            data: {
                labels:graphlabels,
                datasets: [{
                    label: '# of Votes',
                    data: bargraphData,
                    backgroundColor:"#434D98" ,
                    borderColor:"#434D98" ,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
 
        });
 
    }

}