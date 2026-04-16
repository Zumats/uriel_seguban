"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md space-y-4 text-center">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="text-sm text-zinc-400">
          An unexpected error occurred while loading this section.
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
