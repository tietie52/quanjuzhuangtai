import React, { useState } from "react";
import useGlobalStore from "../useGlobalStore";

const cttMusicSearch: React.FC = () => {
    const { musicList, searchKeyword, setSearchKeyword } = useGlobalStore();
    const [displayMusicList, setDisplayMusicList] = useState(musicList);
    const [newMusicName, setNewMusicName] = useState("");
    const [addedMusicList, setAddedMusicList] = useState<string[]>([]);

    const handleAddMusic = () => {
        if (newMusicName.trim()) {
            setAddedMusicList(prev => [...prev, newMusicName]);
            setNewMusicName("");
        }
    };

    const handleDeleteMusic = (index) => {
        setAddedMusicList(prev => prev.filter((_, i) => i!== index));
    };

    return (
        <div className="ctt-music-search-container">
            <h2 className="ctt-music-search-title">陈婷婷 - 音乐搜索</h2>
            <div className="ctt-search-input-wrapper">
                <input
                    type="text"
                    placeholder="输入新音乐名称"
                    value={newMusicName}
                    onChange={(e) => setNewMusicName(e.target.value)}
                    className="ctt-new-music-input"
                />
                <button onClick={handleAddMusic} className="ctt-add-button">
                    添加
                </button>
            </div>
            <div className="ctt-added-music-list">
                <h3>已添加音乐</h3>
                <ul>
                    {addedMusicList.map((music, index) => (
                        <li key={index}>
                            {music}
                            <button onClick={() => handleDeleteMusic(index)} >
                                删除
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default cttMusicSearch;    