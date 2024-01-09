import { createContext } from "react";

const AppContext = createContext({
    searchQuery: "",
    setSearchQuery: () => { }
});

export default AppContext;