import { Link, useNavigate } from "react-router-dom"
import "./nav.css"
import { useAuth } from "../../auth/useAuth";
import { useCart } from "../cart/CartContext";


function Nav(){
    const auth = useAuth();
    const navigate = useNavigate();
    const cartContext = useCart();    

    const totalProductsInCart = cartContext.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );
   
    return(
        <nav className="menu">
            <input type="checkbox" id="toggle" />
            <div className="logo">
                <Link to="/">
                    <ul>
                        <li><i className="fa-solid fa-bag-shopping"></i></li>
                        <li>E-Commerce</li>
                    </ul>
                </Link>
                
            </div>
                <ul className="list">
                    <li><Link to={"/"}>Inicio</Link></li>
                    <li><Link to={"/categories"}>Categorías</Link></li>
                    <li><Link to={"/products"}>Productos</Link></li>
                    <li><Link to={"/cart-detail"}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span>{totalProductsInCart}</span>
                    </Link></li>
                    {auth?.user ? (
                        <li>Bienvenido {auth?.userInfo?.data?.name}
                            <ul>
                                <li><Link to="/profile">Perfil</Link></li>
                                {auth?.userInfo?.data?.role == "admin" ? (
                                    
                                    <>
                                        <li><Link to="/products/create">Productos</Link></li>
                                        <li><Link to="/categories/create">Categorías</Link></li>
                                    </>
                                    
                                    
                                ) : ("")}
                                
                                <li><button
                                    onClick={() => {
                                        auth.signout(() => navigate("/"))
                                    }}>Salir</button></li>
                            </ul>
                        </li>
                        
                    ):(
                        <li><Link to={"/login"}><i className="fa-solid fa-right-to-bracket"></i></Link></li>
                    )
                        
                    }
                    
                </ul>
                <label htmlFor="toggle" className="icon-bars">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>                   
                </label>            
        </nav>
        
    )
}

export default Nav