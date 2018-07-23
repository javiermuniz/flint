import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { from, Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireFunctions } from '../../../node_modules/angularfire2/functions';

// TODO: Properly implement provider pattern for this
function getWindow (): any {
  return window;
}

export interface IUser {
  email: string,
  password?: string,
  firstName: string,
  lastName: string,
  stripeToken: any,
  plan: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private afa: AngularFireAuth, 
    private aff: AngularFireFunctions) {}

  public login(email: string, password: string ): Promise<firebase.auth.UserCredential> {
    return this.afa.auth.signInWithEmailAndPassword(email, password);
  }

  public logout(): Promise<void> {
    return this.afa.auth.signOut();
  }

  public async signUp(user: IUser) {
    const result = await this.aff.functions.httpsCallable('createUser')(user);
    return this.login(user.email, user.password);
  }

  public resetPassword(email: string) {
    const window = getWindow();
    const url = `${window.location.protocol}//${window.location.host}/auth/login`;
    return from( this.afa.auth.sendPasswordResetEmail(email, {
      url,
    }));
  }

  public get user(): Observable<firebase.User>  {
    return this.afa.user;
  }

} 
