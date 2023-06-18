interface ITableOfContents {
    entities: {
        pages: Record<string, IPageMeta>;
    };
    topLevelIds: string[];
}

interface IPageMeta {
    id: string;
    title: string;
    url: string;
    parentId: string;
    level: number;
    tabIndex: number;
    pages: string[];
    anchors: string[];
}
