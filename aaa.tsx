import React, { useEffect, useState } from "react";
window.onerror = (e) => {
    console.log("onerror", e);
}

export default ({ count }) => {
    // const [count, setCount] = useState(0);
    requestAnimationFrame(() => {
        console.log("requestanimation frame");
    })
    useEffect(() => {
        console.log(123, document.getElementById("a").textContent);
        // for(let i = 0; i < 10000 * 100000; i++){};
        console.log(456);
        
    }, [count])
    // setTimeout(()=> {
    //     try {
    //         setCount(1)
    //     } catch(e) {
    //         console.log(e, 1111111);
    //     }
        
    // }, 1000)
    return <div id="a">{count}</div>
}