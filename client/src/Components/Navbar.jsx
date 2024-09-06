import Logo from "../assets/logo.png";
import "../Scss/Navbar.scss";
export default function Header() {
  return (
    <>
      <div className="navbar-parent-container">
        <div className="navbar-left-container">
          <img src={Logo} alt="" className="navbar-logo" />
          <h2 className="navbar-heading">Khalis Foundation</h2>
        </div>
        <div className="navbar-right-container">
          <h2 className="right-container-heading">SYCI - Voice Search Demo</h2>
        </div>
      </div>
    </>
  );
}
