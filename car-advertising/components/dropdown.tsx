'use client'
import React, { useState } from 'react';
import styles from './dropdown.module.css'


const TitleWithDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h2 className={styles.title}>Title</h2>
                <button className={styles.plusButton} onClick={toggleDropdown}>
                    {isOpen ? '-' : '+'}
                </button>
            </div>

            {isOpen && (
                <div className={styles.dropdown}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                        ultricies orci sit amet lectus egestas, a fermentum libero
                        consectetur. Vestibulum at mi eget odio posuere tincidunt.
                    </p>
                </div>
            )}
        </div>
    );
}

export default TitleWithDropdown;