import { mergeResolvers } from 'merge-graphql-schemas';

import { resolvers as auth } from './auth';
import { resolvers as user } from './user';

export default mergeResolvers([auth, user]);
