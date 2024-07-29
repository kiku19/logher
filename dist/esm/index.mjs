import path from 'path';
import { config } from 'dotenv';
config({ path: path.join('env', `.env.${process.env.NODE_ENV}`) });
import fs from 'fs';
console.log(process.env.NODE_ENV);
class Main {
    directoryPath = process.cwd();
    serviceName = new Date().getTime().toString();
    processId = process.env.PM2_ID ?? process.env.POD_NAME ?? this.serviceName;
    rootPath = '';
    //SER DIRECTORY PATH AND SERVICE NAME
    constructor(directoryPath, serviceName) {
        directoryPath && (this.directoryPath = directoryPath);
        serviceName && (this.serviceName = serviceName);
        this.rootPath = path.join(this.directoryPath, 'logher', this.serviceName, this.todaysDate(), this.processId);
        this.initialize();
    }
    initialize() {
        try {
            if (fs.existsSync(this.rootPath))
                fs.mkdirSync(this.rootPath);
            this.overwriteConsoleFunctions();
        }
        catch (error) {
            throw error;
        }
    }
    todaysDate() {
        const day = new Date().getUTCDate().toString();
        const month = (new Date().getUTCMonth() + 1).toString();
        const year = new Date().getUTCFullYear().toString();
        const date = `${month}-${day}-${year}`;
        return date;
    }
    overwriteConsoleFunctions() {
        const originalLog = console.log;
        console.log = (args) => {
            fs.writeFileSync(this.rootPath, `${new Date()}: `, ...args);
            originalLog(...args);
        };
        const originalError = console.error;
        console.error = (args) => {
            fs.writeFileSync(this.rootPath, `${new Date()}: `, ...args);
            originalError(...args);
        };
    }
}
export default Main;
