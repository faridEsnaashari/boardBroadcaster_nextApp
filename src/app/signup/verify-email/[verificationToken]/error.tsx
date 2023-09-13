"use client";

import Link from "next/link";

export default function Error() {
  return (
    <p>
      <span>url is wrong</span>
      <br />
      <span>
        click here to go to the<Link href="/"> home</Link>
      </span>
    </p>
  );
}
