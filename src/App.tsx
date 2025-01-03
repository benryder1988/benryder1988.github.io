import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import { File } from "./types/File";

const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await fetch("/blog/files.json");
      const data = await response.json();
      setFiles(data);
    };

    fetchFiles();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogList files={files} />} />
        {files.map((file) => (
          <Route
            key={file.name}
            path={`/${file.name}`}
            element={<BlogPost fileName={file.name} />}
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
