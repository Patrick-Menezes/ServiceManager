import { Component, signal } from '@angular/core';

import { Home } from "./components/home/home";
import { Page } from "./components/page/page";
import { AddOrder } from "./components/add-order/add-order";

@Component({
  selector: 'app-root',
  imports: [Page],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
