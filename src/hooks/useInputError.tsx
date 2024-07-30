// import {
//   validateBiography,
//   validateEmail,
//   validateName,
//   validatePassword,
//   validateUsername,
// } from "@/utils/inputCheckUtils";
// import { useCallback, useEffect, useState } from "react";

// const useInputValidation = (type: string, value: string): string | null => {
//   switch (type) {
//     case "username":
//       return !validateUsername(value)
//         ? "Username must be 4-15 characters long"
//         : null;
//     case "password":
//       return !validatePassword(value)
//         ? "Password must be 8-15 characters long"
//         : null;
//     case "name":
//       return !validateName(value) ? "Name must be 1-10 characters long" : null;
//     case "bio":
//       return !validateBiography(value)
//         ? "Biography must be 1-100 characters long"
//         : null;
//     case "email":
//       return !validateEmail(value) ? "Invalid email address" : null;
//     default:
//       return null;
//   }
// };
