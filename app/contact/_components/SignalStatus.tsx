import { contactData } from "../_data";

export function SignalStatus() {
  const { statusText, imageSrc } = contactData.signal;

  return (
    <div className="signal">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt="" />
      <span>
        <i /> {statusText}
      </span>
    </div>
  );
}
