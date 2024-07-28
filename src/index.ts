console.log("Application starting")
console.log("Environment:",process.env.NODE_ENV)
console.log(process.env.PM2_ID)

import path from 'path'
import { config } from 'dotenv'
config({path:path.join('env',`.env.${process.env.NODE_ENV}`)})

class Main{

    private directoryPath:string = process.cwd()

    private serviceName:string = new Date().getTime().toString()

    private pm2Id = process.env.PM2_ID

    private containerId = process.env.POD_NAME

    //SER DIRECTORY PATH AND SERVICE NAME
    constructor(directoryPath?:string,serviceName?:string){
        directoryPath && (this.directoryPath = directoryPath);
        serviceName && (this.serviceName = serviceName);
        this.initialize()
    }

    private initialize(){
        const rootPath = path.join(this.directoryPath,'logher',this.serviceName,this.todaysDate())

    }

    private todaysDate(){
        const day = new Date().getUTCDate().toString()
        const month = (new Date().getUTCMonth() + 1).toString()
        const year = new Date().getUTCFullYear().toString()
        const date = `${month}-${day}-${year}`
        return date
    }

}