import { Metadata } from "next";

export const dynamic = 'foce-static';

export const metadata: Metadata = {
    title: 'About us',
    description: 'An app to plan your trip'
}
export default async function About() {
    return (
        <main>
            <h1>About us</h1>
            <p>An app where you can put your itinerary in order when traveling on a budget</p>
        </main>
    )
}