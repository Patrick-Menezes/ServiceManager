import { Component ,inject} from '@angular/core';
import { IserviceManager } from '../../interface/IOrderServiceManager';
import{ ConectionService } from '../../services/conection-service';
import{ReactiveFormsModule,FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-add-order',
  imports: [ReactiveFormsModule],
  templateUrl: './add-order.html'

})
export class AddOrder {

  private conectionService = inject(ConectionService);



  NewOrderForm = new FormGroup({
    ClientName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    CreatAt: new FormControl('', Validators.required),
    orderStatus: new FormControl('', Validators.required)
  });
  



addOrder(): void {
  if (this.NewOrderForm.valid) {
  
      this.conectionService.CreateOrder(this.NewOrderForm.value as IserviceManager).subscribe
  ({next: (response) => {
        console.log('Order successfully created:', response);
        this.NewOrderForm.reset();
      },
      error: (error) => {
        console.error('Error creating order:', error);
      },complete: () => {
        console.log('Create order request completed.');
      }
    });
    
     
    console.log('Tentativa de adicionar novo pedido:', this.NewOrderForm.value);
    } else {
      console.log('Formulário inválido. Não foi possível adicionar o pedido.');
    }
      
  }


}





