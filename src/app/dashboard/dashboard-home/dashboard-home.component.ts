import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { SnippetsService } from '../services/snippets.service';
import { ISnippet } from '../models/snippets.model';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  snippetsExist = false;
  snippetSubscription: Subscription;

  constructor(private snipService: SnippetsService) { }

  ngOnInit() {
    this.snippetSubscription = this.snipService.snippetsExist
      .subscribe(
        (exists: boolean) => {
          this.snippetsExist = exists;
        }
      );
    this.snipService.fetchCreatedSnippets();
    this.snipService.fetchAvailableSnippets();
  }

  ngOnDestroy() {
    this.snippetSubscription.unsubscribe();
  }

}
