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
export class SnippetEditComponent implements OnInit {
  addedNewInput = 0;
  code = '<p></p>';
  currentLanguage: string;
  editMode = false;
  editorOptions = { theme: 'vs-dark', language: 'html'};
  id: number;
  languages: Object[];
  otherTags: string[] = [];
  privacySetting = false;
  tag: string;
  snippetname: string;
  currentSnippet: any;
  snipSubscription: Subscription;

  constructor(private langService: LanguagesService,
              private snipService: SnippetsService,
              private snipDataService: SnippetDataService,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.currentSnippet = this.snipDataService.getSnippet();
    if (this.currentSnippet) this.displaySnippet();
    // this.snipDataService.snippet
    //   .subscribe(
    //     snippet => {
    //       this.currentSnippet = snippet;
    //       this.displaySnippet();
    //     }
    //   );
    this.languages = this.langService.getLanguages();
  }

  ngAfterViewChecked() {
    if (this.currentSnippet) this.handleSetLanguage(this.currentSnippet.language);
  }

  displaySnippet() {
    this.editMode = true;
    this.initCode();
  }

  onChangePrivacy() {
    this.privacySetting = !this.privacySetting;
  }

  handleSetLanguage(language) {
    let curLanguage: string = '';

    if (language.value) curLanguage = language.value;
    else curLanguage = language;
    window['monaco'].editor.setModelLanguage(
      window['monaco'].editor
      .getModels()[0], curLanguage
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
      private: snippet.value.private || false
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
      this.otherTags = this.currentSnippet.other_tags;
      this.snippetname = this.currentSnippet.name;
      this.code = this.currentSnippet.code;
      this.privacySetting = this.currentSnippet.private;
      
    }

  }

  ngOnDestroy() {
    this.editMode = false;
    this.currentSnippet = null;
    this.snipDataService.clear();
  }

}
