import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { BookProvider } from "./contexts/BookContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Page404 from "./pages/Page404";
import Signup from "./pages/Signup/signup.mjs";
import Login from "./pages/Login/login.mjs";

const App = () => {
	const user = localStorage.getItem("token");
	return (
		<BrowserRouter>
			<BookProvider>
				<Header />
				<div className="container">
					<Routes>
						{user && <Route path="/" element={<Books />} />}
						{/* <Route path="/" element={<Books />} /> */}
						<Route path="/signup" exact element={<Signup />} />
						<Route path="/login" exact element={<Login />} />
						<Route path="/" element={<Navigate replace to="/login" />} />
						<Route path="/addBook" element={<Home />} />
						<Route path="/books/:id" element={<Book />} />
						<Route path="/*" element={<Page404 />} />
					</Routes>
				</div>
			</BookProvider>
		</BrowserRouter>
	);
};

export default App;
