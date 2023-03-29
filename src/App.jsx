import Navbar from "./Navbar";
import CartContainer from "./CartContainer";
import { useGlobalContext } from "./context";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#2680C0",
};

const App = () => {
    const { loading } = useGlobalContext();

    if (loading) {
        return (
            <div className="loading">
                <ClipLoader
                    color={"#222"}
                    loading={loading}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
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
