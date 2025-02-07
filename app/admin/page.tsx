import Article from "@/components/Article";
import { IBlog } from "@/utils/interface";

async function AdminPage() {
  const result = await fetch("http://localhost:8000/posts", { cache: "no-store" });
  const data = await result.json() as IBlog[];

  const sortedData = data.sort((a, b) => {
    const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : (a.publishedAt ? new Date(a.publishedAt).getTime() : 0);
    const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : (b.publishedAt ? new Date(b.publishedAt).getTime() : 0);

    return dateB - dateA;
  });

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {sortedData.map((item: IBlog) => (
          <Article key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
