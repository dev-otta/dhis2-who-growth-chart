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
        cy.viewport(1024, 914);
        cy.mount(
            <TestComponent />,
        );
        cy.contains('Boy');
        cy.contains('Head circumference for age');
        cy.contains('0 to 13 weeks');
    });

    it('Should be able to change the gender', () => {
        cy.viewport(1024, 914);
        cy.mount(
            <TestComponent />,
        );
        cy.contains('button', 'Boy').click();
        cy.contains('button', 'Girl').click();
        cy.contains('Girl');
    });

    it('Should be able to change the category', () => {
        cy.viewport(1024, 914);
        cy.mount(
            <TestComponent />,
        );
        cy.contains('button', 'Head circumference for age').click();
        cy.contains('button', 'Weight for age').click();
        cy.contains('Weight for age');
    });

    it('Should be able to change the dataset', () => {
        cy.viewport(1024, 914);
        cy.mount(
            <TestComponent />,
        );
        cy.contains('button', '0 to 13 weeks').click();
        cy.contains('button', '0 to 5 years').click();
        cy.contains('0 to 5 years');
    });
});
