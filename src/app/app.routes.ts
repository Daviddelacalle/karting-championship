import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DriversComponent}  from './components/drivers/drivers.component';
import { RankingRacesComponent } from './components/ranking-races/ranking-races.component';
import { TimeRacesComponent } from './components/time-races/time-races.component';



const routes: Routes = [];

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'ranking-races', component: RankingRacesComponent},
    { path: 'time-races', component: TimeRacesComponent},
    { path: 'driver/:id', component: DriversComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'home'}

];

//se podría incluir el hash mediante {useHash:true}
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
