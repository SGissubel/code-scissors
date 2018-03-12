import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { SnippetsService } from '../../services/snippets.service';
import { SnippetDataService } from '../../services/snippet-data.service';
import { ISnippet } from '../../models/snippets.model';

@Component({
  selector: 'app-snippet-table',
  templateUrl: './snippet-table.component.html',
  styleUrls: ['./snippet-table.component.scss']
})
export class SnippetTableComponent implements OnInit, OnDestroy {
  displayedColumns = ['name', 'language', 'other_tags', 'created_at', 'private', 'view'];
  snippetsAll: ISnippet[];
  dataSource = new MatTableDataSource<ISnippet>();
  snippetSubscription: Subscription;
  constructor(private snipService: SnippetsService,
              private snipDataService: SnippetDataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.snippetSubscription = this.snipService.snippetsAdded
      .subscribe(
        (snippets: ISnippet[]) => {
          const [allSnippets] = snippets;
          this.snippetsAll = [];
          this.snippetsAll = allSnippets;
          this.dataSource.data = this.snippetsAll;
        }
      );
    this.snipService.fetchCreatedSnippets();
    this.snipService.fetchAvailableSnippets();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editSnippet(snippet) {
    this.snipDataService.passSnippet(snippet);
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  addToFavorite(snippet: ISnippet) {
    snippet.favorite = !snippet.favorite;
    this.snipService.updateSnippet(snippet);
  }

  ngOnDestroy() {
    this.snippetSubscription.unsubscribe();
  }

}
