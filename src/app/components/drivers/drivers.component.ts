import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';


import { DriversService, Driver} from './../../services/drivers.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit{

    driver:any = {};
    timeRaces;
    ganadores;
    nextDriver:string;
    lastDriver:string;
    asIsOrder(a, b) {
        return 1;
    }
    
  constructor(  private activatedRoute: ActivatedRoute,
                public router: Router,
                private _driversService: DriversService) { 

    this.activatedRoute.params.subscribe( params => {
        this.driver = this._driversService.getDriver( params['id'] );
        this.nextDriver = this._driversService.getNextDriver( params['id']);
        this.lastDriver = this._driversService.getLastDriver( params['id']);
    })
  }

  seeDriver(idx:string){
    this.router.navigate(['/driver/', idx]);

    }

  ngOnInit(): void {
    this.timeRaces = this._driversService.getTimesRaces();
    this.ganadores = this._driversService.getGanadores();
}


}