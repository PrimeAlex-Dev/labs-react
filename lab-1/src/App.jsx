import AppNavBar from "./components/AppNavBar";
import OrchidList from "./components/OrchidList";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <AppNavBar />
      <main className="flex-grow-1">
        <OrchidList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
