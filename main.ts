//dotenv - API for reading .env files
import { config } from "dotenv";
config();

import { env } from './src/utils/wrappers/env-wrapper';
import app from "./src/app";
import { createConnection, getConnection } from "typeorm";



(async function main(): Promise<void> {

    try {
        const PORT = env.port;
        
        //Connecting with database
        const connection = await createConnection();
        await connection.synchronize()

        //Starting server
        app.listen(PORT);
        console.log(`Server is listening on port ${PORT} 🔥🔥🔥`)
    } catch (error) {
        console.log(error);
        process.exit(-1);
    }

})();
