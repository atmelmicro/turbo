import { Link } from "@/components/link";

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-5xl p-4 pt-20">
      <article className="grid gap-2">
        <div></div>
        <div className="flex flex-row justify-between">
          <section>
            <h1 className="text-stone-500">MAT Blinds</h1>
            <p className="text-lg font-medium">
              The blinds of tommorow, avalible now.
            </p>
          </section>
          <section className="flex flex-col items-end justify-center">
            <Link>Order</Link>
            <Link href="/products/mat-blinds">Learn More</Link>
          </section>
        </div>
      </article>
    </main>
  );
}
