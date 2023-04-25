import './globals.css';
import { Nunito } from 'next/font/google';
import { Navbar } from './components';
import ClientOnly from './components/ClientOnly';
import Modal from './components/modal/Modal';
import RegisterModal from './components/modal/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modal/LoginModal';
import { getCurrentUser } from './actions/get-current-user';
import RentModal from './components/modal/RentModal';

const font = Nunito({
  subsets: ['latin'],
});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RentModal />
          <RegisterModal />
          <Navbar currentUser={user} />
          {/* <Modal isOpen title='Hello Baby' actionLabel={'Do it'} secondaryActionLabel={'Cancel'} /> */}
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
