import React, { useState } from 'react';
import { ChartSelectorDropdown } from '../../../../src/Components/GrowthChartSelector/ChartSelectorDropdown';

describe('ChartSelectorDropdown', () => {
    const TestComponent = () => {
        const [title, handleItemChange] = useState('0 to 13 weeks');
        return (
        // eslint-disable-next-line react/jsx-filename-extension
            <ChartSelectorDropdown
                title={title}
                items={['0 to 13 weeks', '0 to 2 years', '2 to 5 years']}
                handleItemChange={handleItemChange}
                isDisabled={false}
                dataTest='CGC-dropdown'
            />
        );
    };

    it('Should render the chart selector dropdown component', () => {
        cy.mount(
            <TestComponent />,
        );
        cy.get('[data-test="CGC-dropdown-button"]').should('contain', '0 to 13 weeks');
    });

    it('Selecting a new item should change the title', () => {
        cy.mount(
            <TestComponent />,
        );
        cy.get('[data-test="CGC-dropdown-button"]').contains('0 to 13 weeks').click();
        cy.get('[data-test="CGC-dropdown-item"]').contains('0 to 2 years').click();
        cy.get('[data-test="CGC-dropdown-button"]').should('contain', '0 to 2 years');
    });
});
