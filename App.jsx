import React from "react";
import { ItemList } from "./components/ItemList";

const apiUrl = "https://rickandmortyapi.com/api/character";
const PAGE_LIMIT = 4;

const App = () => {
  return <ItemList url={apiUrl} pageLimit={PAGE_LIMIT} />;
};

export default App;
