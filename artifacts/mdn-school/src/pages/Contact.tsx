import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } })
};

const contactCards = [
  {
    icon: MapPin,
    title: 'Our Address',
    lines: ['MDN Global School,', 'Kaithal, Haryana – 136027', 'India'],
    action: 'Get Directions',
    color: 'bg-blue-50 text-blue-600',
    border: 'border-blue-100',
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+91 98765 43210', '+91 01746 XXXXXX', 'Mon–Sat: 8 AM – 4 PM'],
    action: 'Call Now',
    color: 'bg-green-50 text-green-600',
    border: 'border-green-100',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['info@mdnglobalschool.com', 'admissions@mdnglobalschool.com'],
    action: 'Send Email',
    color: 'bg-amber-50 text-amber-600',
    border: 'border-amber-100',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    lines: ['Monday – Friday: 8 AM – 4 PM', 'Saturday: 9 AM – 1 PM', 'Sunday: Closed'],
    action: 'View Calendar',
    color: 'bg-purple-50 text-purple-600',
    border: 'border-purple-100',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', studentName: '', phone: '', email: '', classApplying: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.studentName.trim()) e.studentName = 'Student name is required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Enter a valid 10-digit mobile number';
    if (form.email && !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email';
    if (!form.classApplying.trim()) e.classApplying = 'Please enter the class';
    if (!form.message.trim()) e.message = 'Please write a brief message';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setSubmitError(json.message || 'Submission failed. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  return (
    <div className="flex flex-col">

      {/* ── Hero Banner ─────────────────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden">
        <img
          src="/images/students-happy.jpg"
          alt="MDN Global School Students"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1c46]/62 via-[#0a1c46]/38 to-[#1e56a0]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c46]/45 via-transparent to-transparent" />

        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 bg-[#f5a623]/20 border border-[#f5a623]/40 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" /> We're Here for You
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-5xl md:text-7xl font-serif font-black text-white leading-tight mb-5"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
            Get in <span className="text-[#f5a623]">Touch</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
            Have questions about admissions, academics, or our campus? We'd love to hear from you. Reach out and our team will respond promptly.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="mt-8 flex gap-3">
            <div className="h-1 w-20 bg-[#f5a623] rounded-full" />
            <div className="h-1 w-8 bg-white/30 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ── Contact Cards ────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.15}
                className={`bg-white rounded-2xl p-7 border ${card.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}>
                <div className={`w-13 h-13 w-12 h-12 ${card.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <card.icon size={24} />
                </div>
                <h3 className="font-serif font-bold text-[#1a3a6b] text-lg mb-3">{card.title}</h3>
                <div className="space-y-1 mb-4">
                  {card.lines.map((line, j) => (
                    <p key={j} className="text-gray-600 text-sm">{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Map ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Form */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm flex items-center gap-3 mb-4">
                <span className="w-10 h-px bg-[#f5a623]" /> Admissions Inquiry
              </p>
              <h2 className="text-4xl font-serif font-bold text-[#1a3a6b] mb-3">Send Us a Message</h2>
              <p className="text-gray-500 mb-10">Fill the form below and our admissions team will contact you within 24 hours.</p>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700">Thank you for reaching out. Our team will contact you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Parent Name & Student Name */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Parent / Guardian Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Ramesh Kumar"
                        className={`w-full border ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'} rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/30 focus:border-[#1a3a6b] transition-all`} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Student Name *</label>
                      <input name="studentName" value={form.studentName} onChange={handleChange} placeholder="e.g. Aarav Kumar"
                        className={`w-full border ${errors.studentName ? 'border-red-400 bg-red-50' : 'border-gray-200'} rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/30 focus:border-[#1a3a6b] transition-all`} />
                      {errors.studentName && <p className="text-red-500 text-xs mt-1">{errors.studentName}</p>}
                    </div>
                  </div>

                  {/* Phone & Class */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile no."
                        className={`w-full border ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'} rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/30 focus:border-[#1a3a6b] transition-all`} />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Class Applying For *</label>
                      <input name="classApplying" value={form.classApplying} onChange={handleChange} placeholder="e.g. Class V, KG 1"
                        className={`w-full border ${errors.classApplying ? 'border-red-400 bg-red-50' : 'border-gray-200'} rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/30 focus:border-[#1a3a6b] transition-all`} />
                      {errors.classApplying && <p className="text-red-500 text-xs mt-1">{errors.classApplying}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input name="email" value={form.email} onChange={handleChange} placeholder="Optional"
                      className={`w-full border ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'} rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/30 focus:border-[#1a3a6b] transition-all`} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={5}
                      placeholder="Tell us about your child, any specific queries, or how we can help..."
                      className={`w-full border ${errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200'} rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/30 focus:border-[#1a3a6b] transition-all resize-none`} />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {submitError && (
                    <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{submitError}</p>
                  )}
                  <motion.button type="submit" disabled={submitting} whileHover={{ scale: submitting ? 1 : 1.03 }} whileTap={{ scale: submitting ? 1 : 0.97 }}
                    className="w-full bg-[#1a3a6b] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#0f2557] transition-colors shadow-lg shadow-[#1a3a6b]/20 disabled:opacity-70 disabled:cursor-not-allowed">
                    <Send size={20} /> {submitting ? 'Sending…' : 'Send Inquiry'}
                  </motion.button>
                  <p className="text-gray-400 text-xs text-center">We respect your privacy. Your information will not be shared.</p>
                </form>
              )}
            </motion.div>

            {/* Map + Info */}
            <motion.div variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7 } } }}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-col gap-8 sticky top-24">

              {/* Google Maps Embed — MDN Global School exact location */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 aspect-video relative">
                <iframe
                  title="MDN Global School Location"
                  src="https://maps.google.com/maps?q=29.778579,76.4346884&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href="https://maps.app.goo.gl/uyF7zkAFZSvnAiaS9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-[#f5a623] text-[#1a3a6b] px-4 py-2 rounded-full font-bold text-xs shadow-lg hover:bg-yellow-400 transition-all flex items-center gap-1.5"
                >
                  <MapPin size={13} /> Open in Google Maps
                </a>
              </div>

              {/* Quick Info Box */}
              <div className="bg-[#f8f9ff] border border-[#1a3a6b]/10 rounded-2xl p-7">
                <h3 className="font-serif font-bold text-[#1a3a6b] text-xl mb-4">Admissions 2025–26</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  {[
                    '📅 Admission forms available year-round',
                    '📋 Entrance test for Class VI and above',
                    '🎓 Merit + need-based scholarships available',
                    '📞 Direct counselling sessions on Saturdays',
                    '🏫 Campus tour available by appointment',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">{item}</li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Quick Contact</p>
                  <a href="tel:+919876543210" className="text-[#1a3a6b] font-bold text-lg hover:text-[#f5a623] transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
