import { ContactLead } from "./_components/ContactLead";
import { SignalStatus } from "./_components/SignalStatus";
import { ContactCopy } from "./_components/ContactCopy";

export default function ContactPage() {
  return (
    <section className="contact-grid">
      <ContactLead />
      <SignalStatus />
      <ContactCopy />
    </section>
  );
}
