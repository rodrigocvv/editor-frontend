import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-free-document-entry',
  templateUrl: './free-document-entry.component.html',
  styleUrls: ['./free-document-entry.component.css']
})
export class FreeDocumentEntryComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private authFire: AngularFireAuth) { 

  }

  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;

  ngOnInit() {

/*
    this.authFire.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        // ...
      } else {
        // User is signed out.
        // ...
      }
      // ...
    });*/

    this.authFire.auth.signInAnonymously().then(user =>{


      // console.log(JSON.stringify(user));
      this.itemsRef = this.db.list("free-document");
      // console.log(JSON.stringify(this.itemsRef));
      //this.itemsRef.push({"content":"via app com id", "idDocument":"12345"})


      //this.items = this.db.list('items').valueChanges();
      //this.db.database.
      //console.log(JSON.stringify(this.items));



    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });


  }

}
