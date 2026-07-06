import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
     
     
      {/* <Navbar /> */}

      <main className="flex-row pt-20 pb-20">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default App;