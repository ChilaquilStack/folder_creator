const {
    mkdirSync,
    existsSync,
    rmSync,
    readdirSync,
    statSync,
} = require('fs');
const path = require('path');

const { join, basename } = require('path');

const directory = {
    exists: function(dirName){
        return existsSync(join(__dirname, dirName));
    },
    delete: function(dirName) {
        return this.exists(dirName) && rmSync(join(__dirname, dirName), {recursive: true});
    },
    create: function(dirName) {
        return !this.exists(dirName) && mkdirSync(join(__dirname, dirName), {recursive: true});
    },
    get: function(dirPath, paths = []) {
        const files = readdirSync(dirPath);
        for(const file of files) {
            const next = join(dirPath, file);
            if(statSync(next).isDirectory()) {
                this.get(next, paths);
                !this.isEmpty(next) && paths.push(next);
            }
        }
        return paths;
    },
    list: function(dirName) {
        this.get(dirName).forEach(element => console.log(element));
    },
    move: function(oldPath, newPath) {
        const [newDir = basename(oldPath)] = this.get(oldPath);
        const path = join(newPath, newDir);
        this.create(path);
        this.delete(oldPath);
    },
    isEmpty: function(dirName) {
        const files = readdirSync(join(__dirname, dirName));
        return !!files.length;
    }
};

module.exports =  directory;