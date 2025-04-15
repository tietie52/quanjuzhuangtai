import React, { useState } from'react';
// 假设的 useGlobalStore 函数
const useGlobalStore = () => {
    const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true); // 这里先设为已登录方便测试，实际按需求调整
    const [userInfo, setUserInfo] = useState({ name: '用户' }); // 模拟用户信息
    const [allComponentsVisible, setAllComponentsVisible] = useState(true);
    const [nextId, setNextId] = useState(1);

    const addTodo = (text: any) => {
        setTodos([...todos, { id: nextId, text, completed: false }]);
        setNextId(nextId + 1);
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id? { ...todo, completed:!todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id!== id);
        setTodos(updatedTodos);
    };

    const login = (user, permissions) => {
        setIsLoggedIn(true);
        setUserInfo(user);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserInfo(null);
    };

    const getTodosByCurrentUser = () => {
        return todos;
    };

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        isLoggedIn,
        userInfo,
        login,
        logout,
        allComponentsVisible,
        getTodosByCurrentUser
    };
};

// 单独的待办事项板块组件
const TodoList = ({
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    isLoggedIn,
    userInfo,
    login,
    logout,
    allComponentsVisible,
    getTodosByCurrentUser
}) => {
    const [input, setInput] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (trimmedInput!== '') {
            addTodo(trimmedInput);
            setInput('');
        }
    };

    if (!isLoggedIn ||!allComponentsVisible) {
        return (
            <div>
                <h2>请先登录</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="输入邮箱"
                />
                <button onClick={() => login({ name: '用户', email }, ['edit_todo'])}>
                    登录
                </button>
            </div>
        );
    }

    return (
        <div className="bg-blue-100 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">{userInfo.name}的待办事项</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="添加新任务"
                    className="p-2 border border-gray-300 rounded-md"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md">
                    添加
                </button>
            </form>
            <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-md">
                退出
            </button>
            <ul className="mt-4">
                {getTodosByCurrentUser().map((todo) => (
                    <li key={todo.id} className="flex items-center justify-between mb-2">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <span style={{ textDecoration: todo.completed? 'line-through' : 'none' }}>
                            {todo.text}
                        </span>
                        <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            删除
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const QinlinxiangTodo = () => {
    const store = useGlobalStore();
    return <TodoList {...store} />;
};

export default QinlinxiangTodo;