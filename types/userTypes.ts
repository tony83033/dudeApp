// types/userTypes.ts
export interface User {
    userId: string; // Matches the 'userId' attribute in your collection
    email: string; // Matches the 'email' attribute
    name?: string; // Optional, matches the 'name' attribute
    phone?: string; // Optional, matches the 'phone' attribute
    profileUrl?: string; // Optional, matches the 'profileUrl' attribute
    createdAt: string; // Matches the 'createdAt' attribute
    updatedAt: string; // Matches the 'updatedAt' attribute
  }