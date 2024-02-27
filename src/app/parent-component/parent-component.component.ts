import { Component } from '@angular/core';
import { ChildComponentComponent } from '../child-component/child-component.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parent-component',
  standalone: true,
  imports: [
    ChildComponentComponent,
    FormsModule
  ],
  templateUrl: './parent-component.component.html',
  styleUrl: './parent-component.component.css'
})
export class ParentComponentComponent {

  childData!: string;
  parentData: string = '';

  onChildEvent(data: string) {
    this.childData = data;
  }

}
