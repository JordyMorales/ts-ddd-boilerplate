import "reflect-metadata";
import { container } from '../../ioc/ioc-container'

import { Context } from './graphql';

Context.bind(container);

export { container };