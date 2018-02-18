import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { SnippetsService } from '../services/snippets.service';
import { UserDataService } from '../services/userData.sevice';
import { ISnippet } from '../models/snippets.model';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  snippets: ISnippet[] = [];
  snippetSubscription: Subscription;

  constructor(private userService: UserDataService,
              private snipService: SnippetsService) { }

  ngOnInit() {
    this.snippetSubscription = this.snipService.snippetsAdded
      .subscribe(
        (snippets: ISnippet[]) => {
          debugger;
          this.snippets = snippets;
        }
      );
    this.snipService.fetchCreatedSnippets();
    this.snipService.fetchAvailableSnippets();
    // this.user = this.userService.getuserData();
    // this.snippets = get all snippet data
    console.log(this.user);
  }

  ngOnDestroy() {
    this.snippetSubscription.unsubscribe();
  }

}
