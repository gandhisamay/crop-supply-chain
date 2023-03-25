import { EthProvider } from "./contexts/EthContext";
import Registration from "./Registration";

function App() {
  return (
    <EthProvider>
      <Registration />
    </EthProvider>
  );
}

export default App;
