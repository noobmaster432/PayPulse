import axios from "axios";

const apiURL = `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1`;

// Sign up a new user
export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${apiURL}/user/signup`, userData);
    localStorage.setItem("token", response.data.token);
    console.log("User signed up successfully");
    return response.data.user;
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

// Sign in an existing user
export const signIn = async (userData) => {
  try {
    const response = await axios.post(`${apiURL}/user/signin`, userData);
    const user = response.data;
    localStorage.setItem("token", response.data.token);
    console.log("User signed in successfully:", user);
    return response.data.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error("Failed to sign in");
  }
};

// Log out a user
export const logOut = () => {
    localStorage.removeItem("token");
    console.log("User logged out");
}

// Edit user details
export const editUser = async (userData) => {
  try {
    const response = await axios.put(`${apiURL}/user`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("User details edited successfully:", response.data);
  } catch (error) {
    console.error("Error editing user details:", error);
  }
};

// Search for users
export const searchUser = async (user) => {
  try {
    const response = await axios.get(`${apiURL}/user/bulk?filter=${user}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("Users found:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error searching for users:", error);
  }
};

export const getBalance = async () => {
    try {
        const response = await axios.get(`${apiURL}/account/balance`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        console.log("User balance:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error getting user balance:", error);
    }
}

export const transferMoney = async (data) => {
    try {
        const response = await axios.post(`${apiURL}/account/transfer`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        console.log("Money transferred successfully:", response.data);
    } catch (error) {
        console.error("Error transferring money:", error);
    }
}