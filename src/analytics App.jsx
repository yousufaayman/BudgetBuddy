import Analysis from "./pages/analysis";

function App() {
  return (
    <Route path="/analysis" element={<Auth><Analysis/></Auth>} />
  );
}

export default App;
