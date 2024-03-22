export const ChartLineColorPicker = (key: string): string => {
    switch (key) {
    case 'SD3neg':
        return 'black';
    case 'SD2neg':
        return 'red';
    case 'SD1neg':
        return 'orange';
    case 'SD0':
        return 'green';
    case 'SD1':
        return 'orange';
    case 'SD2':
        return 'red';
    case 'SD3':
        return 'black';
    default:
        return 'gray';
    }
};
