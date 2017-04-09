

export class GlobalVarsService {

    private baseURL:String;
     
    constructor() {        
      this.baseURL="http://192.168.1.104:8081/PlayServicesNew/";
  
      // production url

      //this.baseURL="http://192.70.246.110:8080/PlayServices/";
     }

    getBaseURL():String{
     let self=this;
        return self.baseURL;
    }   
}
