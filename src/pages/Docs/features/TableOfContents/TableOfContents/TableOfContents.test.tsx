import React from 'react';
import { TableOfContents } from './TableOfContents.tsx';
import { renderWithRouter } from '../../../../../utils/test-utils.tsx';
import {
  fireEvent, screen, waitFor
} from '@testing-library/react';

const mocks: ITableOfContents = {
  entities: {
    pages: {
      A: {
        id: 'A',
        title: 'A',
        pages: ['A_1'],
        url: 'A.html',
        tabIndex: 1,
        parentId: undefined,
        level: 1,
        anchors: []
      },
      A_1: {
        id: 'A_1',
        title: 'A_1',
        pages: [],
        url: 'A_1.html',
        tabIndex: 2,
        parentId: 'A',
        level: 2,
        anchors: []

      },
      B: {
        id: 'B',
        title: 'B',
        pages: [],
        url: 'B.html',
        tabIndex: 1,
        parentId: undefined,
        level: 1,
        anchors: []
      }
    }
  },
  topLevelIds: ['A', 'B']
};

describe('Test TableOfContents component', () => {

  it('should have active class after click', async () => {
    renderWithRouter('/docs/*', '/docs', <TableOfContents table={mocks}/>);

    const link = screen.getByText('A');
    expect(await screen.queryByText('A_1')).not.toBeInTheDocument();

    fireEvent.click(link);
    expect(link.parentElement).toHaveClass('active');
    expect(screen.getByText('A_1')).toBeInTheDocument();
  });

  it('should have active class on initial render', async () => {
    renderWithRouter('/docs/*', '/docs/B.html', <TableOfContents table={mocks}/>);

    const link = screen.getByText('B');
    expect(link.parentElement).toHaveClass('active');
  });

  it('should filter table', async () => {
    renderWithRouter('/docs/*', '/docs', <TableOfContents table={mocks}/>);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'B' } });

    await waitFor(async () => {
      expect(await screen.queryByText('A')).not.toBeInTheDocument();
      expect(await screen.queryByText('A_1')).not.toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
    }, { timeout: 400 });
  });
});
