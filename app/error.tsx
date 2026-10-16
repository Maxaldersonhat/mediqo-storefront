'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h2 className="text-lg font-semibold text-gray-900">Something went wrong</h2>
      <p className="mt-2 text-sm text-gray-500">{error.message || 'Please try again.'}</p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded-lg bg-[#0F3D3E] px-4 py-2 text-sm font-medium text-white hover:bg-[#14524f]"
      >
        Try again
      </button>
    </main>
  );
}