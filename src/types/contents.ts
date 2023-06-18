interface IContents {
    entities: {
        pages: Record<string, IPageContent>;
    };
    topLevelIds: string[];
}

interface IPageContent {
    id: string;
    title: string;
    url: string;
    parentId: string;
    level: number;
    tabIndex: number;
    pages: string[];
    anchors: string[];
}
