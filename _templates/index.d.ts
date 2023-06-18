export interface CreatorAnswers {
    variables: {
        root: string;
    },
    components?: {
        filePath?: string;
        componentName: string;
        componentDetails: string[];
        routePath?: string;
        withReducer?: boolean;
    },
    redux?: {
        filePath?: string;
        reducerName?: string;
        sliceName?: string;
        fieldName?: string;
        async?: boolean;
        actionsName?: string;
        serviceNamespace?: string;
        pendingType?: string;
        successType?: string;
    },
    components_reducer?: {
        filePath?: string;
        dispatchNewAction?: boolean;
        useSelector?: boolean;
    }
}

export interface CreatorTemplate {
    init: string;
    updates?: any[];
}

export type CreatorAnswersFunction = (answers: CreatorAnswers) => CreatorTemplate;
