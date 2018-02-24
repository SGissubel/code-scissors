import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SnippetsService } from '../../services/snippets.service';
import { LanguagesService } from './languages.service';
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

  constructor(private langService: LanguagesService,
              private snipService: SnippetsService) { }

  ngOnInit() {
    this.languages = this.langService.getLanguages();
  }

  onChangePrivacy() {
    this.privacySetting = !this.privacySetting;
  }

  handleSetLanguage(language) {
    window['monaco'].editor.setModelLanguage(
      window['monaco'].editor
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
      this.otherTags = this.currentSnippet.otherTags;
      this.snippetname = this.currentSnippet.name;
      this.code = this.currentSnippet.code;
      this.privacySetting = this.currentSnippet.private;
      this.handleSetLanguage(this.currentSnippet.language);
    }

  }

}
