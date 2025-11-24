import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./components/home/home";
import { AddOrderService } from "./components/addOrderService/add-order-service";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, AddOrderService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
