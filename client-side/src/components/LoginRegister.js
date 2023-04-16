import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import { AppContext } from '../App';

const LoginRegister = (props) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [msg, setMsg] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const navigate = useNavigate();
    const { setAccessToken } = useContext(AppContext);

    useEffect(() => {
        setMsg('')
    }, [props.title])


    const handlePasswordChange = (pass) => {
        setPassword(pass);
        setPasswordsMatch(pass === password2);
    };

    const handlePassword2Change = (pass2) => {
        setPassword2(pass2);
        setPasswordsMatch(pass2 === password);
    };

    const handleAction = async (id) => {
        if (id === 'Register') {
            if (password === password2) {
                try {
                    let res = await axios.post('/register', {
                        firstName, lastName, username, email, password
                    })
                    navigate('/login')
                } catch (err) {
                    console.log(err.response.data);
                    setMsg(err.response.data.msg)
                }
            } else {
                setMsg('Passwords do not match')
            }
        } else if (id === 'Login') {
            try {
                let res = await axios.post('/login', {
                    username, password
                })
                console.log(res.data);
                setAccessToken(res.data)
                setMsg(res.data.msg)
                navigate('/')
            } catch (err) {
                console.log(err.response.data);
                setMsg(err.response.data.msg)
            }
        } else if (id === 'reg') {
            navigate('/register')
        } else if (id === 'goLog') {
            navigate('/login')
        }


    }
    return (
        // backdrop-blur-sm bg-opacity-10
        // bg-gradient-to-r from-teal-500 to-sky-500
        <div className='flex h-screen login-reg'>
            {/* <h1>{props.title}</h1> */}
            {

                props.title === 'Login' ?
                    <div className=" w-full max-w-xs m-auto">
                        <NavBar />
                        <form className=" bg-gradient-to-r from-orange-200 to-amber-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <label className="block text-teal-500 text-xl font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="mb-6">
                                <label className="block text-teal-500 text-xl font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={(e) => setPassword(e.target.value)} />
                                {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                            </div>
                            <div className="flex items-center justify-between">
                                {/* justify-between if adding the forgot password */}
                                <button className="bg-teal-500 hover:bg-teal-700 text-xl hover:scale-110 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => handleAction(props.title)}>
                                    Sign In
                                </button>
                                <button type="button" className="inline-block align-baseline text-xl text-teal-500 hover:text-teal-800" onClick={() => handleAction('reg')}>
                                    Sign Up
                                </button>

                            </div>

                        </form>
                        <p className="text-center text-gray-500 text-xs">
                            &copy;2020 Acme Corp. All rights reserved.
                        </p>
                    </div>

                    :
                    <div className='flex flex-col w-full justify-center m-2'>
                        <form className="w-full max-w-lg m-auto bg-gradient-to-r from-orange-200 to-amber-200 shadow-md rounded px-8 pt-6 pb-8">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="text-teal-500 block uppercase tracking-wide text-base font-bold mb-2" htmlFor="grid-first-name">
                                        First Name
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-teal-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-teal-500 text-base font-bold mb-2" htmlFor="grid-last-name">
                                        Last Name
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-teal-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-teal-500 text-base font-bold mb-2" htmlFor="grid-username">
                                        Username
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-teal-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-teal-500 text-base font-bold mb-2" htmlFor="grid-email">
                                        Email
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-teal-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email
                                " type="text" placeholder="example@email.com" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-teal-500 text-base font-bold mb-2" htmlFor="grid-password">
                                        Password
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" onChange={(e) => { setPassword(e.target.value); handlePasswordChange(e.target.value) }} />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-teal-500 text-base font-bold mb-2" htmlFor="grid-password2">
                                        Confirm Password
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password2" type="password" placeholder="******************" onChange={(e) => { setPassword2(e.target.value); handlePassword2Change(e.target.value) }} />
                                </div>
                                {!passwordsMatch && <p className='italic text-red-600 mx-auto'>Passwords do not match.</p>}
                            </div>
                            <div className="flex items-center justify-evenly">
                                {/* justify-between if adding the forgot password */}
                                <button className="bg-teal-500 hover:bg-teal-700 hover:scale-110 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => handleAction(props.title)}>
                                    Sign Up
                                </button>
                                <button type="button" className="inline-block align-baseline font-bold text-base text-teal-500 hover:text-teal-800" onClick={() => handleAction('goLog')}>
                                    Log In
                                </button>

                            </div>

                        </form>
                        <p className="text-center text-gray-500 text-sm">
                            &copy;2020 Acme Corp. All rights reserved.
                        </p>
                    </div>

            }

        </div>
    )
}

export default LoginRegister
    // < p className = "text-red-500 text-xs italic" > Please fill out this field.</p >
