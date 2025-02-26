import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
    const {user} = useAuth();
    const name = "Admin";
  return (
    <div className="flex items-center text-white justify-between h-12 bg-teal-600 px-5">
        <p>Bem vindo {name}</p>
        <button className="px-4 py-1 bg-teal-700">Sair</button>
    </div>
  )
}

export default Navbar