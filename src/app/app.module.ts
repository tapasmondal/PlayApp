import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { VotePage } from '../pages/vote/vote';
import { StatPage } from '../pages/stat/stat';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AdminPage  } from '../pages/admin/admin';
import { ModalContentPage } from '../pages/home/model-content';
import { PersonStatPage } from '../pages/stat/personstat';
import { RegistrationPage} from '../pages/registration/registration';
import { TeamModalContentPage} from '../pages/team/team-model-content';
import { ForgotPasswordPage} from '../pages/forgotpassword/forgotpassword';
import {TimerComponent} from '../component/timer';
import {SuperAdminPage} from '../pages/superadmin/superAdmin';

@NgModule({
  declarations: [
    MyApp,
    VotePage,
    StatPage,
    HomePage,
    TabsPage,
    LoginPage,
    AdminPage,
    ModalContentPage,
    PersonStatPage,
    RegistrationPage,
    TeamModalContentPage,
    ForgotPasswordPage,
    TimerComponent,
    SuperAdminPage
    
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    VotePage,
    StatPage,
    HomePage,
    TabsPage,
    LoginPage,
    AdminPage,
    ModalContentPage,
    PersonStatPage,
    RegistrationPage,
    TeamModalContentPage,
    ForgotPasswordPage,
    TimerComponent,
    SuperAdminPage
    
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
