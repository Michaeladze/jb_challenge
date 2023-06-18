export const buildTable = (root: IContents): IPageContent[] => {
  const elements: IPageContent[] = [];

  const dfs = (id: string) => {
    const content: IPageContent = root.entities.pages[id];
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
