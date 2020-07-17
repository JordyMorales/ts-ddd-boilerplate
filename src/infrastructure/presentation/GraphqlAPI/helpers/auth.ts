import { IContext } from './context';
import { UnauthorizedError } from './errors';
import { createResolver } from 'apollo-resolvers';

export const isAuthenticatedResolver = createResolver(
  async (root, query, context: IContext) => {
    const { authService, userService, headers } = context;

    if (!headers.authorization || !(typeof headers.authorization === 'string')) {
      throw new UnauthorizedError();
    }

    const token = headers.authorization.replace(/Bearer /, '');
    const decodedTocken = await authService.verifyAccessToken(token);

    const user = await userService.getUser(decodedTocken.id)

    if (!user) { throw new UnauthorizedError(); }

    Object.assign(context, { user });
  }
);
