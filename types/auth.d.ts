import type { EducationDepartment } from "@prisma/client";

// auth.d.ts
declare module "#auth-utils" {
  interface User {
    email: string;
    name: string;
    role: string;
    education_department: EducationDepartment;
    profile: any?;
  }

  interface UserSession {
    // Add your own fields
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {};
