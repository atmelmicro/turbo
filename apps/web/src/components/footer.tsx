import { Text } from "@radix-ui/themes";
import { Link } from "./link";
import { twc } from "react-twc";

const FooterStack = twc.section`flex flex-col gap-1`;

export function Footer() {
  return (
    <footer className="w-full bg-stone-300 px-4 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3  lg:grid-cols-5">
        <FooterStack>
          <Text size="5">MAT Development</Text>
          <Text>&copy; 2023-{new Date().getFullYear()}</Text>
          <Link href="/lang">Change language</Link>
        </FooterStack>
        <FooterStack>
          <Text weight="medium">Products</Text>
          <Link href="/products/mat-blinds">MAT Blinds</Link>
          {/*<Link href="/products/mat-hub">MAT Hub</Link>*/}
        </FooterStack>
        <FooterStack>
          <Link href="https://www.instagram.com/mat_development/">
            Instagram
          </Link>
          {/*<Link href="/products/mat-hub">MAT Hub</Link>*/}
        </FooterStack>
        {/*<FooterStack>
          <Text weight="medium">Store</Text>
          <Link href="/">MAT Blinds</Link>
          <Link href="/">MAT Battery</Link>
          <Link href="/">MAT Hub</Link>
          <Link href="/">Check order status</Link>
          <Link href="/">Cart</Link>
        </FooterStack>
        <FooterStack>
          <Text weight="medium">Auth</Text>
          <Link href="/auth/login">Log in</Link>
          <Link href="/auth/register">Sign up</Link>
          <Link href="/auth/reset">Reset password</Link>
          <Link href="/auth/logout">Log out</Link>
        </FooterStack>
        <FooterStack>
          <Text weight="medium">Support</Text>
          <Link href="/support/kb">Knowledge base</Link>
          <Link href="/support/contact">Contact us</Link>
  </FooterStack>*/}
      </div>
    </footer>
  );
}
