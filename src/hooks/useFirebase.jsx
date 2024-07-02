import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import axios from "axios";

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [admin, setAdmin] = useState(false);
  const [savingUser, setSavingUser] = useState(false);

  const auth = getAuth(app);

  const registerUser = async (email, password, name, photoURL, navigate) => {
    setIsLoading(true);
    setAuthError("");
    setSavingUser(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
      try {
        const savedUser = await saveUser(email, password, name, photoURL);
        if (savedUser.status === 200) {
          setSavingUser(false);
        }
        navigate(`/register/confirmation/${email}`);
      } catch (error) {
        setAuthError(error?.message);
      }
    } catch (error) {
      setAuthError(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (email, password, location, navigate) => {
    setIsLoading(true);
    setSavingUser(true);
    try {
      const response = await axios.post(
        `https://bikemart-server-side.vercel.app/api/v1/users/login`,
        {
          email,
          password,
        }
      );

      if (response.data.status === "success") {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const { user, token } = response.data.data;
        setUser(user);
        localStorage.setItem("bikemartToken", JSON.stringify(token));
        const url = location?.state?.from || "/";
        navigate(url);
        setAuthError("");
      }
    } catch (error) {
      const response = error.response;
      if (
        response &&
        response.status === 403 &&
        response.data.error === "Your account is not active yet."
      ) {
        // Redirect to confirmAccount page
        navigate(`/register/confirmation/${email}`);
      } else {
        console.log("Error:", response?.data?.error || error.message);
        setAuthError(response?.data?.error || "Login failed");
      }
    } finally {
      setIsLoading(false);
      setSavingUser(false);
    }
  };

  // observer user state
  useEffect(() => {
    const bikemartToken = JSON.parse(localStorage.getItem("bikemartToken"));
    fetch(
      `https://bikemart-server-side.vercel.app/api/v1/users/${user.email}`,
      {
        headers: {
          authorization: `Bearer ${bikemartToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setAdmin(true);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, [auth]);

  useEffect(() => {
    if (user?.email && !savingUser) {
      fetch(
        `https://bikemart-server-side.vercel.app/api/v1/users/${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.data?.role === "admin") setAdmin(true);
          else setAdmin(false);
        });
    }
  }, [user?.email]);

  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => setIsLoading(false));
  };

  const saveUser = async (email, password, name, photoURL) => {
    const user = {
      email,
      name,
      password,
      confirmPassword: password,
      photoURL,
    };
    const response = await axios.post(
      "https://bikemart-server-side.vercel.app/api/v1/users/signup",
      user
    );
    return response;
  };

  return {
    user,
    admin,
    isLoading,
    authError,
    setAuthError,
    registerUser,
    loginUser,
    logOut,
  };
};

export default useFirebase;
