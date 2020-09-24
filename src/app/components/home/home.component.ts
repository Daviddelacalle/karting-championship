import { Component, OnDestroy, OnInit } from '@angular/core';
import { DriversService, Driver} from './../../services/drivers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

    timeRaces;
    ganadores;
    drivers:Driver[] = [];
    asIsOrder(a, b) {
        return 1;
    }
    timeout;
    constructor(private _driversService: DriversService,
                public router: Router) {}

    ngOnInit(): void {

        this.timeRaces = this._driversService.getTimesRaces();
        this.drivers = this._driversService.getDrivers();
        this.ganadores = this._driversService.getGanadores();   
        this.timeout = setTimeout(()=>{                           
            this.router.navigate(['/ranking-races']);
            
       }, 4000);

    }


    ngOnDestroy(){
        clearTimeout(this.timeout);
    }

}
