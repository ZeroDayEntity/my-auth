// src/types/index.ts

export interface User {
    name: {
      first: string;
      last: string;
    };
    picture: {
      large: string;
    };
    email: string;
  }