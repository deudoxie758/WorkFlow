import Link from "next/link";

function Custom404() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">
        <a>Go back to the homepage</a>
      </Link>
    </div>
  );
}

export default Custom404;
