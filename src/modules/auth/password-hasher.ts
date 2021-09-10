import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordHasher {
  async hash(text: string): Promise<string> {
    return text;
  }

  async equal({ plain, hashed }: { plain: string; hashed: string }) {
    return plain === hashed;
  }
}
