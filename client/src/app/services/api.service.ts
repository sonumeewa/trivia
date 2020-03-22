import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthTokenManager } from './auth-token-manager.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private authTokenManager: AuthTokenManager) { }

  login(email: string, psw: string): Observable<any> {    
    return this.extractToken(this.authTokenManager
      .post("/login", {
        email,
        psw
      }));
  }

  private extractToken(base: Observable<any>) : Observable<any> {
    return base.pipe(
      map(data => {
        if (data.success) {          
          this.authTokenManager.setAuthToken(data.token);

          data.token = '';
        }

        return data;
      })
    );
  }

  logout() {
    this.authTokenManager.setAuthToken('');
  }
}