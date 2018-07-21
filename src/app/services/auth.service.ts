import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { from, Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

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
  constructor(private afa: AngularFireAuth, private afs: AngularFirestore) {}

  public login(email: string, password: string ): Promise<firebase.auth.UserCredential> {
    return this.afa.auth.signInWithEmailAndPassword(email, password);
  }

  public logout(): Promise<void> {
    return this.afa.auth.signOut();
  }

  public async signUp(user: IUser) {
    const userRecord = await this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);
    const dbRecord = await this.afs.collection('users').doc(userRecord.user.uid).set({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      stripeToken: user.stripeToken
    });
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
