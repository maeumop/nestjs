import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export const ApiBearerTokenHeader = () => {
  return applyDecorators(
    ApiHeader({
      name: 'authorization',
      required: true,
      description: 'Bearer Token',
      example: 'Bearer { token }',
    }),
  );
};

export const ApiBasicTokenHeader = () => {
  return applyDecorators(
    ApiHeader({
      name: 'authorization',
      required: true,
      description: 'Basic Token',
      example: 'Basic { token }',
    }),
  );
};
