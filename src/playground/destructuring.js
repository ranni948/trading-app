//Object Destructuring

// const person = {
//     name: 'Nick',
//     age: 27,
//     location: {
//         city: 'Sydney',
//         temp: 23
//     }
// };

// const { name: firstName = 'Anonymous', age } = person;
// console.log(`${firstName} is ${age}.`);

// const { city, temp: temperature } = person.location;
// if (city && temperature) {
//     console.log(`It's ${temperature} in ${city}.`)
// }

// const book = {
//     title: 'Ego is the enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const { name: publisherName = 'Self-Published'} = book.publisher;
// console.log(publisherName);

//Array Destructuring

const address = ['7 Sterling Circuit', 'Sydney', 'NSW', '2050'];

const [, city, state = 'NZ'] = address;

console.log(`You are in ${city} ${state}.`);


const item = ['Coffee (iced)', '$3.00', '$3.50', '3.75'];

const [itemName, , medium] = item;

console.log (`A medium ${itemName} costs ${medium}`);