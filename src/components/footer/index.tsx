import Link from 'next/link';

const links = [
  { url: '/murcia', title: 'Murcia' },
  { url: '/murcia/jumilla', title: 'Jumilla' },
  { url: '/murcia/yecla', title: 'Yecla' },
];

export default function Footer() {
  return (
    <div className="w-full bg-primary">
      <div className="container py-10 px-4 sm:px-6 mx-auto text-white">
        <span className="font-semibold">Farmacias de guardia</span>
        <ul className="mt-4">
          {links.map(({ url, title }) => (
            <li key={url} className="py-1">
              <Link href={url} passHref>
                <a>Farmacias de guardia en {title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
