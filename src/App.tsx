import { Route, Routes } from "react-router-dom";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import { Home } from "./_root/pages";
import RootLayout from "./_root/RootLayout";
function App() {
  return (
    <>
      <main className="flex h-screen">
        <Routes>
          {/* Public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SigninForm />}></Route>
            <Route path="/sign-up" element={<SignupForm />}></Route>
          </Route>
          {/* Private routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />}></Route>
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
