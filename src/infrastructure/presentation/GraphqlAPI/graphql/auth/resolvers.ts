import { IContextProvider } from '../../helpers/context';
import { UnauthorizedError } from '../../helpers/errors';

export default {
    Mutation: {
        createAccessToken: async (root, { email, password }, ctx: IContextProvider) => {
            const token = await ctx.authService.getAccessToken(email, password);
            if (!token) throw new UnauthorizedError();
            return { token }
        }
    }
}