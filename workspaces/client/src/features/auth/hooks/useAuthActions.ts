import { useStore } from '@wsh-2025/client/src/app/StoreContext';

export function useAuthActions() {
  const { closeDialog, openSignInDialog, openSignOutDialog, openSignUpDialog, signIn, signOut, signUp } = useStore(
    (state) => state.features.auth,
  );

  return { closeDialog, openSignInDialog, openSignOutDialog, openSignUpDialog, signIn, signOut, signUp };
}
