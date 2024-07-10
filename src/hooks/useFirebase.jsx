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

  const auth = getAuth(app);

  const registerUser = async (email, password, name, photoURL, navigate) => {
    setIsLoading(true);
    setAuthError("");
    try {
      const savedUser = await saveUser(email, password, name, photoURL);
      if (savedUser.status === 200) {
        try {
          const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          if (result) {
            navigate(`/register/confirmation/${email}`);
          }
        } catch (error) {
          setAuthError(error.message);
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error?.response?.data?.error);
      if (error?.response?.data?.error?.errors?.email?.message) {
        setAuthError(error?.response?.data?.error?.errors?.email?.message);
      } else {
        setAuthError(error?.response?.data?.error?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (email, password, location, navigate) => {
    setIsLoading(true);
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
    }
  };

  // observer user state
  useEffect(() => {
    const bikemartToken = JSON.parse(localStorage.getItem("bikemartToken"));
    const unsubscribed = onAuthStateChanged(auth, (userCredentials) => {
      if (userCredentials) {
        setIsLoading(true);
        fetch(
          `https://bikemart-server-side.vercel.app/api/v1/users/${userCredentials?.email}`,
          {
            headers: {
              authorization: `Bearer ${bikemartToken}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setUser(data?.data);
            if (data?.data?.role === "admin") {
              setAdmin(true);
            }
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
          });
      } else {
        setUser({});
        setIsLoading(false);
      }
    });
    return () => unsubscribed;
  }, [auth, user?.email]);

  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
        localStorage.removeItem("bikemartToken");
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
