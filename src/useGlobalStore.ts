// useGlobalStore.js
import { create } from 'zustand';

// 定义用户信息的类型
type UserInfo = {
    name: string;
    email: string;
};

// 定义全局状态的类型
type GlobalState = {
    theme: 'light' | 'dark';
    allComponentsVisible: boolean;
    isLoggedIn: boolean;
    userInfo: UserInfo;
    userPermissions: string[];
    toggleTheme: () => void;
    toggleAllComponentsVisibility: () => void;
    login: (userData: UserInfo, permissions: string[]) => void;
    logout: () => void;
    hasPermission: (permission: string) => boolean;
};

const useGlobalStore = create<GlobalState>((set) => ({
    theme: 'light',
    allComponentsVisible: true,
    isLoggedIn: false,
    userInfo: { name: '', email: '' },
    userPermissions: [],
    toggleTheme: () =>
        set((state) => ({
            theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    toggleAllComponentsVisibility: () =>
        set((state) => ({ allComponentsVisible: !state.allComponentsVisible })),
    login: (userData, permissions) =>
        set({
            isLoggedIn: true,
            userInfo: userData,
            userPermissions: permissions,
        }),
    logout: () =>
        set({
            isLoggedIn: false,
            userInfo: { name: '', email: '' },
            userPermissions: [],
        }),
    hasPermission: (permission) => {
        const { userPermissions } = useGlobalStore.getState();
        return userPermissions.includes(permission);
    },
}));

export default useGlobalStore;