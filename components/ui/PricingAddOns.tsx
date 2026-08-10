"use client";

import { motion } from "framer-motion";
import { websiteAddOn } from "@/lib/data";

export function PricingAddOns() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto mt-8 max-w-2xl"
    >
      <div className="flex flex-col gap-2 rounded-2xl border border-border-subtle bg-background-elevated p-6 text-center">
        <h4 className="text-sm font-bold uppercase tracking-widest text-muted">
          {websiteAddOn.title}
        </h4>
        <p className="text-sm leading-relaxed text-muted">
          <span className="font-semibold text-foreground">{websiteAddOn.price}</span> —{" "}
          {websiteAddOn.description}
        </p>
        <p className="text-xs text-muted">{websiteAddOn.note}</p>
      </div>
    </motion.div>
  );
}
