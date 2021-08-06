const {
    CREATE, LIST, DELETE, MOVE
} = require('./actions');
const directories = require('./app');
const path = require('path'); 
const stdin = process.openStdin();
stdin.on('data', (input) => {
    const [command, name, names = ''] = input.toString().trim().split(' ');
    switch(command.toUpperCase()) {
        case CREATE: {
            directories.create(name);
            break;
        }
        case LIST: {
            directories.list('.');
            break;
        }
        case DELETE: {
            directories.delete(name);
            break;
        }
        case MOVE: {
            directories.move(name, names);
            break;
        }
        case 'GET': {
            const [dir] = directories.get(name);
            console.log(path.normalize(dir));
            break;
        }
        default:{
            console.log('Invalid command, try again');
            break;
        }
    }
});