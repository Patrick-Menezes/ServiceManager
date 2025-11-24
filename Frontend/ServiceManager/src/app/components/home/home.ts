import { Component,inject,OnInit,OnDestroy } from '@angular/core';
import{ ConectionService } from '../../services/conection-service';
import { IserviceManager } from '../../interface/IOrderServiceManager';
import { error } from 'console';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-home',

  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  
})
export class Home implements OnInit, OnDestroy {

  private conectionService = inject(ConectionService);
  
  readonly Orders = this.GetOrders();


 ServiceManagerList: IserviceManager[]=[];
OrderService!: IserviceManager;
private readonly destroy$ : Subject<void> = new Subject();


  ngOnInit(): void {
     this.GetOrders();
 
 }

//get all orders
 GetOrders():void{
  this.conectionService.GetOrderList().subscribe({
      next:(response)=>{
        response &&(this.ServiceManagerList=response);
        console.log(this.ServiceManagerList);

       },
      error:(error)=> { console.log(error);  }
  })
  
 }

 GetServiceOrder(inicialId:Number):void{
  this.conectionService.GetOrder(inicialId).pipe(takeUntil(this.destroy$))
  .subscribe({

      next:(response)=>{
        response &&(this.OrderService=response);
        console.log(this.OrderService);

       },

      error:(error)=> { console.log(error);  }
  })

 }



 ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
 }



}
