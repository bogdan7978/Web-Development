import NavMenu from '@/app/NavMenu';
import './globals.css';
import { Open_Sans } from 'next/font/google';
import Link from 'next/link';
import AuthProvider from './AuthProvider';


const myFont = Open_Sans({ weight: '400', subsets: ['latin'] });

export const metadata = {
  title: 'Budget travel itinerary maker',
  description: 'Put your itinerary in order when traveling on a budget',
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
      <AuthProvider>
        <html lang="en">
          <body>
            <div className="container">
              <NavMenu />
              <main>{children}</main>

              <footer>
                <p>
                  Inspired from the {' '}
                  <Link href="https://fireship.io">
                    Fireship Next.js 14 Full Course
                  </Link>
                </p>
              </footer>
            </div>
          </body>
        </html>
      </AuthProvider>
  );
}
