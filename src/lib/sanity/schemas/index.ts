import { SchemaTypeDefinition } from 'sanity';

import blog from './pages/blog';
import legal from './pages/legal';
import shared from './shared';

const PAGE_TYPES = [...blog, legal];

const SHARED_TYPES = [...shared];

export const schemaTypes = [...PAGE_TYPES, ...SHARED_TYPES] as SchemaTypeDefinition[];
