// styleGenerator.js
import useGlobalStore from './useGlobalStore';

export const generateComponentStyles = () => {
    const { theme } = useGlobalStore.getState();
    const baseStyle = {
        border: '1px solid gray',
        padding: '1rem',
        margin: '0.5rem',
        borderRadius: '0.25rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    };

    const lightThemeStyle = {
        backgroundColor: '#fff9c4',
        color: '#000',
    };

    const darkThemeStyle = {
        backgroundColor: '#333',
        color: '#fff',
    };

    const themeStyle = theme === 'light' ? lightThemeStyle : darkThemeStyle;

    return {
        ...baseStyle,
        ...themeStyle,
    };
};

export const generateHorizontalContainerStyle = () => ({
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
});