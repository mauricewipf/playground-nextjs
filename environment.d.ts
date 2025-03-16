import {MongooseCache} from "@/lib/mongoose";

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: MongooseCache | undefined; // Allow undefined since it may not be set initially
    }
    interface ProcessEnv {
      API_ENDPOINT: string;
      MINIO_ENDPOINT: string;
      MINIO_PORT: string;
      MINIO_ACCESS_KEY: string;
      MINIO_SECRET_KEY: string;
      MONGODB_URI: string;
      SESSION_SECRET: string;
    }
  }
}

export {}
