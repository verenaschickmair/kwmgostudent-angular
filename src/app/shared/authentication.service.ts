import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

interface Token {
  exp: number;
  user: {
    id: string;
  }
}

@Injectable()
export class AuthenticationService {

  private api = 'http://api.kwmgostudent.s1910456028.student.kwmhgb.at/api/auth';

  constructor(private http: HttpClient, private router: Router) {  }

    login(username: string, password: string) : Observable<any> {
      return this.http.post(`${this.api}/login`, {
        username: username,
        password: password
      });
  }

  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }

  public setSessionStorage(token: string) {
    const decodedToken = jwt_decode(token) as Token;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);

  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
  }

  public isLoggedIn() {
    if (sessionStorage.getItem("token")) {
      let token : string = <string> sessionStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        console.log("token expired");
        sessionStorage.removeItem("token");
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

}
