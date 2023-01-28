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
  };
};

export type Views = {
  total: number;
};
