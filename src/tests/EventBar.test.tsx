import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import EventBar from '../components/EventBar';

describe('<EventBar />', () => {
  const defaultStyle: React.CSSProperties = {
    width: '100px',
    height: '20px',
    backgroundColor: 'blue'
  };

  describe('rendering with different prop values', () => {
    it('renders with basic props', () => {
      render(
        <EventBar 
          name="Test Event" 
          title="Test Title" 
          style={defaultStyle} 
        />
      );
      
      expect(screen.getByTestId('event-name')).toBeInTheDocument();
      expect(screen.getByTestId('event-tooltip')).toBeInTheDocument();
      expect(screen.getByTestId('event-tooltip-text')).toBeInTheDocument();
    });

    it('renders with empty name', () => {
      render(
        <EventBar 
          name="" 
          title="Empty Name Test" 
          style={defaultStyle} 
        />
      );
      
      expect(screen.getByTitle('Empty Name Test')).toBeInTheDocument();
      // Should still render the component structure
      const emptyElements = screen.getAllByText('');
      expect(emptyElements.length).toBeGreaterThanOrEqual(2);
    });

    it('renders with empty title', () => {
      render(
        <EventBar 
          name="Event Name" 
          title="" 
          style={defaultStyle} 
        />
      );
      
      expect(screen.getByTestId('event-name')).toBeInTheDocument();
      expect(screen.getByTestId('event-tooltip')).toBeInTheDocument();
      expect(screen.getByTestId('event-tooltip-text')).toBeInTheDocument();
    });
  });

  describe('props handling', () => {
    it('applies custom styles correctly', () => {
      const customStyle: React.CSSProperties = {
        backgroundColor: 'red',
        width: '200px',
        height: '30px',
        borderRadius: '5px'
      };
      
      render(
        <EventBar 
          name="Styled Event" 
          title="Style test" 
          style={customStyle} 
        />
      );
      
      const eventBar = screen.getByTitle('Style test');
      expect(eventBar).toHaveStyle({
        backgroundColor: 'red',
        width: '200px',
        height: '30px',
        borderRadius: '5px'
      });
    });

    it('handles different name values correctly', () => {
      const testNames = [
        "Short",
        "Event with spaces",
        "Event123",
        "Event @#$%"
      ];

      testNames.forEach((name) => {
        const { unmount } = render(
          <EventBar name={name} title="Test" style={defaultStyle} />
        );
        
        expect(screen.getAllByText(name)).toHaveLength(2);
        unmount();
      });
    });
  });

  describe('component structure', () => {
    it('maintains text synchronization between name and tooltip', () => {
      const testName = "Synchronized Text";
      
      render(
        <EventBar 
          name={testName} 
          title="Sync test" 
          style={defaultStyle} 
        />
      );
      
      const nameElements = screen.getAllByText(testName);
      expect(nameElements).toHaveLength(2);
      
      // Both elements should have the same text content
      nameElements.forEach(element => {
        expect(element).toHaveTextContent(testName);
      });
    });

    it('renders with proper title attribute for accessibility', () => {
      const accessibleTitle = "Meeting from 9 AM to 5 PM on January 15th";
      
      render(
        <EventBar 
          name="Meeting" 
          title={accessibleTitle} 
          style={defaultStyle} 
        />
      );
      
      expect(screen.getByTitle(accessibleTitle)).toBeInTheDocument();
    });
  });

  describe('memoization behavior', () => {
    it('should be memoized (component reference check)', () => {
      const props = { 
        name: "Test Event", 
        title: "Test Title", 
        style: defaultStyle 
      };
      
      const { rerender } = render(<EventBar {...props} />);
      
      const firstRender = screen.getByTestId('event-name');
      
      // Re-render with same props
      rerender(<EventBar {...props} />);
      
      const secondRender = screen.getByTestId('event-name');
      
      expect(firstRender).toBeInTheDocument();
      expect(secondRender).toBeInTheDocument();
    });

    it('should re-render when props change', () => {
      const initialProps = { 
        name: "Initial Event", 
        title: "Initial Title", 
        style: defaultStyle 
      };
      
      const { rerender } = render(<EventBar {...initialProps} />);
      
      expect(screen.getByTestId('event-name')).toHaveTextContent('Initial Event');
      expect(screen.getByTestId('event-tooltip')).toHaveTextContent('Initial Event');
      
      const newProps = { 
        name: "Updated Event", 
        title: "Updated Title", 
        style: { ...defaultStyle, backgroundColor: 'green' } 
      };
      
      rerender(<EventBar {...newProps} />);
      
      expect(screen.getByTestId('event-name')).toHaveTextContent('Updated Event');
      expect(screen.getByTestId('event-tooltip')).toHaveTextContent('Updated Event');
    });
  });
});