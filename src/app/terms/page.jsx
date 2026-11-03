import Link from "next/link";
import { FileText } from "lucide-react";
import { storePolicies as info } from "@/data/storePolicies";
import {
  PageShell,
  PageHero,
  DraftNotice,
  PolicyLayout,
  PolicySection,
  PolicyFooter,
  SupportCTA,
} from "@/components/policy/PolicyUI";
export const metadata = {
  title: "Terms & Conditions | 100 Peptides Research",
  description:
    "Website use, ordering conditions, research-use notices, and other terms for 100 Peptides Research.",
};
const sections = [
  { id: "acceptance", title: "Agreement & eligibility" },
  { id: "research-use", title: "Research-use restrictions" },
  { id: "product-info", title: "Product information" },
  { id: "prices", title: "Pricing & promotions" },
  { id: "ordering", title: "Orders & availability" },
  { id: "shipping", title: "Shipping & delivery" },
  { id: "returns", title: "Returns, refunds & cancellations" },
  { id: "payments", title: "Payments & fraud prevention" },
  { id: "website-use", title: "Acceptable website use" },
  { id: "intellectual-property", title: "Content & intellectual property" },
  { id: "disclaimer", title: "Disclaimers & liability" },
  { id: "governing-law", title: "Applicable law & disputes" },
  { id: "changes", title: "Changes to these terms" },
  { id: "terms-contact", title: "Contact information" },
];
export default function TermsPage() {
  const seller = info.legalBusinessName || info.brand;
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl">
       
        <DraftNotice />
        <PolicyLayout sections={sections}>
          <PolicySection
            id="acceptance"
            number={1}
            title="Agreement & eligibility"
          >
            <p>
              These terms govern use of the website operated by{" "}
              <strong>{seller}</strong> (“we,” “us,” or “our”). By using the
              site, you agree to the terms that apply to the services offered.
              The seller’s legal identity and governing jurisdiction must be
              confirmed before this document is published.
            </p>
            <p>
              Customers must be legally permitted to access and acquire any
              applicable research products in their location. Additional
              qualification requirements may apply and should be verified by the
              business.
            </p>
          </PolicySection>
          <PolicySection
            id="research-use"
            number={2}
            title="Research-use restrictions"
          >
            <p>
              <strong>
                Research products are intended for laboratory research and
                educational purposes only, where lawful.
              </strong>{" "}
              They are not intended for human consumption, veterinary use, food
              use, or clinical administration. Product information is not
              medical advice and should not be interpreted as a claim to
              diagnose, prevent, treat, or cure disease.
            </p>
            <p>
              Purchasers are responsible for their own lawful handling, storage,
              institutional requirements, and compliance with applicable rules.
              The business must confirm whether any further product-specific
              restrictions or qualifications are required.
            </p>
          </PolicySection>
          <PolicySection
            id="product-info"
            number={3}
            title="Product information"
          >
            <p>
              Descriptions, imagery, packaging, technical specifications, and
              other product details are provided for reference. Batch-specific
              analytical results should be reviewed on the certificate
              associated with the relevant lot, when available.
            </p>
            <p>
              Product images may illustrate presentation and are not a
              substitute for lot-specific records. Any technical or purity
              statements must be supported by applicable documentation.
            </p>
          </PolicySection>
          <PolicySection id="prices" number={4} title="Pricing & promotions">
            <p>
              Product and variant prices are presented on the site and may
              change. Multipack offers and curated research bundles are
              different: multipacks contain multiple units of a selected product
              and strength, while curated bundles contain the products listed in
              that offer.
            </p>
            <p>
              Promotional prices, discounts, stacking rules, and expiration
              dates should match the current checkout configuration. The total
              amount confirmed at checkout governs the order, subject to any
              applicable law and approved correction/cancellation terms.
            </p>
          </PolicySection>
          <PolicySection id="ordering" number={5} title="Orders & availability">
            <p>
              Placing items in a cart does not reserve inventory or guarantee an
              accepted order. If checkout is enabled, order acceptance,
              inventory validation, and any post-purchase notices must be
              managed by the actual order-processing system.
            </p>
            <p>
              We may need to contact a customer about an address, availability,
              compliance, or suspected unauthorized activity. The circumstances
              in which an order can be refused or canceled must be defined in
              the final commercial policy.
            </p>
          </PolicySection>
          <PolicySection id="shipping" number={6} title="Shipping & delivery">
            <p>
              Shipping costs, eligible destinations, and available delivery
              methods should be displayed at checkout. Processing and transit
              estimates depend on order status, destination, and the carrier.
              For more information, see the{" "}
              <Link href="/shipping-information">
                Shipping Information page
              </Link>
              .
            </p>
            <p>
              Ownership, risk of loss, customs responsibilities, and delivery
              disputes require jurisdiction-specific review and are
              intentionally not assigned by this draft.
            </p>
          </PolicySection>
          <PolicySection
            id="returns"
            number={7}
            title="Returns, refunds & cancellations"
          >
            <p>
              Eligibility for returns, replacements, refunds, and cancellations
              is determined by the store’s formally approved policy and
              applicable consumer law. This draft does not promise that products
              can or cannot be returned.
            </p>
            <p>
              {info.returnPolicyUrl ? (
                <>
                  Review the{" "}
                  <Link href={info.returnPolicyUrl}>
                    published return policy
                  </Link>{" "}
                  for details.
                </>
              ) : (
                <>
                  The approved return/refund policy has not been supplied for
                  this website. <Link href="/contact">Contact support</Link>{" "}
                  before purchasing if these terms are important to your
                  decision.
                </>
              )}
            </p>
          </PolicySection>
          <PolicySection
            id="payments"
            number={8}
            title="Payments & fraud prevention"
          >
            <p>
              Payment methods shown at a connected secure checkout are the
              available methods. Never provide full payment card numbers or
              banking credentials through the contact form or standard email.
            </p>
            <p>
              The actual payment provider, timing of authorization or capture,
              taxes, chargebacks, and fraud review rules must be documented when
              payment processing is activated.
            </p>
          </PolicySection>
          <PolicySection
            id="website-use"
            number={9}
            title="Acceptable website use"
          >
            <p>
              You agree not to interfere with website security, attempt
              unauthorized access, scrape in violation of applicable law or
              access controls, impersonate others, submit fraudulent orders, or
              use the site for unlawful activity.
            </p>
          </PolicySection>
          <PolicySection
            id="intellectual-property"
            number={10}
            title="Content & intellectual property"
          >
            <p>
              Unless otherwise stated, the website’s original text, design, and
              branding may be protected by applicable intellectual-property law.
              Third-party marks, services, map content, and assets remain
              subject to the rights and licenses of their respective owners.
            </p>
          </PolicySection>
          <PolicySection
            id="disclaimer"
            number={11}
            title="Disclaimers & liability"
          >
            <p>
              The website may contain service interruptions, outdated
              information, or links to third-party websites. Any enforceable
              warranties, limitations, liability caps, and mandatory consumer
              rights depend on the governing law and must be drafted or reviewed
              for the actual business before publication.
            </p>
            <p>
              Nothing in these draft terms is intended to exclude rights or
              liabilities that cannot legally be excluded.
            </p>
          </PolicySection>
          <PolicySection
            id="governing-law"
            number={12}
            title="Applicable law & disputes"
          >
            <p>
              <strong>Governing jurisdiction:</strong>{" "}
              {info.jurisdiction || "Not yet confirmed"}.
            </p>
            <p>
              Dispute procedures, notice requirements, mandatory arbitration,
              venue selection, and any applicable consumer protections require
              review by qualified counsel in the seller’s actual jurisdiction.
              No arbitration or forum selection is imposed by this draft.
            </p>
          </PolicySection>
          <PolicySection
            id="changes"
            number={13}
            title="Changes to these terms"
          >
            <p>
              These terms may be revised to reflect changes in the website,
              services, or applicable legal requirements. The effective date and
              any required notifications should be updated when revisions are
              adopted.
            </p>
            <p>
              <strong>Effective date:</strong>{" "}
              {info.effectiveDate || "Pending approval"}.
            </p>
          </PolicySection>
          <PolicySection
            id="terms-contact"
            number={14}
            title="Contact information"
          >
            <p>
              <strong>Business:</strong> {seller}
            </p>
            <p>
              <strong>Contact email:</strong>{" "}
              {info.supportEmail ? (
                <a href={`mailto:${info.supportEmail}`}>{info.supportEmail}</a>
              ) : (
                "To be provided"
              )}
            </p>
            <p>
              <strong>Business address:</strong>{" "}
              {info.businessAddress || "To be provided"}
            </p>
            <p>
              For order and website questions, visit{" "}
              <Link href="/contact">Contact Us</Link>.
            </p>
          </PolicySection>
        </PolicyLayout>
        <PolicyFooter />
        <SupportCTA
          heading="Need clarification before ordering?"
          description="If you have questions about product restrictions, shipping, or store policies, contact our team before completing checkout."
        />
      </div>
    </PageShell>
  );
}
