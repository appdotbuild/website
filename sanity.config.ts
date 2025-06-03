import { table } from '@sanity/table';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { media } from 'sanity-plugin-media';
import { DefaultDocumentNodeResolver, structureTool } from 'sanity/structure';

import { schemaTypes } from '@/lib/sanity/schemas';
import structure from '@/lib/sanity/structure';
import { getStructureDocumentViews } from '@/lib/sanity/utils/get-structure-document-views';

import SanityLogo from './src/svgs/logo-sanity.inline.svg';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!;

const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  return S.document().views(getStructureDocumentViews(S, schemaType));
};

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'App.build',
  icon: SanityLogo,
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    visionTool({ defaultApiVersion: apiVersion, defaultDataset: dataset }),
    media(),
    table(),
  ],
  schema: {
    types: schemaTypes,
  },
});
