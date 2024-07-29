import path from "path";
import fs from "fs";

class Main {
  private directoryPath: string = process.cwd();

  private serviceName: string = new Date().getTime().toString();

  private processId =
    process.env.PM2_ID ?? process.env.POD_NAME ?? this.serviceName;

  private rootPath: string = "";

  //SER DIRECTORY PATH AND SERVICE NAME
  constructor(directoryPath?: string, serviceName?: string) {
    directoryPath && (this.directoryPath = directoryPath);
    serviceName && (this.serviceName = serviceName);
    this.rootPath = path.join(this.directoryPath, "logker", this.serviceName);
    this.initialize();
  }

  private initialize() {
    try {
      if (!fs.existsSync(this.rootPath))
        fs.mkdirSync(this.rootPath, { recursive: true });
      this.overwriteConsoleFunctions();
    } catch (error) {
      throw error;
    }
  }

  private todaysDate() {
    const day = new Date().getUTCDate().toString();
    const month = (new Date().getUTCMonth() + 1).toString();
    const year = new Date().getUTCFullYear().toString();
    const date = `${month}-${day}-${year}`;
    return date;
  }

  private getCurrentDataPath() {
    const currentDatePath = path.join(this.rootPath, this.todaysDate());
    if (!fs.existsSync(currentDatePath)) fs.mkdirSync(currentDatePath);
    return currentDatePath
  }

  private overwriteConsoleFunctions() {
    const originalLog = console.log;
    console.log = (args) => {
      fs.appendFileSync(
        path.join(this.getCurrentDataPath(), `${this.processId}.txt`),
        `${new Date()}: ${args}\n`
      );
      originalLog(args);
    };
    const originalError = console.error;
    console.error = (args) => {
      fs.appendFileSync(
        path.join(this.getCurrentDataPath(), `${this.processId}.txt`),
        `${new Date()}: ${args}\n`
      );
      originalError(args);
    };
  }
}

export default Main;
