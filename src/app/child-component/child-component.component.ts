import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child-component',
  standalone: true,
  imports: [],
  templateUrl: './child-component.component.html',
  styleUrl: './child-component.component.css'
})
export class ChildComponentComponent {

  @Output() childEvent = new EventEmitter<string>();

  sendData() {
    this.childEvent.emit('Data sent from child to parent');
  }
  @Input() dataFromParent!: string;
}
