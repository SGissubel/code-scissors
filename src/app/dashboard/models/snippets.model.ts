export interface ISnippet {
  id?: string;
  user_id?: string;
  name: string;
  language: string;
  other_tags?: string[];
  code: string;
  favorite?: boolean;
  private: boolean;
}

export interface ISnipForm {
  value: {
    snippetname: string;
    other_tags: string[] | null;
    code: string;
    language: string;
    private: boolean;
  };
}


