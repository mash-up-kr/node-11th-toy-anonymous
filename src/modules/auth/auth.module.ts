import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PasswordHasher } from './password-hasher';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get('auth').secret,
          signOptions: config.get('auth').signOptions,
        };
      },
      imports: [ConfigModule],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, PasswordHasher],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
