import Article from "@/components/Article";
import { IBlog } from "@/utils/interface";
import Link from "next/link";

async function Blogs() {
  const result = await fetch("http://localhost:8000/posts", { cache: "no-store" });
  const data = await result.json() as IBlog[];

  const sortedData = data.sort((a, b) => {
    const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : (a.publishedAt ? new Date(a.publishedAt).getTime() : 0);
    const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : (b.publishedAt ? new Date(b.publishedAt).getTime() : 0);

    return dateB - dateA;
  });

  return (
    <div className='container'>
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
        {sortedData.map(item => (
          <Link href={`/blogs/${item.id}`} key={item.id}>
            <Article {...item} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Blogs
