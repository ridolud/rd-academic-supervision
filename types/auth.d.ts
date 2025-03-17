import type { EducationDepartment } from "@prisma/client";
import type { UserRole } from "./user";

// auth.d.ts
declare module "#auth-utils" {
  interface User {
    email: string;
    name: string;
    role: UserRole;
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
