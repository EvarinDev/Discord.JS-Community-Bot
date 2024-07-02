import "dotenv/config";

const config = {
    development: {
        TOKEN: process.env.DEVELOPMENT_TOKEN,
        GUILD_ID: process.env.DEVELOPMENT_GUILD_ID,
        CLIENT_ID: process.env.DEVELOPMENT_CLIENT_ID
    },
    production: {
        TOKEN: process.env.PRODUCTION_TOKEN,
        GUILD_ID: process.env.PRODUCTION_GUILD_ID,
        CLIENT_ID: process.env.PRODUCTION_CLIENT_ID
    }
}
interface Config {
    TOKEN: string;
    GUILD_ID: string; 
    CLIENT_ID: string;
}

export default config[process.env.NODE_ENV || 'development'] as Config

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PRODUCTION_TOKEN: string;
            DEVELOPMENT_TOKEN: string;
            PRODUCTION_GUILD_ID: string;
            DEVELOPMENT_GUILD_ID: string;
            DEVELOPMENT_CLIENT_ID: string;
            PRODUCTION_CLIENT_ID: string;
        }
    }
}