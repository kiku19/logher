"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: path_1.default.join('env', `.env.${process.env.NODE_ENV}`) });
const fs_1 = __importDefault(require("fs"));
console.log(process.env.NODE_ENV);
class Main {
    //SER DIRECTORY PATH AND SERVICE NAME
    constructor(directoryPath, serviceName) {
        var _a, _b;
        this.directoryPath = process.cwd();
        this.serviceName = new Date().getTime().toString();
        this.processId = (_b = (_a = process.env.PM2_ID) !== null && _a !== void 0 ? _a : process.env.POD_NAME) !== null && _b !== void 0 ? _b : this.serviceName;
        this.rootPath = '';
        directoryPath && (this.directoryPath = directoryPath);
        serviceName && (this.serviceName = serviceName);
        this.rootPath = path_1.default.join(this.directoryPath, 'logher', this.serviceName, this.todaysDate(), this.processId);
        this.initialize();
    }
    initialize() {
        try {
            if (fs_1.default.existsSync(this.rootPath))
                fs_1.default.mkdirSync(this.rootPath);
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
            fs_1.default.writeFileSync(this.rootPath, `${new Date()}: `, ...args);
            originalLog(...args);
        };
        const originalError = console.error;
        console.error = (args) => {
            fs_1.default.writeFileSync(this.rootPath, `${new Date()}: `, ...args);
            originalError(...args);
        };
    }
}
exports.default = Main;
