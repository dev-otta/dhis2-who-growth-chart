import React, { useState } from 'react';
import { ChartSelectorDropdown } from '../../../../src/Components/GrowthChartSelector/ChartSelectorDropdown';

describe('ChartSelector', () => {
    const TestComponent = () => {
        const [title, handleItemChange] = useState('0 to 13 weeks');
        return (
        // eslint-disable-next-line react/jsx-filename-extension
            <ChartSelectorDropdown
                title={title}
                items={['0 to 13 weeks', '0 to 2 years', '2 to 5 years']}
                handleItemChange={handleItemChange}
                isDisabled={false}
            />
        );
    };

    it('Should render the chart selector dropdown component', () => {
        cy.viewport(1024, 914);
        cy.mount(
            <TestComponent />,
        );
        cy.contains('0 to 13 weeks');
    });

    it('Selecting a new item should change the title', () => {
        cy.viewport(1024, 914);
        cy.mount(
            <TestComponent />,
        );
        cy.contains('button', '0 to 13 weeks').click();
        cy.contains('2 to 5 years').click();
        cy.contains('2 to 5 years');
    });
});
