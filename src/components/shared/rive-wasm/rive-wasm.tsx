'use client';

import { usePathname } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import riveWASMResource from '@rive-app/canvas/rive.wasm';
import { RuntimeLoader } from '@rive-app/react-canvas';

RuntimeLoader.setWasmUrl(riveWASMResource);

function RiveWasm() {
  const pathname = usePathname();
  const pagesWithRiveInHero: string[] = [];

  if (pagesWithRiveInHero.includes(pathname)) {
    return <link rel="preload" href={riveWASMResource} as="fetch" crossOrigin="anonymous" />;
  }

  return null;
}

export default RiveWasm;
