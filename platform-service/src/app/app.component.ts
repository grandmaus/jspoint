import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'platform';
  user: User;

  constructor(private apollo: Apollo) {}
  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            user(id: 35) {
              name
            }
          }
        `
      })
      .valueChanges.subscribe(result => {
        this.user = result.data.user;
      });
  }
}
