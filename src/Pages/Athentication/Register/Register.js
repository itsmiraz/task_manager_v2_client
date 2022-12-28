import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';

const Register = () => {


    const { signUp, setuserProfile } = useContext(AuthContext)
    const [error, setError] = useState('')

    const location = useLocation();
    const frome = location.state?.from?.pathname || '/';

    const navigate = useNavigate()

    const handleSubmit = e => {

        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const photoURL = form.photourl.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log(name, photoURL, email, password);
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Please provide at least two uppercase');
            return;
        }
        if (password.length < 6) {
            setError('Please should be at least 6 characters.');
            return;
        }
        if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('Please add at least one special character');
            return;
        }
        setError('');
        signUp(email, password)
            .then(result => {
                const user = result.user;
                form.reset()
                handleUserProfile(name, photoURL)
                setTimeout(() => {
                    navigate(frome, { replace: true })

                }, 1000);
                toast.success('Register SuccessFully')
                console.log("🚀 ~ file: RegisterPage.js ~ line 21 ~ handleSubmit ~ user", user)
            })
            .catch(error => {
                console.log('error', error);
                setError(error.message)
            })




    }


    const handleUserProfile = (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        }
        console.log(profile);
        setuserProfile(profile)
            .then((result) => { console.log(result.user); })
            .catch(error => console.log(error))
    }

    return (
        <div className='flex justify-center py-10'>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-100 border border-teal-200 shadow-2xl text-gray-800">
                <h1 className="text-2xl font-bold text-teal-600 text-center">Register</h1>
                <form onSubmit={handleSubmit} noValidate="" action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="name" className="block text-gray-700 font-semibold">Full Name</label>
                        <input type="text" name="name" id="name" placeholder="Full name" className="w-full px-4 py-3 rounded-md border-gray-700 bg-teal-100 text-gray-700 focus:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="photourl" className="block text-gray-700 font-semibold">Photo URL</label>
                        <input type="text" name="photourl" id="photourl" placeholder="Photourl" className="w-full px-4 py-3 rounded-md border-gray-700 bg-teal-100 text-gray-700 focus:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                        <input type="text" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md border-gray-700 bg-teal-100 text-gray-700 focus:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-gray-700 bg-teal-100 text-gray-700 focus:border-violet-400" />
                        <div className="flex justify-end text-xs text-gray-400">

                        </div>
                        <div>
                            <p className="text-red-500">{error}</p>
                        </div>
                    </div>
                    <button type='submit' className="block w-full p-3 text-center rounded-sm font-semibold text-gray-50 bg-teal-500">Sign Up</button>
                </form>

                <p className="text-xs text-center sm:px-6 text-gray-400">Already have an account?
                    <Link rel="noopener noreferrer" to="/login" className="underline text-gray-700">Sign IN</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;