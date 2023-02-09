import { signOut } from "next-auth/react";

import React from "react";

function SignOut() {
  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      SignOut
    </button>
  );
}

export default SignOut;
