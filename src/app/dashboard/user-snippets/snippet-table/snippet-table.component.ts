import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { SnippetsService } from '../../services/snippets.service';
import { ISnippet } from '../../models/snippets.model';

@Component({
  selector: 'app-snippet-table',
  templateUrl: './snippet-table.component.html',
  styleUrls: ['./snippet-table.component.scss']
})
export class SnippetTableComponent implements OnInit {
  displayedColumns = ['name', 'language', 'other_tags', 'created_at', 'private'];
  snippetsAll: ISnippet[];
  dataSource = new MatTableDataSource<ISnippet>();
  snippetSubscription: Subscription;
  constructor(private snipService: SnippetsService) {}

  ngOnInit() {
    this.snippetSubscription = this.snipService.snippetsAdded
      .subscribe(
        (snippets: ISnippet[]) => {
          this.snippetsAll = snippets;
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

  addToFavorite(snippet: ISnippet) {
    snippet.favorite = !snippet.favorite;
    this.snipService.updateSnippet(snippet);
  }

  ngOnDestroy() {
    this.snippetSubscription.unsubscribe();
  }

}
