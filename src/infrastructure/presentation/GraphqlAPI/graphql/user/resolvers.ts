import { IContext } from '../../helpers/context';
import User from '../../../../../domain/entities/User';
import { isAuthenticatedResolver } from '../../helpers/auth';

export default {
    Query: {
        profile: isAuthenticatedResolver.createResolver(
            (root, query, { user }: IContext) => user
        ),
        users: isAuthenticatedResolver.createResolver(
            (root, query, { userService }: IContext): Promise<User[]> => userService.listUsers()
        )
    },
    Mutation: {
        createUser: async (root, { user }, ctx: IContext): Promise<User> => {
            return await ctx.userService.createUser(user);
        }
    }
}
