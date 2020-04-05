import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  public isLoading = new BehaviorSubject<boolean>(undefined);
  constructor() {
    this.isLoading.next(false);
  }
  isLoadingState() {
    return this.isLoading;
  }
}
