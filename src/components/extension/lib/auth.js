import { get } from "svelte/store";
import { jwtToken } from "../store";
import { LOGIN, REFRESH, SIGNUP } from "./routes";

export const login = async (email, password) => {
    let response = await fetch(LOGIN, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`Failed to login`);
    }
};



export const signup = async (username, email, password) => {
    let response = await fetch(SIGNUP, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        })
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`Failed to login`);
    }
};


export const refreshToken = async () => {
    let token = get(jwtToken)
    let response = await fetch(REFRESH, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`Failed to login`);
    }
};
