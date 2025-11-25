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

onSubmit(): void {
  if (this.NewOrderForm.valid) {

    console.log('Formulário válido enviado:', this.NewOrderForm.value);}
    else {console.log('Formulário inválido. Por favor, verifique os campos preenchidos.')

    };
  }








}
