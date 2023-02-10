import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function checkStatus() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status !== "loading") {
      if (!session) {
        router.push("/login");
      }
    }
  });
}

export default checkStatus;
