import { useRouter } from "next/router";
import React from "react";
import SearchList from "../../components/shopping/SearchList";
const Search = () => {
  const router = useRouter();
  // console.log("index search", router.query.search);
  return <SearchList param={router.query.search} />;
};

export default Search;
