import { Injectable } from '@angular/core';
// handle all data goin to and from dashboard
@Injectable()
export class UserDataService {
  user: {id: number, name: string};
   // insert all user data above

  setUserId(user) {
    this.user = user;
  }

  getuserData() {
    return Object.assign({}, this.user);
  }

}
