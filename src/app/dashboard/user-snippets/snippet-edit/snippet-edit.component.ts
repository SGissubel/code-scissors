import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { LanguagesService } from './languages.service';

@Component({
  selector: 'app-snippet-edit',
  templateUrl: './snippet-edit.component.html',
  styleUrls: ['./snippet-edit.component.scss']
})
export class SnippetEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  editorOptions = { theme: 'vs-dark', language: 'html'};
  languages: Object[];
  tag: string;
  otherTags: string[];
  snippetname: string;
  code = '<p></p>';
  addedNewInput = 0;
  currentSnippet: any;
  snippetSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private langService: LanguagesService) { }

  ngOnInit() {
    this.languages = this.langService.getLanguages();
    this.snippetSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          // get data
          this.initCode();
        }
      );
  }

  addTag(tag: NgForm) {
    this.otherTags.push(tag.value);
  }

  onSubmitCode() {
    console.log(this.code);
  }

  private initCode() {
    this.tag = '';
    this.otherTags = [];
    this.snippetname = '';
    this.code = '';

    if (this.editMode) {
      this.tag = this.currentSnippet.tag;
      this.otherTags = this.currentSnippet.otherTags;
      this.snippetname = this.currentSnippet.name;
      this.code = this.currentSnippet.code;
    }
  }

  ngOnDestroy() {
    this.snippetSubscription.unsubscribe();
  }

}
