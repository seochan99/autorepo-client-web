'use client';

import { Suspense } from 'react';
import OAuthSuccessPage from '@/pages/oauth2/success/oauth-success.ui';

export default function Page() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center">
                    <div className="size-32 animate-spin rounded-full border-y-2 border-neutral-900"></div>
                </div>
            }
        >
            <OAuthSuccessPage />
        </Suspense>
    );
}
