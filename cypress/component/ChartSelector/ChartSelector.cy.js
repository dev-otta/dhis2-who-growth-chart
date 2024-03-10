import React, { useState } from 'react';
import { ChartSelector } from '../../../src/Components/GrowthChartSelector';
import ChartDataBoys from '../../fixtures/ChartDataBoys.json';

describe('ChartSelector', () => {
    const TestComponent = () => {
        const [gender, setGender] = useState('Boy');
        const [category, setCategory] = useState('hcfa_b');
        const [dataset, setDataset] = useState('0 to 13 weeks');
        const [chartData] = useState(ChartDataBoys);

        return (
            // eslint-disable-next-line react/jsx-filename-extension
            <ChartSelector
                category={category}
                dataset={dataset}
                chartData={chartData}
                isDisabled={false}
                gender={gender}
                setCategory={setCategory}
                setDataset={setDataset}
                setGender={setGender}
            />
        );
    };

    it('Should render the chart selector component', () => {
        cy.mount(
            <TestComponent />,
        );
        cy.get('[data-test="CGC-gender-dropdown-button"]').should('contain', 'Boy');
        cy.get('[data-test="CGC-category-dropdown-button"]').should('contain', 'Head circumference for age');
        cy.get('[data-test="CGC-dataset-dropdown-button"]').should('contain', '0 to 13 weeks');
    });

    it('Should be able to change the gender', () => {
        cy.mount(
            <TestComponent />,
        );
        cy.get('[data-test="CGC-gender-dropdown-button"]').contains('Boy').click();
        cy.get('[data-test="CGC-gender-dropdown-item"]').contains('Girl').click();
        cy.get('[data-test="CGC-gender-dropdown-button"]').should('contain', 'Girl');
    });

    it('Should be able to change the category', () => {
        cy.mount(
            <TestComponent />,
        );
        cy.get('[data-test="CGC-category-dropdown-button"]').contains('Head circumference for age').click();
        cy.get('[data-test="CGC-category-dropdown-item"]').contains('Weight for age').click();
        cy.get('[data-test="CGC-category-dropdown-button"]').should('contain', 'Weight for age');
    });

    it('Should be able to change the dataset', () => {
        cy.mount(
            <TestComponent />,
        );
        cy.get('[data-test="CGC-dataset-dropdown-button"]').contains('0 to 13 weeks').click();
        cy.get('[data-test="CGC-dataset-dropdown-item"]').contains('0 to 5 years').click();
        cy.get('[data-test="CGC-dataset-dropdown-button"]').should('contain', '0 to 5 years');
    });
});
