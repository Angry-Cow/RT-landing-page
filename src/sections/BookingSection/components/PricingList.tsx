import { PricingItem } from "@/sections/BookingSection/components/PricingItem";

export const PricingList = () => {
  return (
    <div className="box-border caret-transparent outline-[3px] mb-12">
      <PricingItem
        title="Basic Handgun Introduction"
        duration="4 Hours "
        price="$350"
        priceLabel="Limit 2 Pers"
        groupPrice="$89"
        groupPriceLabel="Group Rate"
        primaryButtonText="Contact Now"
        secondaryButtonText="Group Rate"
      />
      <PricingItem
        title="NJ Compliant (PTC) Permit To Carry"
        duration="8-10 Hours"
        price="$600"
        priceLabel="Limit 2 Pers"
        groupPrice="$185"
        groupPriceLabel="Group Rate"
        containerVariant="mt-6"
        primaryButtonText="Contact Now"
        secondaryButtonText="Group Rate"
      />
      <PricingItem
        title="Situational Awareness Lvl 1"
        duration="2 Hours • Contact us to arrange a class"
        price="$95"
        priceLabel="per person"
        groupPrice="$95"
        groupPriceLabel="per person"
        containerVariant="mt-6"
        primaryButtonText="Contact Now"
        secondaryButtonText="Group Rate"
      />
      <PricingItem
        title="De-escalation That Works"
        duration="2 Hours • Contact us to arrange a class"
        price="$95"
        priceLabel="per person"
        groupPrice="$95"
        groupPriceLabel="per person"
        containerVariant="mt-6"
        primaryButtonText="Contact Now"
        secondaryButtonText="Group Rate"
      />
      <PricingItem
        title="MACE Personal Defense Spray"
        duration="3 Hours • Contact us to arrange a class"
        price="$125"
        priceLabel="per person"
        groupPrice="$125"
        groupPriceLabel="per person"
        containerVariant="mt-6"
        primaryButtonText="Contact Now"
        secondaryButtonText="Group Rate"
      />
      <PricingItem
        title="Conducted Energy Devices"
        duration="3 Hours • Contact us to arrange a class"
        price="$125"
        priceLabel="per person"
        groupPrice="$125"
        groupPriceLabel="per person"
        containerVariant="mt-6"
        primaryButtonText="Contact Now"
        secondaryButtonText="Group Rate"
      />
      <PricingItem
        title="Stop The Bleed"
        duration="2 Hours • Contact us to arrange a class (Minimum 4 Attendees)"
        price="$250"
        priceLabel="Limit 2 Pers"
        groupPrice="$55"
        groupPriceLabel="Group Rate"
        containerVariant="mt-6"
        primaryButtonText="Contact Now"
        secondaryButtonText="Group Rate"
      />
      <PricingItem
        title="ETCC Emergency Tactical Casualty Control"
        duration="4 Hours "
        price="$350"
        priceLabel="Limit 2 Pers"
        groupPrice="$125"
        groupPriceLabel="Group Rate"
        containerVariant="mt-6"
        primaryButtonText="Contact Now"
        secondaryButtonText="Group Rate"
      />
    </div>
  );
};
