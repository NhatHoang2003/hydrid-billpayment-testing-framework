import { env } from '../config/env.config';

const requestTimestamps: number[] = [];
let requestQueue: Promise<void> = Promise.resolve();

export async function waitForRequestSlot(): Promise<void> {
    const limit = env.rateLimit.limitPerMinute;
    if (limit <= 0) return;

    let release!: () => void;
    const previous = requestQueue;
    requestQueue = new Promise<void>((resolve) => { release = resolve; });
    await previous;

    try {
        while (true) {
            const now = Date.now();
            while (requestTimestamps.length && now - requestTimestamps[0] >= 60_000) {
                requestTimestamps.shift();
            }

            if (requestTimestamps.length < limit) {
                requestTimestamps.push(now);
                return;
            }

            await new Promise<void>((resolve) => setTimeout(
                resolve,
                Math.max(1, 60_000 - (now - requestTimestamps[0]))
            ));
        }
    } finally {
        release();
    }
}
