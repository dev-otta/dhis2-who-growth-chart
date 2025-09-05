import React from 'react';
import { AlertBar, AlertStack } from '@dhis2/ui';
import i18n from '@dhis2/d2-i18n';
import { ValidationError } from '../../utils/DataFetching/Hooks/useConfigValidation';

interface ConfigValidationErrorProps {
    errors: ValidationError[];
    warnings: ValidationError[];
}

export const ConfigValidationError: React.FC<ConfigValidationErrorProps> = ({ errors, warnings }) => {
    return (
        <div style={{ padding: '16px', maxWidth: '800px' }}>
            <h3 style={{ marginBottom: '16px', color: '#d32f2f' }}>
                {i18n.t('Growth Chart Configuration Issues')}
            </h3>
            
            <AlertStack>
                {errors.map((error, index) => (
                    <AlertBar
                        key={`error-${index}`}
                        critical
                        permanent
                    >
                        <strong>{error.field}:</strong> {error.message}
                    </AlertBar>
                ))}
                
                {warnings.map((warning, index) => (
                    <AlertBar
                        key={`warning-${index}`}
                        warning
                        permanent
                    >
                        <strong>{warning.field}:</strong> {warning.message}
                    </AlertBar>
                ))}
            </AlertStack>

            {errors.length > 0 && (
                <div style={{ 
                    marginTop: '24px', 
                    padding: '16px', 
                    backgroundColor: '#fff3e0', 
                    border: '1px solid #ffb74d',
                    borderRadius: '4px'
                }}>
                    <h4 style={{ marginTop: 0, color: '#e65100' }}>
                        {i18n.t('How to Fix These Issues:')}
                    </h4>
                    <ol style={{ marginBottom: 0 }}>
                        <li>{i18n.t('Go to the Datastore Management app in DHIS2')}</li>
                        <li>{i18n.t('Find the namespace "CaptureGrowthChart" and key "config"')}</li>
                        <li>{i18n.t('Update the configuration JSON to fix the issues listed above')}</li>
                        <li>{i18n.t('Save the changes and refresh this page')}</li>
                    </ol>
                    
                    <div style={{ marginTop: '16px' }}>
                        <strong>{i18n.t('Need help?')}</strong>{' '}
                        <span>
                            {i18n.t('Check the documentation for the correct configuration format.')}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
