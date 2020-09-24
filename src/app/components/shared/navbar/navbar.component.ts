import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


import { DriversService} from './../../../services/drivers.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   
    constructor(private _driversService: DriversService,
                private activatedRoute: ActivatedRoute,
                public router: Router) {}
  
    ngOnInit(): void {
      this._driversService.initializeRaces();
    }
}