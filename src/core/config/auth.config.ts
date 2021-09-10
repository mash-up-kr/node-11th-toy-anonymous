import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'auth',
  async (): Promise<JwtModuleOptions> => {
    return {
      secret: 'anonymous', // TODO: from environment or remote
      signOptions: { expiresIn: '365d' },
    };
  },
);
