import './navbar.scss'
import logo from '../assets/exodus1-01.png'
import { Link } from 'react-router-dom'

export default function Navbar() {
	return (
		<div className='navbar'>
			<ul>
				<Link to="/">Home</Link>
				<li>Catalogues</li>
				<li>Products</li>
			</ul>
			<Link to="/"><img src={logo} className='logo'/></Link>
			<ul>
				<Link to="/auth">Account</Link>
				<li>About</li>
				<li>Contact Us</li>
			</ul>
		</div>
	)
}
