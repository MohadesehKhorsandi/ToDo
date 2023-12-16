const BASE_URL = "http://von.bludurk.xyz:3000";

export async function register(user) {
  try {
    const res = await fetch(`${BASE_URL}/auth/register/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
  } catch (error) {}

  console.log(res);
}

export async function login(username, password) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
