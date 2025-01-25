import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiErrorService {

  apiError = new Subject<string>()

  sendError(message: string): void {
    this.apiError.next(message)
  }

}
