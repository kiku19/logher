import path from 'path'
import fs from 'fs'

class Main{

    private directoryPath:string = process.cwd() 

    private serviceName:string = new Date().getTime().toString()

    private processId = process.env.PM2_ID??process.env.POD_NAME??this.serviceName

    private rootPath:string = ''

    //SER DIRECTORY PATH AND SERVICE NAME
    constructor(directoryPath?:string,serviceName?:string){
        directoryPath && (this.directoryPath = directoryPath);
        serviceName && (this.serviceName = serviceName);
        this.rootPath = path.join(this.directoryPath,'logher',this.serviceName,this.todaysDate(),this.processId)
        this.initialize()
    }

    private initialize(){
        try{
            if(fs.existsSync(this.rootPath))
                fs.mkdirSync(this.rootPath)
            this.overwriteConsoleFunctions()
        }
        catch(error){
            throw error
        }
    }

    private todaysDate(){
        const day = new Date().getUTCDate().toString()
        const month = (new Date().getUTCMonth() + 1).toString()
        const year = new Date().getUTCFullYear().toString()
        const date = `${month}-${day}-${year}`
        return date
    }

    private overwriteConsoleFunctions(){
        const originalLog = console.log
        console.log = (args)=>{
            fs.writeFileSync(this.rootPath,`${new Date()}: `,...args)
            originalLog(...args)
        }
        const originalError = console.error
        console.error = (args)=>{
            fs.writeFileSync(this.rootPath,`${new Date()}: `,...args)
            originalError(...args)
        }
    }
}

export default Main