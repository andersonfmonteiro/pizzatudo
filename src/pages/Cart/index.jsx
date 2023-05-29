import { Tabs } from "../../components/Tabs";
import Button from "../../components/elements/Button";
import { useSelector } from "react-redux";
import { cartProducts } from "../../stores/cart/cartSlice";
import useTabSwitch from "../../hooks/useTabSwitch";
import { ReactComponent as ArrowRightSvg } from "../../assets/icons/arrow-right-long-svgrepo-com.svg";
import { AddressForm } from "../../components/AddressForm";
import { ProductsSummary } from "../../components/ProductsSummary";
import { StripeWrapper } from "../../components/PaymentForm";

const Cart = () => {
    const cart = useSelector(cartProducts);
    const tabs= ['Pedido', 'Entrega', 'Pagamento'];
    const [currentTab, handleTabSwitch] = useTabSwitch(tabs, 'Pedido');

    if (!cart || cart.length === 0) {
        return (
            <div className="bg-white h-full text-black flex justify-center p-4">
                <h1>Sua cesta está vazia</h1>
            </div>
        )
    }

    return (
        <div className="bg-white h-screen text-black mx-auto mt-2 border border-gray-200 p-4 md:w-2/3 rounded-lg shadow-md sm:p-6 lg:p-8">
            <Tabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
            <div className={`tabs ${currentTab !== 'Pedido' ? 'hidden' : ''}`}>
                <ProductsSummary />
                <div className="flex justify-end p-2">
                    <Button variant="dark" className="flex items-center" onClick={()=>handleTabSwitch('Delivery')}><span className="mr-1">Proximo</span><ArrowRightSvg /></Button>
                </div>
            </div>
            <div className={`tabs ${currentTab !== 'Entrega' ? 'hidden' : ''}`}>
                <AddressForm onTabSwitch={handleTabSwitch}/>
            </div>
            <div className={`tabs ${currentTab !== 'Pagamento' ? 'hidden' : ''}`}>
                <StripeWrapper />
            </div>
        </div>
    )
}

export default Cart;