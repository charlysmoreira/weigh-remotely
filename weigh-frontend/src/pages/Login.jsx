import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom';

 const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const navigator = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password
            });
            
            if(response.data.sucess){
                login(response.data.user);
                localStorage.setItem('token', response.data.token);

                if(response.data.user.role === "admin"){
                    navigator('/admin-dashboard');
                }else{
                    navigator('/user-dashboard');
                }
            }
        } catch(error){
            console.log(error);
        }
    }

  return (
    <div className="flex flex-col items-center justify-center 
        h-screen bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">

        <h2 className="font-pacific text-3xl text-white">Bem vindo</h2>

        <div className="border shadow p-6 w-80 bg-white">

            <h2 className="text-2xl font-bold mb-4">Login</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor='email' className="block text-gray-700">Usuário</label>
                    <input type='email' className="w-full px-3 py-2 border" placeholder="Entre com e-mail" 
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="mb-4">
                    <label htmlFor='password' className="block text-gray-700">Senha</label>
                    <input type='password' className="w-full px-3 py-2 border" placeholder="*******" 
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <label className="inline-flex items-center">
                        <input type='checkbox' className="form-checkbox" />
                        <span className="ml-2 text-gray-700">Lembrar-me</span>
                    </label>
                    <a href="#" className="text-sm text-gray-600">Esqueceu a senha?</a>
                </div>

                <div className="mb-4">
                    <button type="submit" className="w-full bg-teal-600 text-white py-2">
                        Entrar
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
