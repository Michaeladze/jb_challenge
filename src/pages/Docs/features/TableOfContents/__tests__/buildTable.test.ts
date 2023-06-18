import { buildTable } from '../buildTable.ts';

const mocks: ITableOfContents = {
  entities: {
    pages: {
      A: {
        id: 'A',
        title: 'A',
        pages: ['A_1'],
        url: 'A',
        tabIndex: 1,
        parentId: undefined,
        level: 1,
        anchors: []
      },
      A_1: {
        id: 'A_1',
        title: 'A_1',
        pages: [],
        url: 'A_1',
        tabIndex: 2,
        parentId: 'A',
        level: 2,
        anchors: []

      },
      B: {
        id: 'B',
        title: 'B',
        pages: [],
        url: 'B',
        tabIndex: 1,
        parentId: undefined,
        level: 1,
        anchors: []
      }
    }
  },
  topLevelIds: ['A', 'B']
};

describe('Test buildTable function', () => {
  it('should build table of length 3', () => {
    const table = buildTable(mocks);
    expect(table).toHaveLength(3);
  });
});
