import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routes } from './app.routing';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LecturaChequeComponent } from './lectura-cheque/lectura-cheque.component';
import { Services } from './services/app.service';
import { Globals } from './globals';

import { HttpModule } from '@angular/http';
import { NgProgressModule } from '@ngx-progressbar/core';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AppComponent,
    LecturaChequeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    NgProgressModule.withConfig({
      spinnerPosition: 'left',
      color: 'red',
      thick: true
    }),
    HttpClientModule,
    FormsModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      routes ),
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatTabsModule,
    MatListModule,
    MatSnackBarModule
  ],
  providers: [Services, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
