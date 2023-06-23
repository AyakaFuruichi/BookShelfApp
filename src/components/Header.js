import { Link } from "react-router-dom";

const Header = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<>
			<header className="header">
				<div className="header__inner">
					<Link to="/">
						<img src="/images/logo_blue_2.png" alt="BookShelf" />
					</Link>

					<nav className="header__nav">
						<ul className="header__ul">
							<li className="header__list">
								<Link to="/addBook">Add Book</Link>
							</li>
							<li className="header__list">
								<Link to="/">Book List</Link>
							</li>
              <li className="header__list">
              <Link to="/">
								<button className="navButton" onClick={handleLogout}>LogOut</button></Link>
              </li>
						</ul>
						
					</nav>
				</div>
			</header>
		</>
	);
};

export default Header;
