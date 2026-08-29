import Link from "next/link";

export function BrandMark() {
  return (
    <Link href="/" className="mark" aria-label="Sam Johnson, home">
      <span>SAM</span>
      <b>ASA</b>
      <span>JOHNSON</span>
    </Link>
  );
}
