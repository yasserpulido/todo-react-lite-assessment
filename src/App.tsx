import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Todo from "./pages/Todo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
