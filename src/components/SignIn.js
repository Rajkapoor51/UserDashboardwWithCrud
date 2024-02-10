import React, { useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./Config/Config";
import GoogleButton from 'react-google-button';
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const db = getDatabase();
    const navigate = useNavigate();
    const [isDataSaved, setIsDataSaved] = useState(false);

    useEffect(() => {
        if (isDataSaved) {
            navigate("/");
        }
    }, [isDataSaved, navigate]);

    const handleClick = () => {
        signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            const usersRef = ref(db, 'user');
            onValue(usersRef, (snapshot) => {
                const userData = snapshot.val();
                if (userData) {
                    const userEmails = Object.values(userData).map(user => user.email);
                    if (userEmails.includes(user.email)) {
                        console.log('Email already exists');
                        setIsDataSaved(true);
                    } else {
                        const newUserRef = push(usersRef);
                        set(newUserRef, {
                            email: user.email,
                            name: user.displayName,
                            photo: user.photoURL,
                        });
                        console.log('User data saved');
                        setIsDataSaved(true);
                    }
                } else {
                    console.log('No user data found');
                    const newUserRef = push(usersRef);
                    set(newUserRef, {
                        email: user.email,
                        name: user.displayName,
                        photo: user.photoURL,
                    });
                    console.log('User data saved');
                    setIsDataSaved(true);
                }
            });
        });
    };

    return (
        <div>
            <GoogleButton type="light" onClick={handleClick}></GoogleButton>
        </div>
    );
}

export default SignIn;
