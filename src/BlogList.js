import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";

const BlogList = ({ blogs, title}) => {
  return (
    <DndContext collisionDetection={closestCorners}>
    <div className="blog-list">
      <h2>{ title }</h2>
      <SortableContext items={blogs} strategy={verticalListSortingStrategy}>
      {blogs.map(blog => (
        <div className="blog-preview" key={blog.id} >
          <Link to={`/blogs/${blog.id}`}>
            <h2>{ blog.title }</h2>
            <p>Written by { blog.author }</p>
          </Link>
        </div>
      ))}
      </SortableContext>
    </div>
    </DndContext>
  );
}
 
export default BlogList;