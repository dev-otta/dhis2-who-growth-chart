import React, { useState } from 'react';
import i18n from '@dhis2/d2-i18n';
import { IconChevronUp24 } from '@dhis2/ui';
import cx from 'classnames';
import { ValidationError } from '../../utils/DataFetching/Hooks/useConfigValidation';

const DOCS_URL =
    'https://github.com/dev-otta/dhis2-who-growth-chart/blob/master/docs/using-capture-growth-charts.md';

interface ConfigValidationErrorProps {
    errors: ValidationError[];
}

const listStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 16px',
    width: '100%',
    boxSizing: 'border-box',
};

const errorItemStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: 8,
    padding: '12px',
    backgroundColor: '#ffebee',
    borderLeft: '4px solid #c62828',
    borderRadius: 4,
    color: '#b71c1c',
};

export const ConfigValidationError: React.FC<ConfigValidationErrorProps> = ({ errors }) => {
    const [helpOpen, setHelpOpen] = useState(false);

    return (
        <div style={{ padding: '16px', width: '100%', boxSizing: 'border-box' }}>
            {errors.length > 0 && (
                <ul style={listStyle}>
                    {errors.map((error, index) => (
                        <li key={`error-${index}`} style={errorItemStyle}>
                            <strong>{error.field}</strong>
                            {': '}
                            {error.message}
                        </li>
                    ))}
                </ul>
            )}

            {errors.length > 0 && (
                <section
                    className={
                        'mt-6 w-full overflow-hidden rounded-lg border border-amber-300 ' +
                        'bg-[#fff8e1] shadow-sm'
                    }
                    aria-labelledby='growth-chart-help-toggle'
                >
                    <button
                        id='growth-chart-help-toggle'
                        type='button'
                        className='flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-amber-100/90'
                        onClick={() => setHelpOpen((open) => !open)}
                        aria-expanded={helpOpen}
                        aria-controls='growth-chart-help-panel'
                    >
                        <span className='text-sm font-semibold uppercase tracking-wide text-amber-950'>
                            {i18n.t('How to Fix This Issue')}
                        </span>
                        <span
                            className={cx(
                                'flex shrink-0 text-amber-900 transition-transform duration-200',
                                !helpOpen && 'rotate-180',
                            )}
                        >
                            <IconChevronUp24 />
                        </span>
                    </button>
                    {helpOpen && (
                        <div
                            id='growth-chart-help-panel'
                            className='border-t border-amber-200/90 bg-[#fff8e1] px-4 pb-4 pt-3'
                        >
                            <div className='flex flex-col gap-5 text-sm leading-relaxed text-amber-950'>
                                <p className='m-0'>
                                    {i18n.t('Use ')}
                                    <strong>Datastore Management</strong>
                                    {i18n.t(' to open namespace ')}
                                    <strong>&quot;captureGrowthChart&quot;</strong>
                                    {i18n.t(' and key ')}
                                    <strong>&quot;config&quot;</strong>
                                    {i18n.t('. Edit the ')}
                                    <strong>JSON</strong>
                                    {i18n.t(
                                        ' to address the errors above, save, and refresh this page.',
                                    )}
                                </p>
                                <p className='m-0'>
                                    {i18n.t(
                                        'If you need to add or change attributes, program stage, data elements, or option codes in DHIS2, ',
                                    )}
                                    {i18n.t('do that in ')}
                                    <strong>Maintenance</strong>
                                    {i18n.t(' first. Afterwards, update ')}
                                    <strong>Datastore</strong>
                                    {i18n.t(' so your ')}
                                    <strong>UIDs</strong>
                                    {i18n.t(' and ')}
                                    <strong>option codes</strong>
                                    {i18n.t(' match what you configured.')}
                                </p>
                            </div>
                            <div className='mt-5 rounded-md border border-amber-200 bg-white/90 px-4 py-3'>
                                <p className='m-0 text-sm leading-relaxed text-amber-950'>
                                    <span className='font-semibold text-amber-950'>
                                        {i18n.t('Need help?')}
                                    </span>
                                    {' '}
                                    <a
                                        href={DOCS_URL}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className={
                                            'font-medium text-blue-700 underline decoration-blue-700/30 ' +
                                            'underline-offset-2 hover:text-blue-900 hover:decoration-blue-900/40'
                                        }
                                    >
                                        {i18n.t('Check the documentation for the correct configuration format.')}
                                    </a>
                                </p>
                            </div>
                        </div>
                    )}
                </section>
            )}
        </div>
    );
};
