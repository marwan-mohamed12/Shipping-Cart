import Navbar from "./Navbar";
import CartContainer from "./CartContainer";
import { useGlobalContext } from "./context";
import ClipLoader from "react-spinners/ClipLoader";

const App = () => {
    const { loading } = useGlobalContext();

    if (loading) {
        return (
            <div className="loading">
                <ClipLoader color="#2680C0" size={80} speedMultiplier={1} />
            </div>
        );
    }

    return (
        <main>
            <Navbar />
            <CartContainer />
        </main>
    );
};
export default App;
