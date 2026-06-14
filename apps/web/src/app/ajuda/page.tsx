import AjudaClient, { type HelpCategory } from "./AjudaClient";

async function getHelpCategories(): Promise<HelpCategory[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/help/faqs`, {
      next: { revalidate: 3600 }, // revalida a cada hora
    });
    if (!res.ok) throw new Error("Falha ao buscar FAQs");
    return res.json();
  } catch {
    return [];
  }
}

export default async function AjudaPage() {
  const categories = await getHelpCategories();
  return <AjudaClient categories={categories} />;
}
