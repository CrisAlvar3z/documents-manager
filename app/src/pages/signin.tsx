import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signin = () => {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const loginSubmit = (e: any) => {
    e.preventDefault();
    // handleValidation(e);
    axios.post('/token/', {
      username: email,
      password: password
    }).then(function (response) {
      console.log(response.data.access);
      sessionStorage.setItem('session_token', response.data.access)
      window.location.reload();
    })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <section className='h-screen flex items-center justify-center'>
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form className="space-y-6" onSubmit={loginSubmit}>
            <h5 className="text-xl font-medium text-gray-900">Inicia sesión</h5>
            <section>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900">
                Tu usuario:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ej: admin"
                onChange={(event) => setEmail(event.target.value)}
                required />
            </section>

            <section>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900">
                Tu contraseña:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(event) => setPassword(event.target.value)}
                required />
            </section>
            <button
              type="submit"
              className="w-full text-white bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Iniciar sesión
            </button>
          </form>
        </div>
      </section>

    </>
  )
}

export default Signin;