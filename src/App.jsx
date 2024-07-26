import {Header} from "./components/Header.jsx";
import Products from "./components/Products.jsx";
import CartContextProvider from "./store/shopping-cart-context.jsx";

function App() {
    return (
    <>
        <CartContextProvider>
            <Header />
            <Products />
        </CartContextProvider>
    </>
  );
}

export default App;
