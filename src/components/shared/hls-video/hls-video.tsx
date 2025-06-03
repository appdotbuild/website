'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';

import { ClassName } from '@/types/classname';

import useIsSafari from '@/hooks/use-is-safari';

// Example of optimization parameters:
// mp4: -pix_fmt yuv420p -vf scale=1728:-2 -movflags faststart -vcodec libx264 -crf 20 -g 30
// -m3u8: -codec: copy -start_number 0 -hls_time 3 -hls_list_size 0 -f hls

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Hls = require('hls.js/dist/hls.light.min.js');

type HlsVideoProps = ClassName & {
  videoClassName?: string;
  width: number;
  height: number;
  mp4Src: string;
  m3u8Src: string;
  customInView?: boolean;
  withReset?: boolean;
  withLoop?: boolean;
};

function HlsVideo({
  className,
  videoClassName,
  width,
  height,
  mp4Src,
  m3u8Src,
  customInView,
  withReset = false,
  withLoop = true,
}: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isSafari = useIsSafari();
  const { ref: videoPreloadRef, inView: isInView } = useInView({
    triggerOnce: true,
    rootMargin: '400px 0px',
  });
  const { ref: videoVisibleyRef, inView: isVideoVisible } = useInView({
    threshold: 0.05,
  });

  const setVideoRefs = (el: HTMLVideoElement | null) => {
    if (videoRef.current !== el) {
      videoRef.current = el;
    }
    videoVisibleyRef(el);
  };

  useEffect(() => {
    const videoElement = videoRef?.current;

    if (!videoElement || !isInView) {
      return;
    }

    // Each video is optimized to work well in different browsers
    const videoSrc = isSafari ? mp4Src : m3u8Src;

    // Using HLS.js for browsers that support it, except for Safari which has native HLS support.
    if (Hls.isSupported() && !isSafari) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(videoElement);
    } else {
      const source = document.createElement('source');
      source.src = videoSrc;
      source.type = 'video/mp4';
      videoElement.appendChild(source);
    }
  }, [isInView, isSafari, m3u8Src, mp4Src]);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    const shouldPlay = customInView !== undefined ? customInView : isVideoVisible;

    if (shouldPlay) {
      if (withReset) {
        videoElement.currentTime = 0;
      }

      videoElement.play();
    } else {
      videoElement.pause();
    }
  }, [customInView, isVideoVisible, withReset]);

  return (
    <LazyMotion features={domAnimation}>
      <div className={clsx(className)} ref={videoPreloadRef}>
        <AnimatePresence>
          {isInView && (
            <m.video
              className={clsx(videoClassName)}
              width={width}
              height={height}
              controls={false}
              ref={setVideoRefs}
              loop={withLoop}
              autoPlay
              muted
              playsInline
            />
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}

export default HlsVideo;
