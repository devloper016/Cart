import { useEffect } from 'react';
import CartContainer from './components/CartContainer';
import Navbar from './components/Navbar'
import { useDispatch,useSelector } from 'react-redux';
import { calTotal,getCartItems } from './features/cart/cartSlice';
import Modal from './components/Modal';
function App() {
  const {cartItems,isLoading} = useSelector((store)=>store.cart);
  const {isOpen} = useSelector((store)=>store.modal);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(calTotal());
  },[cartItems])

  useEffect(()=>{
    dispatch(getCartItems());
  },[cartItems])

  if(isLoading){
    return(
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }
  return(
    <main>
      {isOpen && <Modal></Modal>}
      <Navbar />
      <CartContainer></CartContainer>
    </main>
  );
}
export default App;
