import axios from 'axios';
import dayjs from "dayjs";
import { useState } from 'react';
import { formatMoney } from '../../utils/money'
import { DeliveryOptions } from './DeliveryOptions';

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
    const [editingProductId, setEditingProductId] = useState(null);
    const [newQuantity, setNewQuantity] = useState('');

    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                    return deliveryOption.id === cartItem.deliveryOptionId;
                });

                const saveQuantity = async() => {
                    const quantity = parseInt(newQuantity);
                    if (!isNaN(quantity) && quantity > 0) {
                        await axios.put(`/api/cart-items/${cartItem.productId}`, {
                            quantity
                        });
                        await loadCart();
                        setEditingProductId(null);
                        setNewQuantity('');
                    }
                }

                const deleteCartItem = async() => {
                    await axios.delete(`/api/cart-items/${cartItem.productId}`);
                    await loadCart();
                };

                return (
                    <div key={cartItem.productId} className="cart-item-container">
                        <div className="delivery-date">
                            Delivery date: {selectedDeliveryOption && dayjs().add(selectedDeliveryOption.deliveryDays, 'day').format('dddd, MMMM D')}
                        </div>

                        <div className="cart-item-details-grid">
                            <img className="product-image"
                                src={cartItem.product.image} />

                            <div className="cart-item-details">
                                <div className="product-name">
                                    {cartItem.product.name}
                                </div>
                                <div className="product-price">
                                    {formatMoney(cartItem.product.priceCents)}
                                </div>
                                <div className="product-quantity">
                                    
                                    {/* Modo normal */}
                                    {editingProductId !== cartItem.productId && (
                                        <span>
                                            Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                            <span 
                                                className="update-quantity-link link-primary" 
                                                onClick={() => {
                                                    setEditingProductId(cartItem.productId);
                                                    setNewQuantity(cartItem.quantity);
                                                }}
                                            >
                                                Update
                                            </span>
                                            <span 
                                                className="delete-quantity-link link-primary" 
                                                onClick={deleteCartItem}
                                            >
                                                Delete
                                            </span>
                                        </span>
                                    )}
                                    
                                    {/* Modo de edição */}
                                    {editingProductId === cartItem.productId && (
                                        <span>
                                            Quantity: 
                                            <input 
                                                type="number" 
                                                min="1" 
                                                value={newQuantity} 
                                                onChange={(e) => setNewQuantity(e.target.value)}
                                                style={{ width: '60px', margin: '0 10px' }}
                                            />
                                            <button onClick={saveQuantity}>Save</button>
                                            <button onClick={() => setEditingProductId(null)}>Cancel</button>
                                        </span>
                                    )}
                                </div>
                            </div>
                         <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}