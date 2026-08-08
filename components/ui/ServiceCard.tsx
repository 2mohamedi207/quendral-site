"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function ServiceCard({ icon: Icon, title, description, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group flex flex-col gap-5 rounded-2xl border border-border-subtle bg-background-elevated p-8 shadow-card transition-shadow duration-300 hover:shadow-card-lg"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-tint text-accent transition-transform duration-300 group-hover:scale-110">
        <Icon size={22} strokeWidth={2.25} />
      </div>
      <h3 className="text-xl font-bold tracking-[-0.02em]">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </motion.div>
  );
}
