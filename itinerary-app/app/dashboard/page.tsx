import { SignOutButton } from "../components/buttons";
import { getServerSession } from 'next-auth';
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from 'next/navigation';
import React, { useState } from "react";
import styles from "./page.module.css"


export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    
    if (!session) {
        redirect('/api/auth/signin');
    }
    
    return (
        <main>
            <h1>
                Main app
            </h1>
            <h2 className={styles.h2}>Start</h2>
            <div className={styles.start}>
                <label>Select starting point: </label>
                <input name="start-input"></input>
                <label>Select the date: </label>
                <input type="datetime-local"></input>
            </div>

            <h2 className={styles.h2}>End</h2>
            <div className={styles.end}>
                <label>Select end point: </label>
                <input name="start-input"></input>
                <label>Select the date: </label>
                <input type="datetime-local"></input>
            </div>
        </main>
        
    )
}