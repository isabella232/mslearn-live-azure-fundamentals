import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserAuthManager {
    public IsLoggedIn: boolean = false;
    public Token: string = "";
    public UserName: string = "";

    public SetLoginDetails(username: string, token: string) {
        this.UserName = username;
        this.Token = token;
        this.IsLoggedIn = true;
    }

    public PerformRegistration(username: string, password: string) {

    }

    public PerformLogin(username: string, password) {

    }

    public GetOptionsWithHeaders() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'token': this.Token
            })
        };
    }
}