import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ConectionService } from '../../services/conection-service';
import  {Orderstatus} from '../../interface/Orderstatus'
// Importe as interfaces e enums corretamente
import { IserviceManager,  } from '../../interface/IOrderServiceManager'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update.html',
})
export class Update implements OnInit {
  
  private conectionService = inject(ConectionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  // Mapeia o Enum para ser usado facilmente no template HTML (opcional)
  orderStatuses = Orderstatus ; 
  statusKeys = Object.keys(Orderstatus).filter(k => typeof Orderstatus[k as any] === 'number');
  MesageResponse!: string;
  NewOrderForm = new FormGroup({
    // Renomeie os formControls para bater com a interface IserviceManager
    clientName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    // O tipo date pode vir como string da API, mesmo sendo tipo Date na interface
    creatAt: new FormControl('', Validators.required), 
    status: new FormControl<number | null>(null, Validators.required) 

   
  });
  
private orderId: number | null = null;
  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        if (id) {
          this.orderId =Number(id);
          return this.conectionService.GetOrder(Number(id));
        }
        throw new Error('ID do pedido não encontrado na rota.');
      })
    ).subscribe({
      next: (orderData: IserviceManager) => {
        
        // Use patchValue para preencher o formulário com os dados recebidos
        this.NewOrderForm.patchValue({
          clientName: orderData.clientName,
          description: orderData.description,
          status: orderData.status, // Isso agora funciona
          creatAt: this.formatDateForInput(orderData.creatAt) 
        });
      },
      error: (err) => {
        console.error("Erro ao carregar dados do pedido:", err);
      }
    });
  }

  // Função auxiliar para formatar a data (YYYY-MM-DD)
  private formatDateForInput(dateValue: Date | string): string {
    if (!dateValue) return '';
    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    // Garante o formato correto para input type="date"
    return date.toISOString().split('T')[0]; 
  }

  onSubmit() {
   if (this.NewOrderForm.valid && this.orderId !== null) {
      
        // 1. Obtenha os valores do formulário (que virão como string)
        const formData = this.NewOrderForm.value; 

        // 2. Converta o status para number (a API espera um número inteiro)
        const statusAsNumber = Number(formData.status); 

        // 3. Crie o objeto final, incluindo o ID e os dados corrigidos
        const updatedOrderData = {
           
            id: this.orderId, 
            clientName: formData.clientName,
            description: formData.description,
            creatAt: formData.creatAt,
            // Envie o status como um número
            status: statusAsNumber 
        };
        this.MesageResponse="Atualização concluida com sucesso";
        this.conectionService.PatchOrder(this.orderId, updatedOrderData).subscribe ({
         
          next: (response) => {
     
      setTimeout(() => { 
     this.router.navigate(['details',this.orderId]);
     this.MesageResponse = '';
    }, 1000);
      
    
    },
    });

    } else {
        console.warn('Formulário inválido ou ID do pedido ausente.');
    }
  }
}
