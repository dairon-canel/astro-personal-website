export type BaseLayoutProps = {
  title?: string;
  description?: string;
  preloadImage?: string;
  preloadImageSizes?: string;
  preloadImageSrcSet?: string;
  frontmatter?: {
    minutesRead: string;
    title: string;
    file: string;
    url: string;
    featured?: boolean;
  };
};

export enum Form {
  Initial,
  Loading,
  Success,
  Error,
}

export type FormState = {
  state: Form;
  message?: string;
};

export type Views = {
  total: number;
};
