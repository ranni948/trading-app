const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'Nick',
            age: 26
        });
        //reject('Something went wrong');
    }, 5000);
});

console.log('before');

promise.then((data) => {
    console.log('1', data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('This is my promise');
        }, 5000);
    });
}).then((str) => {
    console.log('Does this run', str);
}).catch((e) => {
    console.log('error: ', e);
});

console.log('after');