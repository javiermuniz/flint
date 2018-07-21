import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { from } from 'rxjs';

// TODO: Properly implement provider pattern for this
function getWindow (): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private afa: AngularFireAuth) {}

  public login(email: string, password: string ) {
    return from(this.afa.auth.signInWithEmailAndPassword(email, password));
  }

  public logout() {
    
    return from(this.afa.auth.signOut());
  }

  public signUp(user: any) {
    return from(this.afa.auth.createUserWithEmailAndPassword(user.email, user.password));
  }

  public resetPassword(email: string) {
    const window = getWindow();
    const url = `${window.location.protocol}//${window.location.host}/auth/login`;
    return from( this.afa.auth.sendPasswordResetEmail(email, {
      url,
    }));
  }

  public get currentUser() {
    return this.afa.auth.currentUser;
  }

}
