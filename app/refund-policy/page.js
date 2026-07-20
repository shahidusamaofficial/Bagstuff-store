import PolicyPageShell from "@/components/PolicyPageShell";

export default function RefundPolicyPage() {
  return (
    <PolicyPageShell
      eyebrow="Returns & refunds"
      title="Refund Policy"
      intro= "
Returns:
      - We accept returns within 7 days of delivery. To be eligible, items must be unused, unwashed, and in their original packaging with all tags intact. Please keep your order confirmation or receipt as proof of purchase.

Eligible reasons:
      - Returns are accepted if you received the wrong item, a defective or damaged product, an item that does not match its description, or an incomplete order with missing items.

Non-returnable items:
      - The following cannot be returned: sale or discounted items, intimate wear, innerwear, or hygiene products, items returned after 7 days, items that have been used, washed, or altered, and digital products or gift cards.

Refunds:
      - For orders paid online, refunds are processed to the original payment method within 5–7 business days. For cash on delivery orders, refunds are issued via EasyPaisa, JazzCash, or bank transfer within 3–5 business days. Exchanges are subject to stock availability.

How to return:
      - Contact us via email or WhatsApp within 7 days of delivery, providing your order number and photos of the item. Our team will confirm eligibility within 24 hours. Once approved, ship the item back using [courier name] — return shipping is [borne by customer ]. Your refund or exchange will be processed after we inspect the returned item.

Shipping charges are non-refundable unless the return is due to our error."
    />
  );
}
