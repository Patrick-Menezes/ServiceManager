import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{ ConectionService } from '../../services/conection-service';
import { IserviceManager } from '../../interface/IOrderServiceManager';
import{AsyncPipe} from '@angular/common';
import { Observable, switchMap } from 'rxjs';
@Component({
  selector: 'app-details',
  imports: [AsyncPipe],
  templateUrl: './details.html',

})
export class Details implements OnInit {


constructor (private route: ActivatedRoute, private conectionService: ConectionService) { }

OrderDetail$!: Observable<IserviceManager>;



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


}
