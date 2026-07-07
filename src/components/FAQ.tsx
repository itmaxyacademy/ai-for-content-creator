import React from "react";
import { FAQS } from "../data";
import { HelpCircle, ChevronDown } from "lucide-react";

export default function FAQ() {
  return (
    <section className="py-16 md:py-24 bg-white" id="faq">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-blue font-bold mb-3">
            Pertanyaan Umum (FAQ)
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-navy leading-tight">
            Masih Ada Pertanyaan?
          </h2>
          <p className="text-muted text-xs md:text-sm mt-3">
            Berikut adalah jawaban dari beberapa pertanyaan yang paling sering diajukan mengenai program intensif ini.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <details
              key={idx}
              className="group bg-offwhite rounded-2xl border border-slate-200/50 overflow-hidden transition-all duration-300"
            >
              <summary className="flex justify-between items-center cursor-pointer p-5 md:p-6 font-bold text-sm md:text-base text-navy list-none focus:outline-none select-none">
                <span className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-blue flex-shrink-0" />
                  {faq.question}
                </span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform duration-300 ml-4 flex-shrink-0" />
              </summary>
              
              <div className="px-5 md:px-6 pb-5 md:pb-6 text-slate-600 leading-relaxed text-xs md:text-sm border-t border-slate-100 pt-4 bg-white/50">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
