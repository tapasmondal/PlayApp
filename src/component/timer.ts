import {Component, Input} from '@angular/core';
import {ITimer} from '../component/itimer';
import { Events } from 'ionic-angular';
 
@Component({
selector: 'timer',
templateUrl: 'timer.html'
})
export class TimerComponent {
 
 @Input() timeInSeconds: number;
 public timer: ITimer;
 
constructor(private events: Events
 ) {
 }
 
ngOnInit() {
 this.initTimer();
 }
 
hasFinished() {
 return this.timer.hasFinished;
 }
 
initTimer() {
 if(!this.timeInSeconds) { this.timeInSeconds = 0; }
 
 this.timer = <ITimer>{
seconds: this.timeInSeconds,
runTimer: false,
hasStarted: false,
hasFinished: false,
secondsRemaining: this.timeInSeconds
 };
 
 this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
 }
 
startTimer() {
 this.timer.hasStarted = true;
 this.timer.runTimer = true;
 this.timerTick();
 }
 
pauseTimer() {
 this.timer.runTimer = false;
 }
 
resumeTimer() {
 this.startTimer();
 }
 
timerTick() {
setTimeout(() => {

 if (!this.timer.runTimer) { return; }
 this.timer.secondsRemaining--;
 this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
 if (this.timer.secondsRemaining > 0) {
 this.timerTick();
 }
 else {
 this.timer.hasFinished = true;
 this.events.publish('timer:timeEnd', {});
 }
 }, 1000);
 }
 
getSecondsAsDigitalClock(inputSeconds: number) {
 var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
 var days=Math.floor(sec_num / (3600*24));
 var hours = Math.floor((sec_num -(days*3600*24))/ 3600);
 var minutes = Math.floor((sec_num -(days*3600*24)- (hours * 3600)) / 60);
 var seconds = sec_num -(days*3600*24)- (hours * 3600) - (minutes * 60);
 var daysString = '';
 var hoursString = '';
 var minutesString = '';
 var secondsString = '';
 daysString = (days < 10) ? "0" + days : days.toString();
hoursString = (hours < 10) ? "0" + hours : hours.toString();
minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
 return daysString+':'+hoursString + ':' + minutesString + ':' + secondsString;
 }
}
