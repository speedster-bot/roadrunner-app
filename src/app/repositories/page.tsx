"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button, TextField, Container, Typography, Grid } from "@mui/material";
import { useGetRepositories } from "@/api/repositories";
import Link from "next/link";

const getFilterRepositories = (repositories: any, searchTerm: string) => {
  console.log(searchTerm);
  return repositories?.filter((repository: any) =>
    repository.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: allRepositories } = useGetRepositories();
  const [filteredRepositories, setFilteredRepositories] = useState([]);

  useEffect(() => {
    setFilteredRepositories(allRepositories);
  }, [allRepositories]);

  const handleSearch = useCallback(() => {
    setFilteredRepositories(getFilterRepositories(allRepositories, searchTerm));
  }, [allRepositories, searchTerm]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, handleSearch]);

  if (!filteredRepositories) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Repositories
      </Typography>
      <div style={{ marginTop: "100px" }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          size="small"
          sx={{ width: "50%" }}
        />
      </div>
      <div style={{ marginTop: "70px" }}>
        {filteredRepositories.map((repository: any) => (
          <div key={repository.id}>
            <Link href={`repositories/${repository.id}`}>
              {repository.owner}/{repository.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
