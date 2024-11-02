import Link from "next/link";
import Image from "next/image";
import styles from "./NavMenu.module.css"
import { SignInButton } from "./components/buttons";

export default function navMenu() {
    return (
        <nav className={styles.nav}>
            <Link href={'/'}>
                <Image
                    src="/logo.svg"
                    width={200}
                    height={30}
                    alt="home-logo"
                />
            </Link>
            <ul className={styles.links}>
                <li>
                    <Link href={'/about'}>About</Link>
                </li>
                <li>
                    <Link href={'/dashboard'}>Dashboard</Link>
                </li>
                <li className={styles.btn}>
                    <SignInButton />
                </li>
            </ul>
        </nav>
    )
}