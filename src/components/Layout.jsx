import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
