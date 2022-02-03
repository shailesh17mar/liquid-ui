declare namespace Express {
  export interface Request {
    tenant?: string; // I use string for example, you can put other type
    user?: any; // I use string for example, you can put other type
  }
}
