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
      whileHover={{ y: -6 }}
      className="gradient-border group relative flex flex-col gap-5 rounded-2xl p-8 transition-shadow duration-300 hover:shadow-[0_0_40px_-12px_rgba(139,92,246,0.5)]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-purple),var(--brand-pink))] text-white transition-transform duration-300 group-hover:scale-110">
        <Icon size={22} strokeWidth={2.25} />
      </div>
      <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </motion.div>
  );
}
