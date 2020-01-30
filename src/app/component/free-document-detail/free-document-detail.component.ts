import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-free-document-detail',
  templateUrl: './free-document-detail.component.html',
  styleUrls: ['./free-document-detail.component.css']
})

export class FreeDocumentDetailComponent implements OnInit {

  constructor(private databaseFire: AngularFireDatabase, private authFire: AngularFireAuth, private route: ActivatedRoute) { }

  private idDocument: string;

  itemsRef: AngularFireList<any>;
  realtimeList: Observable<unknown[]>;

  itemKey: string;

  content: string;

  ngOnInit() {
    this.authFire.auth.signInAnonymously().then(user => {
      this.route.paramMap.subscribe(params => {
        this.idDocument = params.get('idDocument');
        this.realtimeList = this.databaseFire.list('free-document', ref => ref.orderByChild('idDocument').equalTo(this.idDocument)).valueChanges();
        this.realtimeList.subscribe((queriedItems: Array<any>) => {
          this.itemsRef = this.databaseFire.list("free-document");
          if (queriedItems.length === 0) {
            let newObject = {
              "idDocument": this.idDocument,
              "content": ""
            };
            this.itemsRef.push(newObject);
          } else {
            this.content = queriedItems[0]['content'] as string;
          }
        });
        this.databaseFire.list('free-document', ref => ref.orderByChild('idDocument').equalTo(this.idDocument)).snapshotChanges().subscribe(data => {
          this.itemKey = data[0].key;
        });

        // this.databaseFire.list('free-document', ref => ref.orderByChild('idDocument').equalTo(this.idDocument)).snapshotChanges()
        //   .pipe(
        //     map(changes => {
        //       return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        //     })
        //   );
      });


    });
  }

  updateItem() {
    this.itemsRef.update(this.itemKey, { "idDontent": this.idDocument, "content": this.content });
  }

}
