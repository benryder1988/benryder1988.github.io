import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import AppBar from "./AppBar";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

interface BlogPostProps {
  fileName: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ fileName }) => {
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      const response = await fetch(`/blog/${fileName}.md`);
      const original_text = await response.text();

      // drop first line with the date
      // could drop based on "date:" and "summary:"
      const date = original_text
        .split("\n")
        .slice(0)[0]
        .replace("date:", "")
        .trim();
      setDate(date);

      const text = original_text.split("\n").slice(2).join("\n");

      setContent(text);
    };

    fetchContent();
  }, [fileName]);

  return (
    <div className="bg-slate-100 min-h-screen min-w-screen">
      <AppBar />
      <div className="flex">
        <div className="grow" />
        <div className="flex-col flex-none max-w-[800px] w-11/12 pt-6">
          <Card className="m-2 border-none mb-10">
            <CardHeader className="p-4 pb-0">
              <CardDescription>{date}</CardDescription>
              <Link to={`/`}>
                <CardTitle>back</CardTitle>
              </Link>
            </CardHeader>
            <CardContent className="px-4 py-0 m-0">
              <Markdown className="markdown">{content}</Markdown>
            </CardContent>
            <CardFooter className="text-xs justify-end">
              <Link to={`/`}>back</Link>
            </CardFooter>
          </Card>
        </div>
        <div className="grow" />
      </div>
    </div>
  );
};

export default BlogPost;
