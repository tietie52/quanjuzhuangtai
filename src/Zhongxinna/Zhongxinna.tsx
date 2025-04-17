import React, { useState } from 'react';

// 模拟 useGlobalStore 钩子
const useGlobalStore = () => ({
    isLoggedIn: true,
    allComponentsVisible: true
});

// 定义书籍对象的类型
type Book = {
    id: number;
    name: string;
    author: string;
};

const BookList: React.FC = () => {
    const { isLoggedIn, allComponentsVisible } = useGlobalStore();
    const [books, setBooks] = useState<Book[]>([
        { id: 1, name: "三国演义", author: "罗贯中" },
        { id: 2, name: "红楼梦", author: "曹雪芹" },
        { id: 3, name: "水浒传", author: "施耐庵" },
        { id: 4, name: "西游记", author: "吴承恩" }
    ]);
    const [search, setSearch] = useState('');
    const [newBook, setNewBook] = useState({ name: '', author: '' });
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [showDetail, setShowDetail] = useState(false);
    const [detailBook, setDetailBook] = useState<Book | null>(null);

    const addBook = () => {
        if (newBook.name && newBook.author) {
            const newId = books.length? books[books.length - 1].id + 1 : 1;
            setBooks([...books, { id: newId, name: newBook.name, author: newBook.author }]);
            setNewBook({ name: '', author: '' });
        }
    };

    const deleteBook = () => {
        if (deleteId!== null) {
            setBooks(books.filter(book => book.id!== deleteId));
            setShowDelete(false);
        }
    };

    const showDetails = (book: Book) => {
        setDetailBook(book);
        setShowDetail(true);
    };

    const filtered = books.filter(book =>
        book.name.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    );

    if (!isLoggedIn ||!allComponentsVisible) return null;

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">超级高级书籍列表</h2>
            <div className="flex space-x-4 mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="搜索书籍或作者"
                    className="border border-gray-300 rounded px-3 py-2 flex-1"
                />
                <input
                    type="text"
                    value={newBook.name}
                    onChange={(e) => setNewBook({...newBook, name: e.target.value })}
                    placeholder="输入新书籍名称"
                    className="border border-gray-300 rounded px-3 py-2 flex-1"
                />
                <input
                    type="text"
                    value={newBook.author}
                    onChange={(e) => setNewBook({...newBook, author: e.target.value })}
                    placeholder="输入新书籍作者"
                    className="border border-gray-300 rounded px-3 py-2 flex-1"
                />
                <button
                    onClick={addBook}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    添加
                </button>
            </div>
            <div className="overflow-y-auto max-h-96">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(book => (
                        <li
                            key={book.id}
                            className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => showDetails(book)}
                        >
                            <h3 className="text-lg font-semibold">{book.name}</h3>
                            <p className="text-gray-600">作者: {book.author}</p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteId(book.id);
                                    setShowDelete(true);
                                }}
                                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                            >
                                <i className="fa-solid fa-trash"></i> 删除
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {showDelete && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-8 rounded shadow-md">
                        <h3 className="text-xl font-bold mb-4">确认删除</h3>
                        <p>你确定要删除这本书籍吗？</p>
                        <div className="mt-4 flex space-x-4">
                            <button
                                onClick={deleteBook}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                            >
                                确认
                            </button>
                            <button
                                onClick={() => setShowDelete(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                            >
                                取消
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showDetail && detailBook && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-8 rounded shadow-md max-w-2xl">
                        <h3 className="text-xl font-bold mb-4">{detailBook.name}</h3>
                        <p className="text-gray-600">作者: {detailBook.author}</p>
                        <button
                            onClick={() => setShowDetail(false)}
                            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                        >
                            关闭
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookList;
    