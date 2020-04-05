import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { UIInfo } from '../models/ui-info.model';
import { IContainer } from 'src/app/interface/api-container.interface';
import { DropdownModel } from '../models/dorpdown.model';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommonService {
  private defaultData: UIInfo = {
    title: 'Home'
  };
public ddd = null;
  private dataSource$ = new BehaviorSubject<UIInfo>(this.defaultData);
  public authToken$ = new BehaviorSubject<string>(null);
  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  get uiInfo(): Observable<UIInfo> {
    return this.dataSource$.asObservable();
  }

  setUiInfo(info: UIInfo): void {
    this.dataSource$.next(info);
  }

  // setAccessToken(accessToken: string): void {
  //   this.authToken$.next(accessToken);
  //   this.ddd = accessToken;
  // }

  // accessToken(): Observable<string> {
  //   return this.authToken$.asObservable();
  // }

  showSuccessMsg(msg: string, duration = 2000): void {
    this.snackBar.open(msg, '', {
      duration,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['snackbar-container', 'success']
    });
  }

  showErrorMsg(msg: string, duration = 2000): void {
    this.snackBar.open(msg, '', {
      duration,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['snackbar-container', 'danger']
    });
  }

  removeEmptyProperties = (obj: any) => {
    for (const prop in obj) {
      if (obj[prop] === null || obj[prop] === undefined || obj[prop] === '') {
        delete obj[prop];
      }
    }
    return obj;
  };

  public paginatorInfo = () => {
    return { pageSize: 10, pageSizeOption: [5, 10, 20, 50, 100] };
  };

  public getDropDown = (
    dropdownName,
    conditionAt,
    conditionValue,
    menuLayer = null
  ) =>
    this.http
      .post<IContainer<DropdownModel[]>>(`/dropdown/`, {
        dropdownName: dropdownName,
        conditionAt: conditionAt,
        conditionValue: conditionValue,
        menuLayer
      })
      .pipe(
        map(response =>
          response.isExecuted && response.data ? response.data : null
        ),
        catchError(error => of(null))
      );

  public cancellationDictionary = () => {
    return {
      '/feature': '/feature-setup',
      '/module': '/module-setup',
      '/role': '/role-feature',
      '/app' : '/app-setup',
      '/user' : '/user',
      '/role-assign' : '/role-assign'
    };
  };
}
