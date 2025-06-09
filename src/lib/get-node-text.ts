/* eslint-disable no-console */
import { ReactNode } from 'react';

export default function getNodeText(node: ReactNode): string {
  if (node == null) {
    return '';
  }

  switch (typeof node) {
    case 'string':
    case 'number':
      return node.toString();

    case 'boolean':
      return '';

    case 'object': {
      if (Array.isArray(node)) {
        return node.map(getNodeText).join(' ').trim();
      }

      if (
        typeof node === 'object' &&
        node !== null &&
        'props' in node &&
        typeof node.props === 'object' &&
        node.props !== null &&
        'children' in node.props
      ) {
        return getNodeText(node.props.children as ReactNode);
      }

      break;
    }

    default:
      console.warn('Unresolved `node` of type:', typeof node, node);

      return '';
  }

  return '';
}
