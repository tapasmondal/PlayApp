import { Injectable } from '@angular/core';
import { Device } from 'ionic-native';
import { Events } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import{UserInfo} from'../models/user-Info';
import{UserRegistrationInfo} from'../models/user-registartion';
import{GlobalVarsService} from '../services/global-var-service';
import * as xml2js from "xml2js";

@Injectable()
export class RegistrationService {

  private userInfo: any = {};
  private baseURL:String;
  private posts:any;
   private globalVarsService:GlobalVarsService =new GlobalVarsService();

  constructor(private http: Http,private events: Events) {

      this.baseURL=this.globalVarsService.getBaseURL()+"/";
  }


myjson():any{
 this.http.get('http://localhost:8100/api').subscribe(data => {
        
        this.posts = JSON.stringify(data);
        console.log(typeof(this.posts));
        xml2js.parseString(this.posts, function (err, result) {
            console.log("=========>"+result);
        });
    }, error => {
        console.log(JSON.stringify(error.json()));
    });
}
 
  public login(user:UserInfo): any {
    
        let self = this;

         //self.myjson();
        //user.deviceId = deviceId;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let body = JSON.stringify(user);
        var url = self.baseURL  + 'auth/login';
        console.log('url : ' + url);
        console.log("request body from server : " + body);
        
        
        
        return new Promise(resolve => {
          this.http.post(url, body, { headers: headers })
            .map(res => res.json())
            .subscribe(loggedInUser => {
              
              console.log("response from server : " + JSON.stringify(loggedInUser));
              
              resolve({ status: 'Success', desc: loggedInUser });
            },
            (err) => {
              if (err.status === 401) {
                resolve({ status: 'Error', desc: "Invalid Email Id or Password !" });
              } else if (err.status === 500) {
                resolve({ status: 'Error', desc: err._body });
              } else {
                resolve({ status: 'Error', desc: "Unable to Connect. Please try again later!" });
              }
            });
        });
  }


  public registerNewUser(user:UserRegistrationInfo): any {
    
        let self = this;


        //user.deviceId = deviceId;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let body = JSON.stringify(user);
        var url = self.baseURL  + 'public-api/user/createUser';
        console.log('url : ' + url);
        console.log("request body from server : " + body);
        
        
        
        return new Promise(resolve => {
          this.http.post(url, body, { headers: headers })
            .map(res => res.json())
            .subscribe(loggedInUser => {
              
              console.log("response from server : " + JSON.stringify(loggedInUser));
              resolve({ status: 'Success', desc: loggedInUser });
            },
            (err) => {
               if (err.status === 500) {
                resolve({ status: 'Error', desc: err._body });
              } else {
                resolve({ status: 'Error', desc: "Unable to Connect. Please try again later!" });
              }
            });
        });
  }


  public resetPassword(user:UserRegistrationInfo): any {
    
        let self = this;


        //user.deviceId = deviceId;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let body = JSON.stringify(user);
        var url = self.baseURL  + 'public-api/user/resetPassword';
        console.log('url : ' + url);
        console.log("request body from server : " + body);
        
        
        
        return new Promise(resolve => {
          this.http.post(url, body, { headers: headers })
            .map(res => res.json())
            .subscribe(loggedInUser => {
              
              console.log("response from server : " + JSON.stringify(loggedInUser));
              resolve({ status: 'Success', desc: loggedInUser });
            },
            (err) => {
               if (err.status === 500) {
                resolve({ status: 'Error', desc: err._body });
              } else {
                resolve({ status: 'Error', desc: "Unable to Connect. Please try again later!" });
              }
            });
        });
  }



  
}