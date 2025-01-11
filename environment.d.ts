declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_ENDPOINT: string;
      MINIO_ENDPOINT: string;
      MINIO_PORT: string;
      MINIO_ACCESS_KEY: string;
      MINIO_SECRET_KEY: string;
    }
  }
}

export {}
