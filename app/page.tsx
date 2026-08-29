import { HeroCopy } from "./_components/home/HeroCopy";
import { BrandEmblem } from "./_components/home/BrandEmblem";
import { CapabilityShelves } from "./_components/home/CapabilityShelves";

export default function Home() {
  return (
    <>
      <HeroCopy />
      <section
        className="hero-object"
        aria-label="Sam Johnson snake and computer emblem"
      >
        <BrandEmblem />
        <CapabilityShelves />
      </section>
    </>
  );
}
