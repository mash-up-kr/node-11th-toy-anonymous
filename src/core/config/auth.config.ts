import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export type HashingOptions = {
  iv: string;
  salt: string;
};

export type AuthConfig = JwtModuleOptions & { hashingOptions: HashingOptions };

export default registerAs(
  'auth',
  async (): Promise<AuthConfig> => {
    return {
      secret: 'anonymous', // TODO: from environment or remote
      signOptions: { expiresIn: '365d' },
      hashingOptions: {
        iv: 'blahblah',
        salt: '1234',
      },
    };
  },
);
