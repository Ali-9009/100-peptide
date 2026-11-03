import Link from "next/link";

import { storePolicies as info } from "@/data/storePolicies";

import {
  PageShell,
  DraftNotice,
  PolicyLayout,
  PolicySection,
  PolicyFooter,
  SupportCTA,
} from "@/components/policy/PolicyUI";

export const metadata = {
  title: "Shipping Information | 100 Peptides Research",
  description:
    "Information about shipping methods, processing times, delivery estimates, tracking, and order support at 100 Peptides Research.",
};

const sections = [
  { id: "introduction", title: "Shipping overview" },
  { id: "processing", title: "Order processing" },
  { id: "shipping-origin", title: "Shipping origin" },
  { id: "shipping-rates", title: "Shipping rates & charges" },
  { id: "delivery-times", title: "Delivery estimates" },
  { id: "order-tracking", title: "Order tracking" },
  { id: "address-changes", title: "Address changes" },
  { id: "delayed-orders", title: "Delayed or missing shipments" },
  { id: "damaged-orders", title: "Damaged shipments" },
  { id: "shipping-restrictions", title: "Shipping restrictions" },
  { id: "shipping-contact", title: "Contact & support" },
];

export default function ShippingInformationPage() {
  const name = info.legalBusinessName || info.brand;

  const contact = info.supportEmail;

  const shippingOrigin = info.shippingOrigin || "To be confirmed";

  const processingTime = info.processingTime || "To be confirmed";

  const deliveryEstimate = info.deliveryEstimate || "Available at checkout";

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl">
        <DraftNotice />

        <PolicyLayout sections={sections}>
          {/* 01 — INTRODUCTION */}
          <PolicySection id="introduction" number={1} title="Shipping overview">
            <p>
              This Shipping Information page explains the general shipping and
              fulfillment process for orders placed through{" "}
              <strong>{name}</strong>.
            </p>

            <p>
              Our goal is to provide clear information about processing times,
              shipping methods, delivery estimates, and tracking availability so
              customers understand what to expect after placing an order.
            </p>

            <p>
              Shipping availability, delivery options, and applicable charges
              may depend on your location, order contents, carrier availability,
              and any relevant restrictions.
            </p>
          </PolicySection>

          {/* 02 — PROCESSING */}
          <PolicySection id="processing" number={2} title="Order processing">
            <p>
              Once an order is submitted, it may be reviewed for payment
              confirmation, product availability, and fulfillment requirements
              before dispatch.
            </p>

            <p>
              <strong>Processing time:</strong> {processingTime}
            </p>

            <p>
              Processing time refers to the period required to prepare an order
              before handing it to a shipping carrier. It does not include
              carrier transit time.
            </p>

            <p>
              Processing may take longer during weekends, holidays, periods of
              high order volume, inventory shortages, or when additional order
              verification is necessary.
            </p>
          </PolicySection>

          {/* 03 — SHIPPING ORIGIN */}
          <PolicySection
            id="shipping-origin"
            number={3}
            title="Shipping origin"
          >
            <p>
              Orders are dispatched from the fulfillment location associated
              with the applicable order.
            </p>

            <p>
              <strong>Shipping origin:</strong> {shippingOrigin}
            </p>

            <p>
              The dispatch location may affect available shipping services,
              transit times, and delivery estimates. The carrier's initial
              tracking scan may provide additional information once the shipment
              is accepted.
            </p>
          </PolicySection>

          {/* 04 — SHIPPING RATES */}
          <PolicySection
            id="shipping-rates"
            number={4}
            title="Shipping rates & charges"
          >
            <p>
              Shipping charges depend on the delivery destination, available
              shipping methods, and the applicable checkout settings.
            </p>

            <p>
              Any available shipping discounts or free-shipping promotions
              should be displayed during checkout before an order is submitted.
            </p>

            <p>
              Customers should review the shipping amount and order total shown
              at checkout before completing their purchase.
            </p>

            <p>
              Additional charges may apply where permitted and disclosed,
              depending on the delivery service, destination, or special
              handling requirements.
            </p>
          </PolicySection>

          {/* 05 — DELIVERY */}
          <PolicySection
            id="delivery-times"
            number={5}
            title="Delivery estimates"
          >
            <p>
              Estimated delivery times depend on the destination, selected
              carrier, shipping service, and fulfillment circumstances.
            </p>

            <p>
              <strong>Estimated delivery:</strong> {deliveryEstimate}
            </p>

            <p>
              Delivery estimates are informational unless a particular delivery
              commitment is expressly confirmed for the selected shipping
              service.
            </p>

            <p>
              Weather conditions, carrier disruptions, holidays, address issues,
              and other circumstances may affect estimated arrival dates.
            </p>
          </PolicySection>

          {/* 06 — TRACKING */}
          <PolicySection id="order-tracking" number={6} title="Order tracking">
            <p>
              Tracking information may become available after an order has been
              prepared and accepted by the shipping carrier.
            </p>

            <p>
              When tracking is supported, shipment updates are based on
              information supplied by the carrier or fulfillment provider.
            </p>

            <p>
              You can visit our{" "}
              <Link href="/track-order">Track Your Order</Link> page to request
              an order update using the applicable order information.
            </p>

            <p>
              Please note that tracking information may take time to appear
              after a shipping label is created or an order is dispatched.
            </p>
          </PolicySection>

          {/* 07 — ADDRESS CHANGES */}
          <PolicySection
            id="address-changes"
            number={7}
            title="Address changes"
          >
            <p>
              Customers are responsible for providing accurate and complete
              shipping information during checkout.
            </p>

            <p>
              If you notice an incorrect shipping address after placing an
              order, please contact our support team as soon as possible.
            </p>

            <p>
              Address corrections may not be possible after an order has entered
              fulfillment or has been transferred to the carrier.
            </p>

            <p>
              If a shipment cannot be delivered because of incomplete or
              incorrect address information, the available next steps will
              depend on the carrier's policies and applicable law.
            </p>
          </PolicySection>

          {/* 08 — DELAYED ORDERS */}
          <PolicySection
            id="delayed-orders"
            number={8}
            title="Delayed or missing shipments"
          >
            <p>
              Occasionally, shipments may experience delays after dispatch due
              to carrier operations, severe weather, regional disruptions, or
              other factors.
            </p>

            <p>
              If your order appears delayed, we recommend checking the most
              recent tracking information provided by the carrier.
            </p>

            <p>
              If tracking has not updated or a shipment appears missing, contact
              our support team with your order reference and any available
              tracking details.
            </p>

            <p>
              Shipment investigations and resolutions may depend on carrier
              findings, the store's applicable policies, and relevant consumer
              protection laws.
            </p>
          </PolicySection>

          {/* 09 — DAMAGED ORDERS */}
          <PolicySection
            id="damaged-orders"
            number={9}
            title="Damaged shipments"
          >
            <p>
              If your order arrives with visible damage, please document the
              condition of the packaging and affected products.
            </p>

            <p>
              Contact our support team with the order reference, a description
              of the issue, and photographs where available.
            </p>

            <p>
              Our team can review the information and explain the applicable
              next steps under the relevant store policies and legal
              requirements.
            </p>

            <p>
              Please do not use products with compromised packaging or uncertain
              integrity for laboratory research.
            </p>
          </PolicySection>

          {/* 10 — RESTRICTIONS */}
          <PolicySection
            id="shipping-restrictions"
            number={10}
            title="Shipping restrictions"
          >
            <p>
              Certain research products may be subject to destination-based
              restrictions, carrier requirements, or other applicable rules.
            </p>

            <p>
              Shipping availability may vary depending on the product and the
              destination provided during checkout.
            </p>

            <p>
              Customers are responsible for ensuring that products can be
              lawfully purchased, received, possessed, and used in their
              jurisdiction.
            </p>

            <p>
              All research compounds are intended only for permitted laboratory
              research applications and are not offered for human or veterinary
              use.
            </p>
          </PolicySection>

          {/* 11 — CONTACT */}
          <PolicySection
            id="shipping-contact"
            number={11}
            title="Contact & support"
          >
            <p>
              If you have questions about delivery options, shipping charges,
              processing times, tracking, or shipment-related concerns, please
              contact our support team.
            </p>

            <p>
              <strong>Business:</strong> {name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {contact ? (
                <a href={`mailto:${contact}`}>{contact}</a>
              ) : (
                "To be provided"
              )}
            </p>

            <p>
              <strong>Contact address:</strong>{" "}
              {info.businessAddress || "To be provided"}
            </p>

            <p>
              For assistance, visit our <Link href="/contact">Contact Us</Link>{" "}
              page.
            </p>
          </PolicySection>
        </PolicyLayout>

        <PolicyFooter />

        <SupportCTA
          heading="Questions about your shipment?"
          description="Our support page can help with delivery questions, shipment information, and order-related concerns."
        />
      </div>
    </PageShell>
  );
}
