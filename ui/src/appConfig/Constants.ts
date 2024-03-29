enum APP_ENDPOINTS {
    PRODUCTION= "http://127.0.0.1:9000",
    STAGING = "http://127.0.0.1:9000",
    UAT ="http://127.0.0.1:9000",
    DEBUG = "http://127.0.0.1:9000",
}

export enum ROLES {
    CLIENT = "client",
    PROFESSIONAL = "professional",
    ADMIN = "admin"
}

export const CURRENT_BACKEND = APP_ENDPOINTS.PRODUCTION;