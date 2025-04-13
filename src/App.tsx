// App.jsx
import React from 'react';
import Hexinyi from'./hexinyi/Hexinyi'
import useGlobalStore from './useGlobalStore';
import {
    generateComponentStyles,
    generateHorizontalContainerStyle,
} from './styleGenerator';

function App() {
    const {
        theme,
        toggleTheme,
        allComponentsVisible,
        toggleAllComponentsVisibility,
        isLoggedIn,
        login,
        logout,
        hasPermission,
    } = useGlobalStore();

    const correctPassword = '666666';

    const mockLogin = () => {
        const password = prompt('请输入密码:');
        if (password === correctPassword) {
            const userData = { name: 'John Doe', email: 'johndoe@example.com' };
            const permissions = ['read', 'write'];
            login(userData, permissions);
        } else {
            alert('密码错误，请重试。');
        }
    };

    const mockLogout = () => {
        logout();
    };

    const buttonStyle = {
        fontSize: '2xl',
        outline: 'none',
        transition: 'color 0.2s',
        margin: '0 0.5rem',
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f0f0f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ backgroundColor: theme === 'light' ? '#fff' : '#333', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '40rem', marginBottom: '1rem' }}>
                <button
                    onClick={toggleTheme}
                    style={{ ...buttonStyle, color: theme === 'light' ? '#000' : '#fff' }}
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
                {isLoggedIn ? (
                    <button
                        onClick={mockLogout}
                        style={{ ...buttonStyle, color: theme === 'light' ? '#000' : '#fff' }}
                    >
                        👤 Logout
                    </button>
                ) : (
                    <button
                        onClick={mockLogin}
                        style={{ ...buttonStyle, color: theme === 'light' ? '#000' : '#fff' }}
                    >
                        👤 Login
                    </button>
                )}
                <button
                    onClick={toggleAllComponentsVisibility}
                    style={{ ...buttonStyle, color: theme === 'light' ? '#000' : '#fff' }}
                >
                    {allComponentsVisible ? '👁️' : '🙈'}
                </button>
            </div>
            {isLoggedIn && (
                <div style={{ backgroundColor: theme === 'light' ? '#fff' : '#333', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '100%', maxWidth: '40rem', marginBottom: '1rem' }}>
                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: theme === 'light' ? '#000' : '#fff' }}>
                        Welcome, {useGlobalStore.getState().userInfo.name}!
                    </p>
                    {hasPermission('write') && (
                        <p style={{ color: theme === 'light' ? '#666' : '#ccc' }}>You have write permission.</p>
                    )}
                </div>
            )}
            {isLoggedIn && allComponentsVisible && (
                <div style={generateHorizontalContainerStyle()}>
                    <div style={generateComponentStyles()}>
                        <Hexinyi />
                    
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;