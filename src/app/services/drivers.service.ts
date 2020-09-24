import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { newArray } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import * as data from "./../../assets/json/drivers_karts.json";
import { race } from 'rxjs';

@Injectable()
export class DriversService {

    private drivers: any  = (data  as  any).default;;
      
    // private race0: any[];
    // private race1: any[];
    // private race2: any[];
    // private race3: any[];
    // private race4: any[];
    // private race5: any[];
    // private race6: any[];
    // private race7: any[];
    // private race8: any[];
    // private race9: any[];



    // initializeRaces(){
    //     let i = 0;
    //     let j = 0;
    //     this.race0 = [];
    //     this.race1 = [];
    //     this.race2 = [];
    //     this.race3 = [];
    //     this.race4 = [];
    //     this.race5 = [];
    //     this.race6 = [];
    //     this.race7 = [];
    //     this.race8 = [];
    //     this.race9 = [];

    //     for(let driver of this.drivers){
    //         this.race0[i] = [driver.name, driver.races[0].time];
    //         this.race1[i] = [driver.name, driver.races[1].time];
    //         this.race2[i] = [driver.name, driver.races[2].time];
    //         this.race3[i] = [driver.name, driver.races[3].time];
    //         this.race4[i] = [driver.name, driver.races[4].time];    
    //         this.race5[i] = [driver.name, driver.races[5].time];
    //         this.race6[i] = [driver.name, driver.races[6].time];
    //         this.race7[i] = [driver.name, driver.races[7].time];
    //         this.race8[i] = [driver.name, driver.races[8].time];
    //         this.race9[i] = [driver.name, driver.races[9].time];
    //         i++;
    //     }
    //     this.races = [this.race0, this.race1, this.race2, this.race3, this.race4, this.race5, this.race6, this.race7, this.race8, this.race9];
    // }

    // initializeRaces(){
    //     this.raceX = new Array();
    //     for(let driver of this.drivers){
    //         //Navegamos por los conductores
    //         for(let race of driver.races){
    //             //Navegamos por las carreras de cada conductor
    //             //this.raceX[race.name].push([driver.name, race.time]);
    //             let finded: boolean = false;
    //             //console.log(this.raceX.length);
    //            for(let i = 0; i<this.raceX.length; i++){
    //                 //Navegamos por las carreras guardadas
    //                 if(this.raceX[i][0] != null){
    //                     if(race.name == this.raceX[i][0]){
    //                         this.raceX[i].push([driver.name, race.time]);
    //                         finded = true;
    //                     }
    //                 }
    //             }
    //             if(!finded){
    //                 this.raceX.push([race.name]);
    //                 this.raceX[this.raceX.length-1].push([driver.name, race.time]);
    //                 console.log(this.raceX);
    //             }
    //         }
    //     }

    //     console.log(this.raceX.length);
    //     console.log(this.raceX[0][0]);
    //     console.log(this.raceX[1][0]);
    //     console.log(this.raceX[2][0]);
    //     console.log(this.raceX[0][22]);
    //     //console.log(this.raceX[1][0][1]);
    //     this.orderRaces(this.raceX);
    // }

    private races: any[][];
    private raceX: any[];
    private raceMap = new Map();
    private ganadores = new Map();


    order(map){    
        //itero sobre el mapa  
        for(let key of map.keys()){
            //ordeno los valores de una carrera determinada
            map.get(key).sort(this.sortTimesRaces);
        }

    }

    //funcion para ordenar el mapa respecto al tiempo en segundos de su carrera
    //No se puede hacer simplemente un sort ya que ordenaría alfabeticamente los nombres
    sortTimesRaces(a, b) {
        //comparo los diferentes valores de tiempo para ordenarlos
        if (a[3] === b[3]) {
            return 0;
        }
        else {
            return (a[3] < b[3]) ? -1 : 1;
        }
    }


    initializeRaces(){
        //primera función
        
        for(let driver of this.drivers){
            //recorro los conductores
            for(let race of driver.races){
                //recorro la carrera de cada conductor
                if( !this.raceMap.has(race.name)){
                    //si ya se ha añadido la carrera al mapa, se añade un nuevo valor (nuevo partipante)
                    //al incluir el corredor y su tiempo en el mapa, también incluyo el valor en segundos para luego poder ordenar
                    this.raceMap.set(race.name, new Array ([driver._id, driver.name, race.time, this.calculateSeconds(race.time)]) );
                }
                else{
                    //si la carrera no ha sido aún registrada, se registra y se incorpora el participante de la misma
                    this.raceMap.get(race.name).push([driver._id, driver.name, race.time, this.calculateSeconds(race.time) ] );
                }
            }
        }
        //ordeno las carreras
        this.order(this.raceMap);
        //calculo los puntos de cada competidor en la carrera
        this.calculatePoints(this.raceMap);
        //calculo el total de puntos de cada competidor
        this.calculateTotalPoints(this.raceMap);

    }

    calculateTotalPoints(race){
        let total = 0;
        for(let driver of this.drivers){
            for(let key of race.keys()){
                for(let values of race.get(key)){
                    if(driver._id == values[0]){
                        total += values[4];
                    }
                }
            }
            this.ganadores.set(driver._id , total);
            total = 0;
        }
        let m2= new Map([...this.ganadores.entries()].sort((a,b) => b[1] - a[1]));
        this.ganadores = m2;

    }

    calculatePoints(race){
        let i = 0;
        for(let key of race.keys()){
            i=0;
            for(let values of race.get(key)){
                //para puntuar he utilizado el sistema de puntos que se utiliza en la F1. Solo puntúan los 10 primeros
                switch(i){
                    case 0: 
                        values.push(25);
                        break;
                    case 1:
                        values.push(18);
                        break;
                    case 2:
                        values.push(15);
                        break;
                    case 3:
                        values.push(12);
                        break;
                    case 4:
                        values.push(10);
                        break;
                    case 5:
                        values.push(8);
                        break;
                    case 6:
                        values.push(6);
                        break;
                    case 7:
                        values.push(4);
                        break;
                    case 8:
                        values.push(2);
                        break;
                    case 9:
                        values.push(1);
                        break;
                    default:
                        values.push(0);
                        break;
                }
                //posicion en la que ha quedado
                values.push(i+1);
                i++;
            }
        }

    }

    //funcion  para pasar el tiempo que recibo del json a segundos y asi poder comparar tiempos
    calculateSeconds(s: string){
        let split = s.split(":");       
        let hour = parseInt(split[0])*60*60; 
        let min = parseInt(split[1])*60; 
        let secs = parseFloat(split[2]);
        let total = hour + min + secs; 

        return total;
    }

    getDrivers(){
        return this.drivers;
    }

    getDriver(id: string){
        let selectedDriver: Driver;
        for(let driver of this.drivers){
            if(id == driver._id){
                selectedDriver = driver;
            }
        }
        return selectedDriver;
    }

    getTimesRaces(){
        return this.raceMap;
    }

    getGanadores(){
        return this.ganadores;
    }

    //funcion para saber cual es el proximo conductor en la clasificacion para la navegacion entre páginas personales
    getNextDriver(id:string){
        let selectedDriver: string = "out";
        let finded: boolean = false;
        for(let key of this.ganadores.keys()){
            //ordeno los valores de una carrera determinada
            if(finded == true){
                selectedDriver = key;
                finded = false;
            }
            if(key == id){
                finded = true;
            }
        }
        return selectedDriver;

    }

    //funcion para saber cual era el anterior conductor en la clasificacion para la navegacion entre páginas personales
    getLastDriver(id:string){

        let selectedDriver: string;
        let aux = 0;
        let i;
        for(let key of this.ganadores.keys()){
            //ordeno los valores de una carrera determinada
            if(key == id){
                i = aux
            }
            aux++;
        }
        aux = 0;
        if(i == 0){
            selectedDriver = "out"; 
        }
        else{

            for(let key of this.ganadores.keys()){
                //ordeno los valores de una carrera determinada
                if(aux == i -1){
                    selectedDriver = key;
                }
                aux++;
            }
        }

        return selectedDriver;
    }

}

export interface Driver{
    _id: string;
    picture: string;
    age: number;
    name: string;
    team: string;
    races: Race[];
}

export interface Race{
    name: string;
    time: string;
}