onmessage = function(e) {
    let total = 0;
    for (let i = 0; i < e.data; i++) {
        total += i;
    }
    postMessage(total);
};
