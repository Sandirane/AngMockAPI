import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
 
  @Input() showAlert: boolean = false;
  @Input() alertClass: string = '';
  @Input() alertMessage: string = '';
  
}
