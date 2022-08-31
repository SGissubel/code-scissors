import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  languages = [
    {name: 'JavaScript', value: 'javascript'},
    {name: 'TypeScript', value: 'typescript'},
    {name: 'HTML', value: 'html'},
    {name: 'Coffee', value: 'coffee'},
    {name: 'C#', value: 'csharp'},
    {name: 'CSS', value: 'css'},
    {name: 'F#', value: 'fsharp'},
    {name: 'HandleBars', value: 'handlebars'},
    {name: 'Objective-C', value: 'objective-c'},
    {name: 'PHP', value: 'php'},
    {name: 'Python', value: 'python'},
    {name: 'Ruby', value: 'ruby'},
    {name: 'SCSS', value: 'scss'},
    {name: 'SQL', value: 'sql'},
    {name: 'JSON', value: 'json'}
  ];

  getLanguages() {
    return this.languages.slice();
  }
}
