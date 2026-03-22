import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { GenericError } from '../GenericError';

interface ConfigErrorProps {
    embedded?: boolean;
}

export const ConfigError = ({ embedded }: ConfigErrorProps = {}) => (
    <GenericError
        embedded={embedded}
        /* eslint-disable-next-line max-len */
        errorMessage={i18n.t('There was an error fetching the config for the growth chart. Please check the configuration in Datastore Management and try again.')}
    />
);
