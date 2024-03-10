import React, { useState } from 'react';
import { ChartSelector } from '../../../src/Components/GrowthChartSelector';
import ChartData from '../../fixtures/ChartData.json';

describe('ChartSelector', () => {
    const TestComponent = () => {
        const [gender, setGender] = useState('Boy');
        const [category, setCategory] = useState('hcfa_b');
        const [dataset, setDataset] = useState('0 to 13 weeks');

        return (
            <ChartSelector
                category={category}
                dataset={dataset}
                chartData={ChartData}
                isDisabled={false}
                gender={gender}
                setCategory={setCategory}
                setDataset={setDataset}
                setGender={setGender}
            />
        );
    };

    it('should render a chart selector', () => {
        cy.viewport(1024, 914);
        cy.mount(
            <TestComponent />,
        );
        cy.contains('Boy');
    });
});
