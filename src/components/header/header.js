import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header>
      <div className="topNav">
        <Image src={"/images/logo.png"} width={50} height={50} alt="logo" />
        <nav>
          <ul>
            <li>
              <Link href="/" passHref>
                Home
              </Link>
            </li>
            <li>
              <Link href="/events" passHref>
                Events
              </Link>
            </li>
            <li>
              <Link href="/about-us" passHref>
                About Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <h1>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum,
        autem.
      </h1>
    </header>
  );
};
