/**
 * @vitest-environment jsdom
 */

import { it, expect, describe, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import axios from 'axios';
import { Product } from './Product';

vi.mock('axios');

afterEach(() => {
    cleanup();
});

describe('Product', () => {
      let product;

        let loadCart;

        beforeEach(() => {
           product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        }; 

        loadCart = vi.fn();
        });


    it('displays the product details correctly', () => {
      

        render(<Product product={product} loadCart={loadCart} />);

        expect(
            screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument();

        expect(
            screen.getByText('$10.90')
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('product-image')
        ).toHaveAttribute(
            'src',
            'images/products/athletic-cotton-socks-6-pairs.jpg'
        );

        expect(
            screen.getByTestId('product-rating-stars-image')
        ).toHaveAttribute(
            'src',
            `images/ratings/rating-${product.rating.stars * 10}.png`
        );

        expect(
            screen.getByText('87')
        ).toBeInTheDocument();
    });

    it('add a product to the cart', async () => {
        render(<Product product={product} loadCart={loadCart} />);

        const user = userEvent.setup();
        const addToCartButton = screen.getByTestId('add-to-cart-button');

        await user.click(addToCartButton);

        expect(axios.post).toHaveBeenNthCalledWith(
            1,
            '/api/cart-items',
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1
            }
        );

        expect(loadCart).toHaveBeenCalled();
    });
});