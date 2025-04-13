import React, { useState } from "react";
import useGlobalStore from "../useGlobalStore";

const HeXinyiMovieList = () => {
    const { isLoggedIn, allComponentsVisible } = useGlobalStore();
    const [movies, setMovies] = useState<string[]>(["满江红", "流浪地球"]);
    const [newMovie, setNewMovie] = useState<string>("");

    const handleAddMovie = () => {
        if (newMovie.trim()!== "") {
            setMovies([...movies, newMovie]);
            setNewMovie("");
        }
    };

    const handleDeleteMovie = (index: number) => {
        const updatedMovies = movies.filter((_, i) => i!== index);
        setMovies(updatedMovies);
    };

    // 增加对 isLoggedIn 状态的检查
    if (!isLoggedIn ||!allComponentsVisible) {
        return null;
    }

    return (
        <div>
            <h2>何芯轶 - 电影列表</h2>
            <ul>
                {movies.map((movie, index) => (
                    <li key={index}>
                        {movie}
                        <button onClick={() => handleDeleteMovie(index)}>
                            删除
                        </button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newMovie}
                onChange={(e) => setNewMovie(e.target.value)}
                placeholder="输入新电影名称"
            />
            <button onClick={handleAddMovie}>
                添加
            </button>
        </div>
    );
};

export default HeXinyiMovieList;