import { Component, input } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { MenuItem } from "../menu-item/menu-item";

@Component({
  selector: 'app-page',
  imports: [RouterOutlet, MenuItem],
  templateUrl: './page.html',
  styleUrl: './page.scss',
})
export class Page {


  
}
