import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { SnippetsService } from '../../services/snippets.service';
import { SnippetDataService } from '../../services/snippet-data.service';
import { ISnippet } from '../../models/snippets.model';

@Component({
  selector: 'app-snippet-table',
  templateUrl: './snippet-table.component.html',
  styleUrls: ['./snippet-table.component.scss']
})
export class SnippetTableComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'name', 'language', 'other_tags', 'created_at', 'private', 'favorite', 'view'
  ];
  snippetsAll: ISnippet[] = [];
  dataSource = new MatTableDataSource<ISnippet>();
  snippetSubscription: Subscription;

  constructor(
    private snipService: SnippetsService,
    private snipDataService: SnippetDataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subToSnippetsAdded();
    this.snipService.fetchCreatedSnippets();
    this.snipService.fetchAvailableSnippets();
  }

  subToSnippetsExist() {
    this.snippetSubscription = this.snipService.getSnippetsAdded()
      .subscribe(
        (snippets: any) => {
          const [allSnippets] = snippets;

          this.snippetsAll = [];
          this.snippetsAll = allSnippets;
          this.dataSource.data = this.snippetsAll;
        }
      );
  }

  subToSnippetsAdded() {
    this.snippetSubscription = this.snipService.getSnippetsAdded()
      .subscribe(
        (snippets: any) => {
          const [allSnippets] = snippets;

          this.snippetsAll = [];
          this.snippetsAll = allSnippets;
          this.dataSource.data = this.snippetsAll;
        }
      );
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.value.trim();
    filterValue = filterValue.value.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editSnippet(snippet: ISnippet) {
    this.snipDataService.passSnippet(snippet);
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  removeSnippet(snippet: ISnippet) {
    this.snipService.deleteSnippet(snippet);
  }

  addToFavorite(snippet: ISnippet) {
    snippet.favorite = !snippet.favorite;
    this.snipService.updateSnippet(snippet);
  }

  ngOnDestroy() {
    this.snippetSubscription.unsubscribe();
  }

}
