import { useRouter } from 'next/router';
import cartValue from '../data/cart.json';

const FreeSample = () => {
    const router = useRouter();
    const redeemFree = () => {
        var data = {
            productId: '1000',
            product: 'FREE Sample',
            price: 'FREE',
            quantity: 1
        }
        cartValue.splice(0, cartValue.length);
        cartValue.push(data);
        router.push('/cart');
    }
    return (
        <div className='free' onClick={() => redeemFree()}>
            <div style={{fontSize: '1.5vmax'}}><b>New to FREAKA?</b></div>
            <div style={{fontSize: '1vmax'}}>Try out our free sample</div>
            <div style={{textAlign: 'right', fontSize: '0.5vmax'}}>* Delivery charges applicable</div>
        </div>
    )
}

export default FreeSample;