import { Component,input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-menu-item',
  imports: [RouterLink,CommonModule],
  templateUrl: './menu-item.html',

})
export class MenuItem {

readonly label = input.required<string>();
readonly route = input.required<string>();


}
