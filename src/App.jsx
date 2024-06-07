import { useOutletContext } from "react-router-dom";
import CardGrid from "./components/CardGrid";

function App() {
    const {products, error, loading} = useOutletContext();
    const errorComponent = (<p>A network error was encountered</p>);
      const loadingComponent = (<p>Loading...</p>)
  return (
    <>
      {
        // loading ? loadingComponent :
        //   error ? errorComponent :
        <CardGrid products={products} />
      }
    </>
  )
}

export default App
