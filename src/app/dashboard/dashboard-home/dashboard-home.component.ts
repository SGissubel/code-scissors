import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SnippetsService } from '../services/snippets.service';

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
    debugger
    this.snippetSubscription = this.snipService.getSnippetsExist()
      .subscribe(
        (exists: boolean) => {
          debugger
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
