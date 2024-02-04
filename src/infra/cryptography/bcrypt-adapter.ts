import { Hasher } from 'src/usecases/protocols/cryptography/hasher';
import * as bcrypt from 'bcrypt';

export class BcryptAdapter implements Hasher {
  async hash(value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, 12);
    return hashedValue;
  }
}
