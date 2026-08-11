'use client';
import { useState } from 'react';
import { budgetRanges } from '@/content/company';
import { services } from '@/content/services';

export default function EnquiryForm() {
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState('');

  const field = 'w-full border-0 border-b border-ink/25 bg-transparent py-2.5 text-ink outline-none transition-colors focus:border-bronze';
  const label = 'text-[.65rem] uppercase tracking-[.2em] text-[#7A756B]';

  return (
    <form
      className="mt-8 grid gap-5 sm:grid-cols-2"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        // Wire to your endpoint / CRM here. Kept inert so the demo never posts.
        setSent(true);
      }}
    >
      <div className="grid gap-2"><label className={label} htmlFor="name">Name</label><input id="name" name="name" required autoComplete="name" className={field} /></div>
      <div className="grid gap-2"><label className={label} htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" className={field} /></div>
      <div className="grid gap-2"><label className={label} htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" autoComplete="tel" className={field} /></div>
      <div className="grid gap-2">
        <label className={label} htmlFor="projectType">Project type</label>
        <select id="projectType" name="projectType" className={field} defaultValue="">
          <option value="">Select</option>
          {services.map((s) => <option key={s.slug}>{s.name}</option>)}
          <option>Commercial project</option><option>Something else</option>
        </select>
      </div>
      <div className="grid gap-2"><label className={label} htmlFor="location">Project location</label><input id="location" name="location" placeholder="Town or postcode" className={field} /></div>
      <div className="grid gap-2">
        <label className={label} htmlFor="budget">Estimated budget</label>
        <select id="budget" name="budget" className={field} defaultValue="">
          <option value="">Select</option>
          {budgetRanges.map((b) => <option key={b}>{b}</option>)}
        </select>
      </div>
      <div className="grid gap-2">
        <label className={label} htmlFor="contactMethod">Preferred contact method</label>
        <select id="contactMethod" name="contactMethod" className={field}>
          <option>Phone call</option><option>Email</option><option>WhatsApp</option><option>Text message</option>
        </select>
      </div>
      <div className="grid gap-2">
        <label className={label} htmlFor="timing">Ideal start</label>
        <select id="timing" name="timing" className={field}>
          <option>As soon as possible</option><option>Within 3 months</option><option>3–6 months</option><option>Later than 6 months</option><option>Not sure yet</option>
        </select>
      </div>
      <div className="grid gap-2 sm:col-span-2">
        <label className={label} htmlFor="description">Project description</label>
        <textarea id="description" name="description" rows={4} className={`${field} resize-y`} placeholder="What are you looking to achieve? Include anything useful — drawings, planning status, site constraints." />
      </div>
      <div className="grid gap-2 sm:col-span-2">
        <label className={label} htmlFor="file">Plans or drawings (optional)</label>
        <label htmlFor="file" className="cursor-pointer border border-dashed border-ink/30 p-4 text-[.82rem] text-[#6B665D] transition-colors hover:border-bronze hover:bg-bronze/5">
          {fileName || 'Attach a file — PDF, JPG or PNG'}
        </label>
        <input id="file" name="file" type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
        <button type="submit" className="btn"><span>{sent ? 'Enquiry sent' : 'Request a consultation'}</span></button>
        <p className="max-w-[40ch] text-[.75rem] text-[#7A756B]">
          We reply Monday to Saturday, 8am–6pm. Out of hours, text or WhatsApp reaches us fastest.
        </p>
      </div>
      {sent && (
        <p className="text-[.85rem] text-[#2F6B45] sm:col-span-2" role="status">
          Thanks — your enquiry has been sent. We&apos;ll be in touch shortly. (Demo form: no data is submitted.)
        </p>
      )}
    </form>
  );
}
