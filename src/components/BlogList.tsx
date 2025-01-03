import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { File } from "../types/File";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppBar from "./AppBar";

interface BlogListProps {
  files: File[];
}

const BlogList: React.FC<BlogListProps> = ({ files }) => {
  const [visibleFiles, setVisibleFiles] = useState<File[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadMoreFiles = () => {
      const nextFiles = files.slice(0, page * itemsPerPage);
      setVisibleFiles(nextFiles);
    };

    loadMoreFiles();
  }, [page, files]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 10
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="bg-slate-100 min-h-screen min-w-screen">
      <AppBar />
      <div className="flex">
        <div className="grow" />
        <div className="flex-col flex-none max-w-[800px] w-11/12 pt-6">
          {visibleFiles.map((file) => (
            <Card key={file.name} className="m-2 border-none mb-3">
              <CardHeader className="p-4">
                <CardDescription>{file.date}</CardDescription>
                <Link to={`/${file.name}`}>
                  <CardTitle>{file.title}</CardTitle>
                </Link>
              </CardHeader>
              <CardContent className="px-4 py-0 m-0">
                <p>{file.excerpt}</p>
              </CardContent>
              <CardFooter className="px-2 py-3 m-1 text-xs justify-end">
                <Link to={`/${file.name}`}>Read...</Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="grow" />
      </div>
    </div>
  );
};

export default BlogList;
