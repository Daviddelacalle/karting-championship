import { Component, OnDestroy, OnInit } from '@angular/core';

import { DriversService} from './../../services/drivers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-races',
  templateUrl: './time-races.component.html',
  styleUrls: ['./time-races.component.css']
})
export class TimeRacesComponent implements OnInit, OnDestroy{

    timeRaces;
    ganadores;
    timeout;
    asIsOrder(a, b) {
        return 1;
    }

  constructor( private _driversService: DriversService,
                public router: Router) { }

  ngOnInit(): void {
        this.timeRaces = this._driversService.getTimesRaces();
        this.ganadores = this._driversService.getGanadores();
        this.timeout = setTimeout(()=>{                           
            this.router.navigate(['/home']);
            
        }, 4000);

  }
  ngOnDestroy(){
    clearTimeout(this.timeout);
  }

}
