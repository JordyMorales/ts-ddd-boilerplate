import { mergeTypes } from 'merge-graphql-schemas';

import { typeDefs as authTypes } from './auth';
import { typeDefs as userTypes } from './user';

export default mergeTypes([authTypes, userTypes], { all: true });
