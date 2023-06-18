export const buildTable = (root: ITableOfContents): IPageMeta[] => {
  const elements: IPageMeta[] = [];

  const dfs = (id: string) => {
    const content: IPageMeta = root.entities.pages[id];
    elements.push(content);

    if (content.pages) {
      content.pages.forEach((pageId: string) => {
        dfs(pageId);
      });
    }
  };

  root.topLevelIds.forEach((id: string) => {
    dfs(id);
  });

  return elements;
};
