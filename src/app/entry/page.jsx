import EntryGate from "./EntryGate";

export const metadata = {
  title: "Research Use Confirmation | 100 Peptides Research",
  description:
    "Review the research-use conditions before entering 100 Peptides Research.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EntryPage({ searchParams }) {
  const params = await searchParams;

  return (
    <EntryGate
      next={params?.next || "/"}
      error={params?.error || ""}
    />
  );
}