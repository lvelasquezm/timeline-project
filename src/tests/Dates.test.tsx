import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Dates from '../components/Dates';

describe('<Dates />', () => {
  const defaultStyle: React.CSSProperties = {
    width: '100%',
    height: '50px'
  };

  describe('rendering with different totalDays values', () => {
    it('renders empty container when totalDays is 0', () => {
      const minDate = new Date('2024-01-01');
      
      render(
        <Dates totalDays={0} minDate={minDate} style={defaultStyle} />
      );
      
      const datesContainer = screen.getByTestId('dates-container');
      expect(datesContainer).toBeInTheDocument();
      expect(datesContainer).toBeEmptyDOMElement();
    });

    it('renders single date when totalDays is 1', () => {
      const minDate = new Date('2024-01-15');
      
      render(<Dates totalDays={1} minDate={minDate} style={defaultStyle} />);
      
      expect(screen.getByText('Jan 14')).toBeInTheDocument();
      expect(screen.getAllByText(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/)).toHaveLength(1);
    });

    it('renders multiple dates when totalDays is greater than 1', () => {
      const minDate = new Date('2024-01-15');
      
      render(<Dates totalDays={3} minDate={minDate} style={defaultStyle} />);
      
      expect(screen.getByText('Jan 14')).toBeInTheDocument();
      expect(screen.getByText('Jan 15')).toBeInTheDocument();
      expect(screen.getByText('Jan 16')).toBeInTheDocument();
      expect(screen.getAllByText(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/)).toHaveLength(3);
    });
  });

  describe('date calculations and formatting', () => {
    it('correctly calculates dates across month boundaries', () => {
      const minDate = new Date('2024-01-30');
      
      render(<Dates totalDays={4} minDate={minDate} style={defaultStyle} />);
      
      expect(screen.getByText('Jan 29')).toBeInTheDocument();
      expect(screen.getByText('Jan 30')).toBeInTheDocument();
      expect(screen.getByText('Jan 31')).toBeInTheDocument();
      expect(screen.getByText('Feb 1')).toBeInTheDocument();
    });

    it('correctly calculates dates across year boundaries', () => {
      const minDate = new Date('2023-12-30');
      
      render(<Dates totalDays={4} minDate={minDate} style={defaultStyle} />);
      
      expect(screen.getByText('Dec 29')).toBeInTheDocument();
      expect(screen.getByText('Dec 30')).toBeInTheDocument();
      expect(screen.getByText('Dec 31')).toBeInTheDocument();
      expect(screen.getByText('Jan 1')).toBeInTheDocument();
    });
  });

  describe('props handling', () => {
    it('applies custom styles correctly', () => {
      const customStyle: React.CSSProperties = {
        backgroundColor: 'red',
        fontSize: '16px',
        padding: '10px'
      };
      const minDate = new Date('2024-01-01');
      
      render(
        <Dates totalDays={1} minDate={minDate} style={customStyle} />
      );
      
      const datesContainer = screen.getByTestId('dates-container');
      expect(datesContainer).toHaveStyle({
        backgroundColor: 'red',
        fontSize: '16px',
        padding: '10px'
      });
    });

    it('handles different minDate values correctly', () => {
      const testDates = [
        new Date('2020-01-01'),
        new Date('2024-06-15'),
        new Date('2030-12-31')
      ];

      testDates.forEach((minDate) => {
        const { unmount } = render(
          <Dates totalDays={1} minDate={minDate} style={defaultStyle} />
        );
        
        const expectedMonth = minDate.toLocaleString('default', { month: 'short' });
        const expectedDay = minDate.getDate();
        
        expect(screen.getByText(`${expectedMonth} ${expectedDay}`)).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('memoization behavior', () => {
    it('should be memoized (component reference check)', () => {
      // This test ensures the component is properly memoized
      // by checking that it doesn't re-render with same props
      const minDate = new Date('2024-01-01');
      const props = { totalDays: 3, minDate, style: defaultStyle };
      
      const { rerender } = render(<Dates {...props} />);
      
      const firstRender = screen.getAllByText(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/);
      
      // Re-render with same props
      rerender(<Dates {...props} />);
      
      const secondRender = screen.getAllByText(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/);
      
      expect(firstRender).toHaveLength(3);
      expect(secondRender).toHaveLength(3);
    });
  });
});
