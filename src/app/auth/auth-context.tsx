"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";

import jwt from "jsonwebtoken";

type AuthContextType = {
	isAuthenticated: boolean;
	login: () => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// Check if user is authenticated on component mount
	useEffect(() => {
		const checkAuth = () => {
			const token = localStorage.getItem("auth_token");

			const decoded = jwt.decode(token ? token : "", { complete: true });
			if (decoded) {
				// Check if token is expired
				if (
					decoded &&
					typeof decoded === "object" &&
					"exp" in decoded &&
					new Date().getTime() < Number(decoded.exp) * 1000
				) {
					setIsAuthenticated(true);
				} else {
					// Token expired, clean up
					localStorage.removeItem("auth_token");
					setIsAuthenticated(false);
				}
			}
		};

		checkAuth();
	}, []);

	const login = async () => {
		// Set token and expiry (24 hours)
		setIsAuthenticated(true);

		const token = jwt.sign(
			{ user: process.env.NEXT_PUBLIC_DEMO_EMAIL },
			`${process.env.SECRET_KEY}`,
			{ expiresIn: "24h" }
		);
		console.log("Token:", token);
		localStorage.setItem("auth_token", token);
	};

	const logout = () => {
		localStorage.removeItem("auth_token");
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
