import { APIGatewayProxyEvent } from 'aws-lambda';
import { IncomingHttpHeaders } from 'http';
import jwt, { JsonWebTokenError, JwtPayload, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import ms from 'ms';
import _ from 'lodash';
interface PayloadAccessToken {
  accessToken: string;
  expiresIn: number;
}

export type DtoVerifyAccessToken =
  | {
      data: null;
      message: string;
    }
  | {
      data: string | JwtPayload;
      message: string;
    }
  | undefined;

/**
 *
 * @param payload
 * @returns
 */
export async function generateAccessToken(payload: any): Promise<PayloadAccessToken | undefined> {
  const getMilliSecondExpires = ms('1d');
  const expiresIn = Number(getMilliSecondExpires) / 1000;
  // const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365;

  const accessToken = jwt.sign(JSON.parse(JSON.stringify(payload)), 'JWT_SECRET_ACCESS_TOKEN', { expiresIn });

  return { accessToken, expiresIn };
}
/**
 *
 * @param payload
 * @returns
 */
export async function generateRefreshAccessToken(payload: any): Promise<PayloadAccessToken | undefined> {
  const getMilliSecondExpires = ms('1d');
  const expiresIn = Number(getMilliSecondExpires) / 1000;

  const accessToken = jwt.sign(JSON.parse(JSON.stringify(payload)), 'JWT_SECRET_ACCESS_TOKEN', { expiresIn });

  return { accessToken, expiresIn };
}

/**
 *
 * @param payload
 * @returns
 */
export async function generateForgetPasswordAccessToken(payload: any): Promise<PayloadAccessToken | undefined> {
  const expiresIn = 300;

  const accessToken = jwt.sign(JSON.parse(JSON.stringify(payload)), 'JWT_SECRET_ACCESS_TOKEN', { expiresIn });

  return { accessToken, expiresIn };
}

/**
 *
 * @param headers
 * @returns
 */
export function getToken(headers: IncomingHttpHeaders): string | null | any {
  if (headers?.token) {
    return headers.token;
  }

  return null;
}

/**
 *
 * @param req
 * @returns
 */
export function currentToken(req: APIGatewayProxyEvent): string {
  const getCookie = req.headers;
  const getHeaders = req.headers;

  let curToken = '';

  if (!_.isEmpty(getCookie.token)) {
    curToken = getCookie.token;
  } else {
    curToken = getToken(getHeaders);
  }

  return curToken;
}

/**
 *
 * @param token
 * @returns
 */
export async function verifyAccessToken(token: string): Promise<DtoVerifyAccessToken> {
  try {
    if (!token) {
      return { data: null, message: 'Unauthorized!' };
    }

    const data = jwt.verify(token, 'JWT_SECRET_ACCESS_TOKEN');
    return { data, message: 'Token is verified' };
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      console.log('JWT Expired Error:', err.message);
      return { data: null, message: `JWT Expired Error: ${err.message}` };
    }

    if (err instanceof JsonWebTokenError) {
      console.log('JWT Token Error:', err.message);
      return { data: null, message: `JWT Token Error: ${err.message}` };
    }

    if (err instanceof NotBeforeError) {
      console.log('JWT Not Before Error:', err.message);
      return { data: null, message: `JWT Not Before Error: ${err.message}` };
    }
  }
}
export async function verifyRefreshAccessToken(token: string): Promise<DtoVerifyAccessToken> {
  try {
    if (!token) {
      return { data: null, message: 'Unauthorized!' };
    }

    const data = jwt.verify(token, 'JWT_SECRET_ACCESS_TOKEN');
    return { data, message: 'Token is verified' };
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      console.log('JWT Expired Error:', err.message);
      return { data: null, message: `JWT Expired Error: ${err.message}` };
    }

    if (err instanceof JsonWebTokenError) {
      console.log('JWT Token Error:', err.message);
      return { data: null, message: `JWT Token Error: ${err.message}` };
    }

    if (err instanceof NotBeforeError) {
      console.log('JWT Not Before Error:', err.message);
      return { data: null, message: `JWT Not Before Error: ${err.message}` };
    }
  }
}

export async function verifyForgetPasswordAccessToken(token: string): Promise<DtoVerifyAccessToken> {
  try {
    if (!token) {
      return { data: null, message: 'Unauthorized!' };
    }

    const data = jwt.verify(token, 'JWT_SECRET_ACCESS_TOKEN');
    return { data, message: 'Token is verified' };
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      console.log('JWT Expired Error:', err.message);
      return { data: null, message: `JWT Expired Error: ${err.message}` };
    }

    if (err instanceof JsonWebTokenError) {
      console.log('JWT Token Error:', err.message);
      return { data: null, message: `JWT Token Error: ${err.message}` };
    }

    if (err instanceof NotBeforeError) {
      console.log('JWT Not Before Error:', err.message);
      return { data: null, message: `JWT Not Before Error: ${err.message}` };
    }
  }
}
/**
 * Generate Random OTP
 * @returns {string}
 */
export async function getSixDigitCode(): Promise<string> {
  //getSixDigitCode
  // which stores all digits
  const digits = '0123456789';
  let OTP = '';

  for (let i = 0; i < 6; i += 1) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  return OTP;
}
