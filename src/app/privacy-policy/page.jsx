import Link from "next/link";
import { LockKeyhole } from "lucide-react";
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
  title: "Privacy Policy | 100 Peptides Research",
  description:
    "Information about personal data collected through the 100 Peptides Research website and how it may be used.",
};

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "information-we-collect", title: "Information we collect" },
  { id: "how-we-use-data", title: "How information is used" },
  { id: "disclosure", title: "Service providers & sharing" },
  { id: "cookies", title: "Cookies & analytics" },
  { id: "storage", title: "Data retention & security" },
  { id: "your-rights", title: "Your choices & rights" },
  { id: "international", title: "International transfers" },
  { id: "children", title: "Children's privacy" },
  { id: "updates", title: "Policy changes" },
  { id: "privacy-contact", title: "Contact us" },
];

export default function PrivacyPolicyPage() {
  const name = info.legalBusinessName || info.brand;
  const contact = info.privacyContact || info.supportEmail;
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl">
        
        <DraftNotice />
        <PolicyLayout sections={sections}>
          <PolicySection id="introduction" number={1} title="Introduction">
            <p>
              This Privacy Policy describes how <strong>{name}</strong> (“we,”
              “us,” or “our”) handles personal information when you browse our
              website, contact our team, or use order-related features. This
              document should be finalized against the actual operation of the
              website and applicable law before publication.
            </p>
            <p>
              Effective date:{" "}
              <strong>
                {info.effectiveDate || "To be confirmed before publication"}
              </strong>
              .
            </p>
          </PolicySection>
          <PolicySection
            id="information-we-collect"
            number={2}
            title="Information we collect"
          >
            <p>
              Depending on which features you use and which services are
              enabled, information may include:
            </p>
            <ul>
              <li>
                <strong>Contact details:</strong> name, email address, phone
                number, and message contents you choose to submit.
              </li>
              <li>
                <strong>Order information:</strong> products, variants,
                quantities, shipping and billing details, order references, and
                fulfillment communications if checkout and order processing are
                enabled.
              </li>
              <li>
                <strong>Technical information:</strong> device, browser, IP
                address, timestamps, and security logs collected by hosting or
                operational services.
              </li>
              <li>
                <strong>Preferences and interactions:</strong> cart contents,
                consent choices, and site usage information where those features
                are implemented.
              </li>
            </ul>
            <p>
              <strong>Payment information:</strong> if payment processing is
              enabled, payments should be handled by the connected payment
              service. This policy must be updated to identify the actual
              processor and explain what payment data is handled by the store,
              if any.
            </p>
          </PolicySection>
          <PolicySection
            id="how-we-use-data"
            number={3}
            title="How information is used"
          >
            <p>
              Information may be used to answer inquiries, provide requested
              services, process orders and shipment updates where enabled,
              maintain site security, detect misuse, troubleshoot technical
              issues, meet legal obligations, and improve the website subject to
              any applicable consent or other legal requirements.
            </p>
            <p>
              We should not claim uses that are not implemented. Any marketing
              emails must follow applicable consent and unsubscribe requirements
              if a newsletter is activated.
            </p>
          </PolicySection>
          <PolicySection
            id="disclosure"
            number={4}
            title="Service providers & sharing"
          >
            <p>
              Where integrated, personal information may be processed by service
              providers necessary to operate the store, such as hosting,
              payment, email, support, analytics, order fulfillment, and
              shipping providers. Their data handling depends on the contracts
              and configuration in place.
            </p>
            <p>
              <strong>Configured providers:</strong> Payment —{" "}
              {info.paymentProcessors || "Not yet specified"}; analytics —{" "}
              {info.analyticsProviders || "Not yet specified"}; contact forms —{" "}
              {info.contactFormProvider || "Not yet specified"}; tracking —{" "}
              {info.orderTrackingProvider || "Not yet specified"}.
            </p>
            <p>
              Information may also be disclosed when required by applicable law,
              to protect legitimate rights, or in connection with a business
              transaction where legally permitted. A final policy must
              accurately describe any sale, sharing, targeted advertising, or
              other regulated disclosures that apply.
            </p>
          </PolicySection>
          <PolicySection id="cookies" number={5} title="Cookies & analytics">
            <p>
              The site may use storage technologies required to support
              functions such as a shopping cart, site preferences, and security.
              Optional analytics or advertising technologies should not be
              represented as active unless installed.
            </p>
            <p>
              Browser settings can help control some cookies and site storage.
              Any consent banner and opt-out controls should reflect the actual
              technology deployed and the law applicable to your customers.
            </p>
          </PolicySection>
          <PolicySection
            id="storage"
            number={6}
            title="Data retention & security"
          >
            <p>
              Information should be kept only for the duration reasonably
              necessary for the relevant operational, contractual, or legal
              purpose. The final retention periods and deletion practices must
              be supplied by the business and its processors.
            </p>
            <p>
              We aim to use reasonable organizational and technical measures
              suitable to the information processed. No internet service can
              guarantee absolute security. Please do not send card numbers,
              passwords, or other sensitive credentials through the contact
              form.
            </p>
          </PolicySection>
          <PolicySection
            id="your-rights"
            number={7}
            title="Your choices & rights"
          >
            <p>
              Depending on where you live, you may have rights concerning
              access, correction, deletion, portability, objection, or
              restrictions on certain processing. Rights vary by jurisdiction
              and may be subject to exceptions.
            </p>
            <p>
              To request assistance regarding your information, use{" "}
              <Link href="/contact">our contact page</Link>
              {contact ? (
                <>
                  {" "}
                  or email <a href={`mailto:${contact}`}>{contact}</a>
                </>
              ) : null}
              . We may need to verify your request before responding and will
              follow applicable legal requirements.
            </p>
          </PolicySection>
          <PolicySection
            id="international"
            number={8}
            title="International transfers"
          >
            <p>
              Website hosting and service providers may process information in
              jurisdictions different from your location. The countries involved
              and any legally required transfer safeguards must be verified
              against the providers actually used by the business.
            </p>
          </PolicySection>
          <PolicySection id="children" number={9} title="Children's privacy">
            <p>
              This website is not designed or directed toward children. If you
              believe a child has submitted personal information, please contact
              us so the request can be reviewed under applicable law.
            </p>
          </PolicySection>
          <PolicySection id="updates" number={10} title="Policy changes">
            <p>
              This policy may be updated to reflect service changes or legal
              requirements. The effective date at the top should be changed when
              material revisions are published, and additional notice provided
              where required.
            </p>
          </PolicySection>
          <PolicySection id="privacy-contact" number={11} title="Contact us">
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
              If you have concerns about information handled through the store,
              please <Link href="/contact">get in touch</Link>.
            </p>
          </PolicySection>
        </PolicyLayout>
        <PolicyFooter />
        <SupportCTA
          heading="Privacy question?"
          description="Our contact page is the place to ask about data-handling practices or request assistance with information associated with your account or orders."
        />
      </div>
    </PageShell>
  );
}
