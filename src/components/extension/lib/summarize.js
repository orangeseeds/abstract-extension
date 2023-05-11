import { get } from "svelte/store";
import { jwtToken } from "../store";
import { SUMMARY } from "./routes";

export const summarizeText = async (payload, domain) => {
    // const url = `${SUMMARY}/?domain=${domain}`
    const url = `http://localhost:8000/api/summary/?domain=${domain}`
    const data = {
        request: payload,
        domain: domain,
    }
    let token = get(jwtToken)
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        return await response.json();
    } else if (response.status == 403) {
        throw new Error("Forbidden");
    }
};

export const getSummaryList = async (domain) => {
    // const url = `${SUMMARY}?domain=${domain}`
    const url = `http://localhost:8000/api/summary/?domain=${domain}`
    let token = get(jwtToken)
    let response = await fetch(url, {
        method: "GET",
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
