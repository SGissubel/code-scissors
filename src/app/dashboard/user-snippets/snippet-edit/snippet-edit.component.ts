import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SnippetsService } from '../../services/snippets.service';
import { LanguagesService } from './languages.service';
import { ISnippet, ISnipForm } from '../../models/snippets.model';

@Component({
  selector: 'app-snippet-edit',
  templateUrl: './snippet-edit.component.html',
  styleUrls: ['./snippet-edit.component.scss']
})
export class SnippetEditComponent implements OnInit, OnDestroy {
  addedNewInput = 0;
  code = '<p></p>';
  currentLanguage: string;
  editMode = false;
  editorOptions = { theme: 'vs-dark', language: 'html'};
  id: number;
  languages: Object[];
  otherTags: string[];
  privacySetting: boolean;
  tag: string;
  snippetname: string;
  currentSnippet: any;
  snippetSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private langService: LanguagesService,
              private snipService: SnippetsService) { }

  ngOnInit() {
    this.languages = this.langService.getLanguages();
    this.snippetSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initCode();
        }
      );
  }

  onChangePrivacy() {
    this.privacySetting = !this.privacySetting;
  }

  handleSetLanguage(language) {
    window.monaco.editor.setModelLanguage(
      window.monaco.editor
      .getModels()[0], language.value
    );
  }

  addTag(tag: NgForm) {
    this.otherTags.push(tag.value);
  }

  onRemoveTag(index: number) {
    this.otherTags.splice(index, 1);
  }

  oncodeTagsSubmit(snippet: ISnipForm) {
    this.otherTags.push(snippet.value.language);
    const newSnip: ISnippet = {
      name: snippet.value.snippetname,
      other_tags: this.otherTags || null,
      code: this.code,
      language: snippet.value.language,
      favorite: false,
      private: snippet.value.private
    };
    this.snipService.createdNewSnippet(newSnip);
  }

  private initCode() {
    this.tag = '';
    this.otherTags = [];
    this.snippetname = '';
    this.code = '';

    if (this.editMode) {
      this.currentLanguage = this.currentSnippet.language;
      this.otherTags = this.currentSnippet.otherTags;
      this.snippetname = this.currentSnippet.name;
      this.code = this.currentSnippet.code;
      this.privacySetting = this.currentSnippet.private;
      this.handleSetLanguage(this.currentSnippet.language);
    }

  }

  ngOnDestroy() {
    this.snippetSubscription.unsubscribe();
  }

}
