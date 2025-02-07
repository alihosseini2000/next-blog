"use client";

import { IBlog } from "@/utils/interface";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Article({ id, title, content, publishedAt, updatedAt, slug, category }: IBlog) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this article?");
    if (confirmDelete) {
      try {
        const res = await fetch(`http://localhost:8000/posts/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("Article deleted successfully!");
          window.location.reload(); // Refresh the page after deletion
        } else {
          alert("Failed to delete article.");
        }
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  return (
    <div className="shadow-md border rounded-xl h-96 p-4 flex flex-col gap-4 bg-white">
      <div className="flexBetween">
        <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full w-fit">
          {category}
        </span>

        {isAdmin && (
          <div className="flex gap-2">
            <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded-md">
              Delete
            </button>
            <Link href={`/admin/edit/${id}`} className="bg-yellow-500 text-white px-3 py-1 rounded-md">
              Edit
            </Link>
          </div>
        )}

      </div>
      <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{title}</h3>

      <p className="text-gray-600 line-clamp-3">{content}</p>

      <p className="text-sm text-gray-500 italic">{slug}</p>

      <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
        <p>{updatedAt ? updatedAt : publishedAt}</p>
        <p className="font-medium">{publishedAt ? "Published" : "Edited"}</p>
      </div>
    </div>
  );
}

export default Article;
