import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private Users = [
    {username:'admin',password:'1234',roles:['ADMIN','USER']},
    {username:'user1',password:'1234',roles:['USER']},
    {username:'user2',password:'1234',roles:['USER']}

  ]

  public isAuthenticated?:boolean;
  public userAuthenticated:any;
  public token!:string;

  constructor() { }

  public login(username:string,password:string)
  {
    let user;
    this.Users.forEach(u=>{
      if(u.username == username && u.password == password)
      {
        user = u;
        this.token=btoa(JSON.stringify({username:u.username,roles:u.roles}))
      }
    });
    if(user){
      this.isAuthenticated = true;
      this.userAuthenticated = user;
    }else {
      this.isAuthenticated = false;
      this.userAuthenticated = undefined;
    }
  }

  public isAdmin(){
    if(this.userAuthenticated){
      if(this.userAuthenticated.roles.indexOf('ADMIN')>-1)
      {
        return true;
      }
    }
    return false;
  }

  public saveAuthencatedUser(){
    if(this.userAuthenticated){
      localStorage.setItem("authToken",this.token);
    }
  }

  public loadUserauthenticatedFromLocalStorage(){
    let tok = localStorage.getItem('authToken');
    if(tok){
      let user = JSON.parse(atob(tok));
      //this.userAuthenticated = user;
      this.userAuthenticated = {username:user.username,roles:user.roles}
      this.isAuthenticated = true;
      this.token =tok ;
    }

  }
  public remoteFromLocalStorage(){
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.token = '';
  }

}
