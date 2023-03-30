import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';

export const middyfy = (handler) => {
  console.log('MIDDY ==>', middy(handler).use(middyJsonBodyParser()));

  return middy(handler).use(middyJsonBodyParser());
};
