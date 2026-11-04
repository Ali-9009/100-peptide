import AccountDashboard from "@/components/account/AccountDashboard";
import { getProducts } from "@/data/products";

export const metadata = {
  title: "Account Dashboard Preview | 100 Peptides Research",
  description: "Preview the account dashboard layout for orders, certificates, addresses, and account preferences.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AccountDashboard products={getProducts().slice(0, 3)} />;
}
