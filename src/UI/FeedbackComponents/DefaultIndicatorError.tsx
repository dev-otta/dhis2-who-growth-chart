import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { GenericError } from '../GenericError';

interface DefaultIndicatorErrorProps {
    defaultIndicator: string;
}

export const DefaultIndicatorError = ({ defaultIndicator }: DefaultIndicatorErrorProps) => (
    <GenericError
        /* eslint-disable-next-line max-len */
        errorMessage={`${i18n.t('The default indicator')} "${defaultIndicator}" ${i18n.t('is not a valid. Please select a valid indicator in the configuration')}`}
    />
);
