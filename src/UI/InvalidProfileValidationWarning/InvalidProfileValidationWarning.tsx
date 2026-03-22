import React from 'react';
import type { InvalidProfileWarning } from '../../utils/DataFetching/Hooks/useInvalidProfileValidation';

interface InvalidProfileValidationWarningProps {
    warnings: InvalidProfileWarning[];
}

const listStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 16px',
    width: '100%',
    boxSizing: 'border-box',
};

const warningItemStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: 8,
    padding: '12px',
    backgroundColor: '#fff8e1',
    borderLeft: '4px solid #f9a825',
    borderRadius: 4,
    color: '#856404',
};

export const InvalidProfileValidationWarning: React.FC<InvalidProfileValidationWarningProps> = ({
    warnings,
}) => {
    if (warnings.length === 0) {
        return null;
    }

    return (
        <div style={{ padding: '16px', width: '100%', boxSizing: 'border-box' }}>
            <ul style={listStyle}>
                {warnings.map((warning, index) => (
                    <li key={`invalid-profile-${index}`} style={warningItemStyle}>
                        <strong>{warning.field}</strong>
                        {': '}
                        {warning.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};
