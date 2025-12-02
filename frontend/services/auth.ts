export async function registerUser(data: {
    full_name: string;
    email: string;
    password: string;
}) {
    const res = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return await res.json();
}

export async function loginUser(data: {
    email: string;
    password: string;
}) {
    const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return await res.json();
}
