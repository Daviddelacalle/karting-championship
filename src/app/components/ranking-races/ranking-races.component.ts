import { Component, OnDestroy, OnInit } from '@angular/core';

import { DriversService} from './../../services/drivers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking-races',
  templateUrl: './ranking-races.component.html',
  styleUrls: ['./ranking-races.component.css']
})
export class RankingRacesComponent implements OnInit, OnDestroy{

    timeRaces;
    ganadores;
    timeout;
    asIsOrder(a, b) {
        return 1;
    }

    constructor(private _driversService: DriversService,
                public router: Router) { }

    ngOnInit(): void {
        this.timeRaces = this._driversService.getTimesRaces();
        this.ganadores = this._driversService.getGanadores();
        this.timeout = setTimeout(()=>{                           
            this.router.navigate(['/time-races']);
           
       }, 4000);
    }
    
    ngOnDestroy(){
        clearTimeout(this.timeout);
    }

}
