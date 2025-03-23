import { useState } from 'react';
import { useInterval } from "./lib/react-hooks.js";
const test = () => {
    const [count, setCount] = useState(0);
    useInterval(() => {
        if (count < 10) {
            setCount(count + 1);
        }
        console.log(count);
    }, 1000);
    console.log('start');
}

test();

