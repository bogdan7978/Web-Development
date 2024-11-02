"use client"

import styles from "./Navbar.module.css"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useEffect } from "react"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    //toggle the burger menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className={styles.nav}>
            <Link className={styles.logo}  href="/">
                <Image
                    src="/logo.svg"
                    width={180}
                    height={60}
                    alt="home-logo"
                />
            </Link>

            {/* Burger menu icon */}
            <div className={styles.burger} onClick={toggleMenu}>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
            </div>

            <ul className={`${styles.links} ${isOpen ? styles.open : ""}`}>
                <li>
                    <Link href={'/campaign'}>Campaign ideas</Link>
                </li>
                <li>
                    <Link href={'/about'}>About</Link>
                </li>
                <li>
                    <Link href={'/contact_page'}>Contact</Link>
                </li>
            </ul>
        </nav>
    )
}