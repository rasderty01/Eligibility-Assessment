import dynamic from "next/dynamic";
import RootLayout from "./layout";
import FormsPage from "@/pages/forms";

// Use dynamic imports to load the FormsPage component

function App() {
  return (
    <RootLayout>
      <FormsPage />
    </RootLayout>
  );
}

export default App;
