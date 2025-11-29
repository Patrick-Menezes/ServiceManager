import { Component,inject,OnInit,OnDestroy } from '@angular/core';
import{ ConectionService } from '../../services/conection-service';
import { IserviceManager } from '../../interface/IOrderServiceManager';
import { Subject, takeUntil ,Observable} from 'rxjs';
import{AsyncPipe} from '@angular/common';
import { Router } from '@angular/router';


// componente standalone
standalone :true;

@Component({
  selector: 'app-home',
imports: [AsyncPipe],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],

  
})
export class Home implements OnInit, OnDestroy {



constructor( private router:Router ) { }
private conectionService = inject(ConectionService);
 
ServiceManagerList$!: Observable<IserviceManager[]>;

OrderService!: IserviceManager;

private readonly destroy$ : Subject<void> = new Subject();





  ngOnInit(): void {
     this.GetOrders();
 
 }

//get all orders
 GetOrders():void{


this.ServiceManagerList$ = this.conectionService.GetOrderList();

  this.conectionService.GetOrderList().pipe(takeUntil(this.destroy$)).subscribe({
      next:(response)=>{
      
    console.log("Dados recebidos e prontos para o template:", response);

       },
      error:(error)=> { console.log(error);  }
  })
  
 }

//navigate to details page
viewDetails(Orderid:number):void{
  this.router.navigate(['details', Orderid]);

}


 ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
 }



}
