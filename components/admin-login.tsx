"use client";

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { authenticate } from '@/lib/action';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form
      action={formAction}
      className="space-y-6 bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        Veuillez vous connecter
      </h1>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Entrez votre adresse mail"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={3}
            placeholder="Entrez votre mot de passe"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none bg-white"
          />
        </div>
      </div>

      <input type="hidden" name="redirectTo" value={callbackUrl} />

      <button
        aria-disabled={isPending}
        className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
      >
        Vous connecter
      </button>

      {errorMessage && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}