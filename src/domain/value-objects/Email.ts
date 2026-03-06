import { ValidationError } from "../../shared/errors/ValidationError";

const MAX_EMAIL_LENGTH = 254; // RFC 5321 hard limit
const emailRegex = /^[^\s@]+@[^\s@]{1,253}\.[^\s@]{2,63}$/;

export class Email {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(email: string): Email {
    const normalized = email.trim().toLowerCase();

    if (normalized.length > MAX_EMAIL_LENGTH) {
      throw new ValidationError("Invalid email format");
    }

    if (!emailRegex.test(normalized)) {
      throw new ValidationError("Invalid email format");
    }

    return new Email(normalized);
  }

  public getValue(): string {
    return this.value;
  }
}