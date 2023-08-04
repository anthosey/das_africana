import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataExService {
  
  private _serviceOption: boolean;
  private _serviceName: string;

  constructor() { }

  get serviceOption (){
    return this._serviceOption;
  }

  set setServiceOption (sOption: boolean){
    this._serviceOption = sOption;
  }


  get serviceName (){
    return this._serviceName;
  }

  set setServiceName (sName: string){
    this._serviceName = sName;
  }
}
