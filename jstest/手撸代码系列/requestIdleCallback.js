const requestIdleCallback1 = (callback, { timeout }) => {
    return setTimeout(() => {
        const start = Date.now();
        callback({
            timeRemaining: () => {
                return Math.max(0, 50 - (Date.now() - start))
            }
        })
    }, 1);
}