import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Rutas
import { APP_ROUTING } from './app.routes';

// Componentes
import { AppComponent } from './app.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { RankingRacesComponent } from './components/ranking-races/ranking-races.component';
import { TimeRacesComponent } from './components/time-races/time-races.component';
import { DriversService } from './services/drivers.service';

@NgModule({
  declarations: [
    AppComponent,
    DriversComponent,
    HomeComponent,
    NavbarComponent,
    RankingRacesComponent,
    TimeRacesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING
  ],
  providers: [
      DriversService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
