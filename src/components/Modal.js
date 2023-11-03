import { useDispatch } from "react-redux";

import { clearCart } from "../store/features/cart/cartSLice";
import { closeModal } from "../store/features/modal/modalSlice";

const Modal = () => {
    const dispatch = useDispatch();

    return (
        <aside className="modal-container">
            <div className="modal">
                <h4>Remove all items from shopping cart?</h4>
                <div className="btn-container">
                    <button className="btn confirm-btn" onClick={() => {
                        dispatch(clearCart());
                        dispatch(closeModal());
                    }}>Confirm</button>
                    <button className="btn clear-btn" onClick={() => dispatch(closeModal())}>Cancel</button>
                </div>
            </div>
        </aside>
    )
}

export default Modal;
