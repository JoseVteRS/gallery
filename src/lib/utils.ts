import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomCode(length: number = 6) {
  const validCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomCode = "";
  for (let i = 0; i < length; i++) {
    randomCode += validCharacters.charAt(
      Math.floor(Math.random() * validCharacters.length),
    );
  }
  return randomCode;
}


export function generatePassword(length: number = 10) {
  const validCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let randomCode = "";
  for (let i = 0; i < length; i++) {
    randomCode += validCharacters.charAt(
      Math.floor(Math.random() * validCharacters.length),
    );
  }
  return randomCode;
}
