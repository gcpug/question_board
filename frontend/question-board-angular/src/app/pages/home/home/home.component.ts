import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import {
  Firestore,
  collectionData,
  DocumentData,
  collection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

/**
 * ログイン後のメイン画面
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  events$: Observable<DocumentData[]>;
  user$ = authState(this.auth);

  constructor(private auth: Auth, private firestore: Firestore) {
    const coll = collection(this.firestore, 'Events');
    this.events$ = collectionData(coll);
  }

  ngOnInit(): void {}
}
