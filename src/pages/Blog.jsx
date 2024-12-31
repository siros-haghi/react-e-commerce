import React from "react";
import PageHeading from "../common/PageHeading";

const Blog = () => {
  return (
    <div>
      <PageHeading home={"home"} pagename={"Blog"} />

      <div className="w-10/12 flex justify-center">
        <div className="my-8 text-3xl font-bold">Blog</div>
      </div>
    </div>
  );
};

export default Blog;
