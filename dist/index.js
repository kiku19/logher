console.log("Application starting");
console.log("Environment:", JSON.stringify(process.env.NODE_ENV));
console.log(process.env.PM2_ID);
import path from 'path';
import { config } from 'dotenv';
config({ path: path.join('env', `.env.${process.env.NODE_ENV}`) });
class Main {
    //SER DIRECTORY PATH AND SERVICE NAME
    constructor(directoryPath, serviceName) {
        this.directoryPath = process.cwd();
        this.serviceName = new Date().getTime().toString();
        this.pm2Id = process.env.PM2_ID;
        this.containerId = process.env.POD_NAME;
        directoryPath && (this.directoryPath = directoryPath);
        serviceName && (this.serviceName = serviceName);
        this.initialize();
    }
    initialize() {
        const rootPath = path.join(this.directoryPath, 'logher', this.serviceName, this.todaysDate());
    }
    todaysDate() {
        const day = new Date().getUTCDate().toString();
        const month = (new Date().getUTCMonth() + 1).toString();
        const year = new Date().getUTCFullYear().toString();
        const date = `${month}-${day}-${year}`;
        return date;
    }
}
//# sourceMappingURL=index.js.map