import { env } from '../config/env.config';

let requestQueue: Promise<void> = Promise.resolve();
let nextAllowedAt = 0;

export async function waitForRequestSlot(): Promise<void> {
    const limit = env.rateLimit.limitPerMinute;

    if (limit <= 0) return;

    let release!: () => void;
    const previous = requestQueue;

    requestQueue = new Promise<void>((resolve) => {
        release = resolve;
    });

    await previous;

    try {
        const intervalMs = Math.ceil(60_000 / limit);
        const waitMs = Math.max(0, nextAllowedAt - Date.now());

        if (waitMs > 0) {
            await new Promise<void>((resolve) => setTimeout(resolve, waitMs));
        }

        nextAllowedAt = Date.now() + intervalMs;
    } finally {
        release();
    }
}