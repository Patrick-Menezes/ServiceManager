import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{ ConectionService } from '../../services/conection-service';
import { IserviceManager } from '../../interface/IOrderServiceManager';
import{AsyncPipe} from '@angular/common';
import { Observable, switchMap } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-details',
  imports: [AsyncPipe],
  templateUrl: './details.html',

})
export class Details implements OnInit {


constructor (private route: ActivatedRoute, private conectionService: ConectionService,private router:Router) { }
MesageResponse!: string;
OrderDetail$!: Observable<IserviceManager>; 
CanDelete:boolean = false;
  toggleDeleteConfirmation(value: boolean) {
    this.CanDelete = value;
  }


ngOnInit(): void {
 

   this.OrderDetail$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          // Chama o serviço para obter os dados. 
          // Não se inscreve aqui, apenas retorna o Observable.
          return this.conectionService.GetOrder(Number(id));
        }

throw new Error('ID do pedido não encontrado na rota.');
      })
    );


}




DeleteOrder(id: number): void { 
 this.MesageResponse = 'Pedido excluído com sucesso.';
  this.conectionService.DeteleOrder(id).subscribe({
    next: (response) => {
      
     
       
      
      setTimeout(() => {
      console.log('Exclusão concluída. Botão ativado novamente.');  
    this.router.navigate(['/Home']);
     this.MesageResponse = '';
    }, 2000);
      
      


    },
    error: (error) => {
      console.error('Erro ao deletar o pedido:', error);
    }
  });
}




 
  


}
