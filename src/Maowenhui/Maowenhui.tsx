import React, { useState } from "react";
import useGlobalStore from "../useGlobalStore";

const MaoWenhuiComponent = () => {
    const { isLoggedIn, allComponentsVisible } = useGlobalStore();
    const [localState, setLocalState] = useState<string>("初始状态");

    // 增加对 isLoggedIn 状态的检查
    if (!isLoggedIn ||!allComponentsVisible) {
        return null;
    }

    return (
        <div>
            <h2>毛文慧 - 组件</h2>
            <p>当前本地状态: {localState}</p>
            <button onClick={() => setLocalState("新状态")}>
                更新本地状态
            </button>
        </div>
    );
};

export default MaoWenhuiComponent;
    