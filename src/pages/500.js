import Link from "next/link";

function Custom500() {
  return (
    <div>
      <h1>500 - Internal server error</h1>
      <Link href="/">
        <a>Go back to the homepage</a>
      </Link>
    </div>
  );
}

export default Custom500;
