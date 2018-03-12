import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { SnippetsService } from '../../services/snippets.service';
import { LanguagesService } from './languages.service';
import { SnippetDataService } from '../../services/snippet-data.service';
import { ISnippet, ISnipForm } from '../../models/snippets.model';

@Component({
  selector: 'app-snippet-edit',
  templateUrl: './snippet-edit.component.html',
  styleUrls: ['./snippet-edit.component.scss']
})
export class SnippetEditComponent implements OnInit, AfterViewChecked, OnDestroy {
  addedNewInput = 0;
  code = '<p></p>';
  currentLanguage: string;
  currentSnippet: any;
  editMode = false;
  editorOptions = { theme: 'vs-dark', language: 'html'};
  id: number;
  languages: Object[];
  languageSet = false;
  otherTags: string[] = [];
  privacySetting = false;
  tag: string;
  snippetname: string;
  snipSubscription: Subscription;

  constructor(private langService: LanguagesService,
              private snipService: SnippetsService,
              private snipDataService: SnippetDataService,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.currentSnippet = this.snipDataService.getSnippet();
    if (this.currentSnippet) this.displaySnippet();
    this.languages = this.langService.getLanguages();
  }

  ngAfterViewChecked() {
    if (this.currentSnippet && !this.languageSet) {
      this.checkForEditor();
    }
  }

  checkForEditor() {
    this.languageSet = true;
    this.handleSetLanguage(this.currentLanguage);
  }

  displaySnippet() {
    this.editMode = true;
    this.initCode();
  }

  onChangePrivacy() {
    this.privacySetting = !this.privacySetting;
  }

  handleSetLanguage(language) {
    let curLanguage = '';
    let editorNotPresent = false;

    if (language.value) {
      this.currentLanguage = language.value;
      curLanguage = this.currentLanguage;
    } else curLanguage = this.currentLanguage;

    if (window['monaco']) {
      if (window['monaco'].editor.getModels()[0]) {
        editorNotPresent = false;
        window['monaco'].editor.setModelLanguage(
          window['monaco'].editor
          .getModels()[0], curLanguage
        );
      } else {
        editorNotPresent = true;
      }
    } else {
      editorNotPresent = true;
    }
    if (editorNotPresent) {
      setTimeout(() => {
        this.languageSet = false;
        this.checkForEditor();
      }, 2000);
    }
  }

  addTag(tag: NgForm) {
    this.otherTags.push(tag.value);

  }

  onRemoveTag(index: number) {
    this.otherTags.splice(index, 1);
  }

  oncodeTagsSubmit(snippet: ISnipForm) {
    const newSnip: ISnippet = {
      name: snippet.value.snippetname,
      other_tags: this.otherTags || null,
      code: this.code,
      language: snippet.value.language,
      favorite: false,
      private: snippet.value.private || false
    };
    if (this.editMode) {
      newSnip.id = this.currentSnippet.id;
      if (this.currentSnippet.language !== snippet.value.language) {
        newSnip.other_tags.push(snippet.value.language);
      }
      this.snipService.updateSnippet(newSnip);
    } else {
      newSnip.other_tags.push(snippet.value.language);
      this.snipService.createdNewSnippet(newSnip);
    }
  }

  private initCode() {
    this.tag = '';
    this.otherTags = [];
    this.snippetname = '';
    this.code = '';

    if (this.editMode) {
      this.currentLanguage = this.currentSnippet.language;
      this.otherTags = this.currentSnippet.other_tags;
      this.snippetname = this.currentSnippet.name;
      this.code = this.currentSnippet.code;
      this.privacySetting = this.currentSnippet.private;
    }

  }

  ngOnDestroy() {
    this.editMode = false;
    this.languageSet = false;
    this.currentSnippet = null;
    this.snipDataService.clear();
  }

}
