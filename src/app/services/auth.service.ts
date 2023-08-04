import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Plugins } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, from, BehaviorSubject } from 'rxjs';
import { Pay } from '../model/pay';

import { AuthUser } from '../model/auth-user';
import { map, tap } from 'rxjs/operators';
// import { Socket } from 'ngx-socket-io';

interface loginData {
  token: string,
  userId: string,
  email: string,
  mobile: string,
  name: string,
  expiryHours: number,
  contactAddress: string
}

interface successMsg {
  message: string,
  data: string
}

interface createUser {
  message: string;
  user: { _id: string,
          name: string,
          email: string,
          phone: number,
          password: string,
          address: string,
          regFunction: string,
          createdAt: Date,
          updatedAt: Date
      };
  }

  interface payment {
    message: string;
    user: { _id: string,
            email: string,
            name: string,
            paymentMode: string,
            paymentDate: Date,
            paymentYear: number,
            amount: number,
            createdAt: Date,
            updatedAt: Date
        };
    }

  interface getMembers {
    message: string;
    user: { _id: string,
            name: string,
            email: string,
            phone: number,
            password: string,
            address: string,
            regFunction: string,
            createdAt: Date,
            updatedAt: Date
        };
    }

    interface settings {
      data: {
        _id: string,
        currentYear: number
      }
    }


  interface forgotPass {
    message: string;
    token: string;
  }



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: User;
  private _loggedInUser = new BehaviorSubject<AuthUser>(null);
  private loggedInUser: AuthUser;

  allMembers: User;
  selectedUser: User;
  savedYear;
  
  url = "http://localhost:8081"; //local url

  // url = "https://ashon-api.herokuapp.com"; //live url
  private _token: string;
  private _userIsAuthenticated = false;
  private _userEmail: string;
  constructor(private http: HttpClient) { }

    private storeAuthData (userId: string, email: string, token: string, tokenExpiryDate: Date, mobile: string, firstName: string, contactAddress: string) {
      const data = JSON.stringify({userId: userId, email: email, token: token, tokenExpiryDate: tokenExpiryDate, mobile: mobile, firstName: name, contactAddress: contactAddress});
      Plugins.Storage.set({key: 'authData', value: data});
    };
  
  
    set user(userData: User) {
      this._user = userData;
    }
  
    get user() {
      return this._user;
    }
  
    set userEmail(email: string) {
      this._userEmail = email;
    }
  
    get userEmail() {
      return this._userEmail;
    }
  
    set token(token: string) {
      this._token = token;
    }
  
    get token() {
      return this._token;
    }
  
    
  registerMember(data: User) {
      const headers: HttpHeaders = new HttpHeaders(
        {'Content-Type': 'application/json'}
      );
    
      return this.http.post<createUser>(this.url+'/user/addmember', data, { headers })
      .toPromise()
      .then(data => {
        console.log(data);
        return data;
      })
      .catch( (err) => {
        console.log('Back Error: ' + err.error.message);
        console.log('Back Error Code: ' + err.status);
    
        return err;
      })
      
  }
   

  updateMember(data: User) {
    const headers: HttpHeaders = new HttpHeaders(
      {'Content-Type': 'application/json'}
    );
  
    console.log('input::' + data.phone, data.email, data.address, data.regFunction, data.name);
    return this.http.post<createUser>(this.url+'/user/updatemember', data, { headers })
    .toPromise()
    .then(data => {
      console.log(data);
      return data;
    })
    .catch( (err) => {
      console.log('Back Error: ' + err.error.message);
      console.log('Back Error Code: ' + err.status);
  
      return err;
    })
    
}



postPayment(data: Pay) {
    const headers: HttpHeaders = new HttpHeaders(
      {'Content-Type': 'application/json'}
    );
  
    return this.http.post<payment>(this.url+'/user/postpayment', data, { headers })
    .toPromise()
    .then(data => {
      console.log(data);
      return data;
    })
    .catch( (err) => {
      console.log('Back Error: ' + err.error.message);
      console.log('Back Error Code: ' + err.status);
  
      return err;
    })
    
}


getMembers() {
    const headers: HttpHeaders = new HttpHeaders(
      {'Content-Type': 'application/json'}
    );
  
    return this.http.get<getMembers>(this.url+'/user/members', { headers })
    .toPromise()
    .then(data => {
      console.log(data);
      return data;
    })
    .catch( (err) => {
      console.log('Back Error: ' + err.error.message);
      console.log('Back Error Code: ' + err.status);
  
      return err;
    })
    
}

getOneMember(search: string) {
  const headers: HttpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  return this.http.post<getMembers>(this.url+'/user/searchmembers', {search: search} , { headers })
  .toPromise()
  .then(data => {
    console.log(data);
    return data;
  })
  .catch( (err) => {
    console.log('Back Error: ' + err.error.message);
    console.log('Back Error Code: ' + err.status);

    return err;
  })

}


deleteMember(email: string) {
  const headers: HttpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  return this.http.post<successMsg>(this.url+'/user/deletemember', {email: email} , { headers })
  .toPromise()
  .then(data => {
    console.log(data);
    return data.message;
  })
  .catch( (err) => {
    console.log('Back Error: ' + err.error.message);
    console.log('Back Error Code: ' + err.status);

    return err;
  })

}

changePassword(email: string, oldpass: string, newpass: string) {
  const headers: HttpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  return this.http.post(this.url+'/user/changepassword', {email: email, oldPass: oldpass, newPass: newpass} , { headers })
  .toPromise()
  .then(data => {
    console.log(data);
    return data;
  })
  .catch( (err) => {
    console.log('Back Error: ' + err.error.message);
    console.log('Back Error Code: ' + err.status);

    return err;
  })

}


getCurrentYearPayment(email: string, year: number) {
  const headers: HttpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  return this.http.post<payment>(this.url+'/user/onemembercurrentyear', {email: email, year: year}, { headers })
  .toPromise()
  .then(data => {
    console.log(data);
    return data;
  })
  .catch( (err) => {
    console.log('Back Error: ' + err.error.message);
    console.log('Back Error Code: ' + err.status);

    return err;
  })
  
}


getSavedSettings() {
  const headers: HttpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  return this.http.get<settings>(this.url+'/user/currentyear', { headers })
  .toPromise()
  .then(data => {
    console.log('settings::' + data);
    return data;
  })
  .catch( (err) => {
    console.log('Back Error: ' + err.error.message);
    console.log('Back Error Code: ' + err.status);

    return err;
  })
}


updateSettings() {
  const headers: HttpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  // console.log('input::' + data.phone, data.email, data.address, data.regFunction, data.name);
  return this.http.post<settings>(this.url+'/user/currentyear', { headers })
  .toPromise()
  .then(data => {
    console.log(data);
    return data;
  })
  .catch( (err) => {
    console.log('Back Error: ' + err.error.message);
    console.log('Back Error Code: ' + err.status);

    return err;
  })
  
}



markOneUserPaid(email: string) {
  const headers: HttpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  // console.log('input::' + data.phone, data.email, data.address, data.regFunction, data.name);
  return this.http.post(this.url+'/user/oneuserpaid', {email: email}, { headers })
  .toPromise()
  .then(data => {
    console.log(data);
    return data;
  })
  .catch( (err) => {
    console.log('Back Error: ' + err.error.message);
    console.log('Back Error Code: ' + err.status);

    return err;
  })
  
}


updateallmembersunpaid() {
  const headers: HttpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  // console.log('input::' + data.phone, data.email, data.address, data.regFunction, data.name);
  return this.http.post(this.url+'/user/setunpaidforall', { headers })
  .toPromise()
  .then(data => {
    console.log(data);
    return data;
  })
  .catch( (err) => {
    console.log('Back Error: ' + err.error.message);
    console.log('Back Error Code: ' + err.status);

    return err;
  })
  
}



getOneMemberPayment(email: string) {
  const headers: HttpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  return this.http.get<payment>(this.url+'/user/onememberpayment/' + email, { headers })
  .toPromise()
  .then(data => {
    console.log(data);
    return data;
  })
  .catch( (err) => {
    console.log('Back Error: ' + err.error.message);
    console.log('Back Error Code: ' + err.status);

    return err;
  })
  
}

forgotPassword(username: string) {
        const headers: HttpHeaders = new HttpHeaders(
          {'Content-Type': 'application/json'}
        );
      
        return this.http.post<forgotPass>(this.url+'/user/forgotpassword', {username: username}, { headers })
        .toPromise()
        .then(data => {
          console.log('serve: ' + JSON.stringify(data));
          // const userId = data.token;
          
        return data;
      })
      .catch( (err) => {
      console.log('Back Error: ' + err.error.message);
      console.log('Back Error Code: ' + err.status);
      
    return err;
  })
        
}
  
confirmToken(username: string, token: string) {
          const headers: HttpHeaders = new HttpHeaders(
            {'Content-Type': 'application/json'}
          );
        
          return this.http.post<forgotPass>(this.url+'/user/confirmtoken', {username: username, token: token}, { headers })
          .toPromise()
          .then(data => {
            console.log('serve: ' + JSON.stringify(data));
            // const userId = data.token;
            
          return data;
        })
        .catch( (err) => {
        console.log('Back Error: ' + err.error.message);
        console.log('Back Error Code: ' + err.status);
        
      return err;
  });
          
}
  
  
confirmMobileToken(username: string, token: string) {
    const headers: HttpHeaders = new HttpHeaders(
      {'Content-Type': 'application/json'}
      );
          
    return this.http.post<forgotPass>(this.url+'/user/confirmmobiletoken', {username: username, token: token}, { headers })
      .toPromise()
      .then(data => {
      console.log('serve: ' + JSON.stringify(data));
      // const userId = data.token;
              
        return data;
        })
        .catch( (err) => {
        console.log('Back Error: ' + err.error.message);
        console.log('Back Error Code: ' + err.status);
          
        return err;
    });
            
  }
  
  confirmEmailToken(username: string, token: string) {
              const headers: HttpHeaders = new HttpHeaders(
                {'Content-Type': 'application/json'}
              );
            
              return this.http.post<forgotPass>(this.url+'/user/confirmemailtoken', {username: username, token: token}, { headers })
              .toPromise()
              .then(data => {
                console.log('serve: ' + JSON.stringify(data));
                // const userId = data.token;
                
                return data;
              })
              .catch( (err) => {
                console.log('Back Error: ' + err.error.message);
                console.log('Back Error Code: ' + err.status);
            
                return err;
    });
              
  }
  
  generateTokenToEmail(username: string) {
    const headers: HttpHeaders = new HttpHeaders(
      {'Content-Type': 'application/json'}
    );
  
    return this.http.post<forgotPass>(this.url+'/user/sendtokentoemail', {username: username}, { headers })
    .toPromise()
    .then(data => {
      console.log('serve: ' + JSON.stringify(data));
      // const userId = data.token;
      
      return data;
    })
    .catch( (err) => {
      console.log('Back Error: ' + err.error.message);
      console.log('Back Error Code: ' + err.status);
  
      return err;
    });
  }
  
  
  resetPassword(username: string, password: string) {
          const headers: HttpHeaders = new HttpHeaders(
            {'Content-Type': 'application/json'}
          );
        
          return this.http.post<forgotPass>(this.url+'/user/resetpassword', {username: username, password: password}, { headers })
          .toPromise()
          .then(data => {
            console.log('serve: ' + JSON.stringify(data));
            // const userId = data.token;
            
            return data;
          })
          .catch( (err) => {
            console.log('Back Error: ' + err.error.message);
            console.log('Back Error Code: ' + err.status);
        
            return err;
          });
        }
  

login(username: string, password: string) {
  const headers: HttpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );
        
  return this.http.post<loginData>(this.url+'/user/memberlogin', {username: username, password: password}, { headers })
    .toPromise()
    .then(data => {
    console.log('serve: ' + JSON.stringify(data));
    const userId = data.userId;
    const token = data.token;
    const email = data.email;
    const mobile = data.mobile;
    const name = data.name;
    const expiry = data.expiryHours;
    const contactAddress = data.contactAddress;
      
    const time = new Date().getTime();
    const tokenExpDate = new Date(time + (expiry + 1000));
            
    this.storeAuthData(userId, email, token, tokenExpDate, mobile, name, contactAddress); // store login details in device memory
    const user = new AuthUser(token, tokenExpDate, userId, email, mobile, name, name, contactAddress);
    

    this._token = token; // set token property
    this._loggedInUser.next(user);
              
      return data;
        })
        .catch( (err) => {
        console.log('Back Error: ' + err.error.message);
        console.log('Back Error Code: ' + err.status);
        
        return err;
  })
          
}
     
autoLogin() {
  // Promise version of retrieving data from local storage
  // Plugins.Storage.get({key: 'authData'}) .then().catch();

        return from (Plugins.Storage.get({key: 'authData'}))
        .pipe(map(storedData => {
          if (!storedData || !storedData.value) {
            return null;
          }

          const parsedData = JSON.parse(storedData.value) as {
            userId: string;
            email: string;
            token: string;
            tokenExpiryDate: Date;
            mobile: string;
            firstName: string;
            contactAddress: string;
          };
    
          
          if (parsedData.tokenExpiryDate <= new Date()) {
            return null;
          }
          
          
          console.log('parsedData: ' + parsedData.email, parsedData.mobile, parsedData.tokenExpiryDate, parsedData.userId, parsedData.token, 'firstName:' + parsedData.firstName + ', addy::' + parsedData.contactAddress);
          
          const user = new AuthUser(parsedData.token, parsedData.tokenExpiryDate, parsedData.userId, parsedData.email, '08000' , 'Oluseye', 'lastName', parsedData.contactAddress);
          
          console.log('INuser::' + JSON.stringify(user));
          // this._loggedInUser = user;
          this._userIsAuthenticated = true;
          this._token = parsedData.token;
    
          return user;
          // return 
         }),
        tap(user => {
          if (user) {
            console.log('YEAAA::' + JSON.stringify(user));
            this._loggedInUser.next(user);
            
          }
        }),
        map (user => {
          return !!user;
        })
    );
}
    
getLoggedInUser() {
  // console.log('uService:' + this.loggedInUser.firstName);
    return this.loggedInUser;
}
 
get inuser() {
  return this._loggedInUser.asObservable()
    .pipe(map(user => {
        if (user) {
          // console.log('lgin user: ' + user.tokenId);
          return user;
        } else {
          return null;
        }
      }))
}

get userIsAuthenticated() {
  return this._loggedInUser.asObservable()
    .pipe(map(user => {
      console.log('::::Usr:' + user);
      if (user) {
            console.log('UserFOunD!!!');
            this.loggedInUser = user; // initialize a user in authService
            return !!user.token;
          } else{
            console.log('NOT user FOunD!!!');
            this.loggedInUser = null; // initialize a user in authService
            return false;
          }
        }      
    ));
}
  
get userId() {
  return this._loggedInUser.asObservable()
    .pipe(map(user => {
        if (user) {
          // console.log('lgin user: ' + user.tokenId);
          return user.userId;
        } else {
          return null;
        }
      }))
}
    
get idToken () {
  return this._loggedInUser.asObservable()
    .pipe(map(user => {
      if (user) {
        // console.log('tID:' + user.tokenId);
        return user.token;
      } else {
        return null;
      }
  }))
}
    
  
logout() {
  this._loggedInUser.next(null);
    Plugins.Storage.remove({ key: 'authData'});
      this._userIsAuthenticated = false;
      this.token = '';
      console.log('Logout service clicked!!');
      // this.socket.emit("logout", {});
      return 'SUCCESS';
  
      // return from(Auth.signOut())
      //   .pipe(map(data => {
      //     this._userIsAuthenticated = false;
      //     return 'SUCCESS';
  
      //   },
      //     err => {
      //       console.log(err.message);
      //     }));
    }
  
}
