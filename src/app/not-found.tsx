"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function NotFound() {
  const history = useRouter();

  useEffect(() => {
    history.replace("/boards-panel");
  }, []);
}

export default NotFound;
