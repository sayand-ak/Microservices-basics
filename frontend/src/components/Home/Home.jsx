import { useEffect, useRef, useState } from "react";
import "./Home.css";
import Modal from "../Modal/Modal";
import { FaShoppingBag, FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItemAsync, listProducts, orderProduct, addToCart } from "../../slices/userActions";
import Swal from 'sweetalert2';



const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ name, setName ] = useState("");
    const [ price, setPrice ] = useState(0);
    const [ message, setMessage ] = useState("");
    const [ products, setProducts ] = useState([]);

    const dispatch = useDispatch();
    const nameRef = useRef();
    const priceRef = useRef();
    const uid = useSelector(state => state.auth.userInfo.payload.user._id);

    useEffect(() => {
        const listProductData = async() => {
            const response = await dispatch(listProducts());
            setProducts(response.payload.products)
        }
        listProductData()
    })

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    async function handleAddItem() {
        try {
            let isValid = true;
            if (name === "") {
                nameRef.current.style.opacity = "1";
                isValid = false;
            } else {
                nameRef.current.style.opacity = "0";
            }
            if (price === 0) {
                priceRef.current.style.opacity = "1";
                isValid = false;
            } else {
                priceRef.current.style.opacity = "0";
            }
    
            if (isValid) {
                const pid = products.length + 1;
                const response = await dispatch(addItemAsync({ name, price, uid, pid }));
                if(response.payload.product){
                    setMessage("product added successfully");
                    setTimeout(() => {
                        setName("");
                        setPrice(0);
                        setMessage("");
                    }, 6000);
                }
            } else {
                alert("Invalid entry! Please check the values..");
            }
        } catch (error) {
            alert(error);
        }
    }

    async function handleOrderProduct(uid, pid) {
        try {
            const response = await dispatch(orderProduct({ uid, pid }));
            if (response.payload.success === true) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Order successfully placed...",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to place the order. Please try again later."
                });
            }
        } catch (error) {
            console.error("Error placing order:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An error occurred while placing the order. Please try again later."
            });
        }
    }    
    async function handleAddToCart(uid, pid) {
        try {
            const response = await dispatch(addToCart({ uid, pid }));
            if (response.payload.success === true) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Item added to cart successfully ...",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to place the order. Please try again later."
                });
            }
        } catch (error) {
            console.error("Error placing order:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An error occurred while placing the order. Please try again later."
            });
        }
    }    
    
    return(
        <div className="home-container">
            <nav className="px-10 flex justify-between">
                <h1 className="text-gray-400 font-bold">HOME</h1>
                <a className="text-gray-400">PROFILE</a>
            </nav>
            <div className="flex flex-col items-center">
                <button className="add-item-btn text-gray-400" onClick={openModal}>ADD ITEM</button>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <h2 className="text-center">Add Item</h2>
                    <form action="#" className="flex flex-col mx-7 mt-10 gap-10">
                        <div>
                            <label htmlFor="itemName">Product name</label>
                            <br />
                            <input type="text" value={name} onChange={(e) => {setName(e.target.value)}}/>
                            <span className="text-red-700 opacity-0" ref={nameRef}>Product name cannot be blank</span>
                        </div>
                        <div>
                            <label htmlFor="itemPrice">Product pirce</label>
                            <br />
                            <input type="number" value={price} onChange={(e) => {setPrice(e.target.value)}}/>
                            <span className="text-red-700 opacity-0" ref={priceRef}>Product price cannot be blank</span>
                        </div>
                        <div className="mx-auto">
                            <button className="modal-add-btn" onClick={handleAddItem}>ADD ITEM</button>
                        </div>
                        <div className="text-green-700 text-xl text-center">
                            <h1>{message}</h1>
                        </div>
                    </form>
                </Modal>
                <table className="text-gray-400">
                    <thead>
                        <th className="flex justify-between px-5 items-center h-12">
                            <td>
                                PID
                            </td>
                            <td>
                                NAME
                            </td>
                            <td>
                                PRICE(₹)
                            </td>
                            <td>
                                BUY PRODUCT
                            </td>
                            <td>
                                ADD TO CART
                            </td>
                        </th>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr className="flex justify-between px-5 items-center h-14" key={product._id}>
                                    <td>{product.pid}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <button className="buy-item-btn flex gap-1 items-center text-gray-400" onClick={() => {handleOrderProduct(uid, product._id)}}>BUY<FaShoppingBag /></button>
                                    </td>
                                    <td>
                                        <button className="buy-item-btn flex gap-1 items-center text-gray-400" onClick={() => {handleAddToCart(uid, product._id)}}>CART <FaCartArrowDown /></button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="flex justify-around items-center h-14">
                                <td colSpan="4">No products found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;