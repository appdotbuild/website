/* eslint-disable no-console */
import { AnalyticsBrowser } from '@segment/analytics-next';

let analytics: AnalyticsBrowser | null = null;

if (
  typeof window !== 'undefined' &&
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY
) {
  analytics = AnalyticsBrowser.load({ writeKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY });
}

export default async function sendSegmentEvent(
  eventName: string,
  properties?: Record<string, unknown>,
): Promise<void> {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('Segment Event (Dev Mode):', eventName, properties);

      return;
    }

    if (analytics && typeof analytics.track === 'function') {
      await analytics.track(eventName, properties || {});
    } else {
      console.warn('Segment Analytics is not initialized');
    }
  } catch (error) {
    console.error('Failed to send segment event:', error);
  }
}
