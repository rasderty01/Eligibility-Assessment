import RootLayout from "./layout";
import FormsPage from "@/pages/forms";

// Use dynamic imports to load the FormsPage component

export default function Home() {
  return (
    <RootLayout>
      <FormsPage />
    </RootLayout>
  );
}
