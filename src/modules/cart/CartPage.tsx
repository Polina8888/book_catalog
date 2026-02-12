import { useAppDispatch } from "../../store"
import { cartSlice } from "./cartSlice"
import { useAppSelector } from "../../store";
// import { store } from "../../store";
import { Container, Card } from "react-bootstrap";

function CartPage() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const { items, totalCount, totalPrice } = cart;
  // console.log(cart.items)
  // console.log("RAW STORE STATE", store.getState());

  return (
    <div className='vh-100 d-flex flex-column justify-content-center align-items-center'>
      <button className="btn-primary btn" onClick={() => dispatch(cartSlice.actions.clearCart())}>Clear cart</button>
      <Container>
        {items.map((item) => (
          <div key={item.id}>
            <button className="btn btn-primary" onClick={() => dispatch(cartSlice.actions.addItem(item))}>+</button>
            <button className="btn btn-primary" onClick={() => dispatch(cartSlice.actions.removeItem(item.id))}>-</button>

            <Card>
              <Card.Body>
                <Card.Title>
                  {item.title}
                </Card.Title>
                <p>Price: {item.price}</p>
                <p>Amount: {item.amount}</p>
              </Card.Body>
            </Card>
          </div>
        ))}
        <p>Total Count: {totalCount}</p>
        <p>Total Price: {totalPrice}</p>
      </Container>
    </div>
  )
}

export default CartPage
