import Link from 'next/link';

export default function Footer() {
  return (
    <div className="w-full bg-primary">
      <div className="container m-auto py-10 text-white">
        <span className="font-semibold">Farmacias de guardia</span>
        <br />
        <br />
        <Link href="/murcia/jumilla" passHref>
          <a className="my-1">Farmacias de guardia en Jumilla</a>
        </Link>
      </div>
    </div>
  );
}
