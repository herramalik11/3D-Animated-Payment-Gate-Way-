/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PaymentCheckout } from './components/PaymentCheckout';

export default function App() {
  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center">
      <PaymentCheckout />
    </main>
  );
}
