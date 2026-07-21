import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required"),
  classApplied: z.string().min(1, "Please select a class"),
  message: z.string().optional(),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      classApplied: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Inquiry Submitted",
      description: "Thank you for reaching out. Our admissions office will contact you soon.",
    });
    form.reset();
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Page Banner */}
      <section 
        className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(26,58,107,0.85), rgba(26,58,107,0.95)), url('/images/hero-bg.jpg')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container relative z-10 px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 text-white/80 text-sm md:text-base font-medium tracking-wider uppercase"
          >
            <Link href="/" className="hover:text-[#f5a623] transition-colors">Home</Link>
            <ChevronRight size={16} />
            <span className="text-[#f5a623]">Contact</span>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-5 gap-16">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2 space-y-12"
          >
            <div>
              <h2 className="text-4xl font-serif font-bold text-[#1a3a6b] mb-6">Contact Information</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Have questions about admissions, facilities, or our curriculum? Our dedicated team is here to assist you.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#1a3a6b] shrink-0 group-hover:bg-[#1a3a6b] group-hover:text-[#f5a623] transition-colors duration-300">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-[#1a3a6b] text-xl mb-2">Campus Address</h4>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    MDN Global School<br />
                    Ambala Road, Kaithal<br />
                    Haryana - 136027, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#1a3a6b] shrink-0 group-hover:bg-[#1a3a6b] group-hover:text-[#f5a623] transition-colors duration-300">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-[#1a3a6b] text-xl mb-2">Phone numbers</h4>
                  <p className="text-gray-600 text-lg mb-1">Main Office: +91 98765 43210</p>
                  <p className="text-gray-600 text-lg">Admissions: +91 98765 43211</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#1a3a6b] shrink-0 group-hover:bg-[#1a3a6b] group-hover:text-[#f5a623] transition-colors duration-300">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-[#1a3a6b] text-xl mb-2">Email Addresses</h4>
                  <p className="text-gray-600 text-lg mb-1">info@mdnglobalschool.com</p>
                  <p className="text-gray-600 text-lg">admissions@mdnglobalschool.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#1a3a6b] shrink-0 group-hover:bg-[#1a3a6b] group-hover:text-[#f5a623] transition-colors duration-300">
                  <Clock size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-[#1a3a6b] text-xl mb-2">Office Hours</h4>
                  <p className="text-gray-600 text-lg mb-1">Monday - Saturday: 8:00 AM - 4:00 PM</p>
                  <p className="text-gray-600 text-lg">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
              <h2 className="text-3xl font-serif font-bold text-[#1a3a6b] mb-8">Admissions Inquiry</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1a3a6b] font-bold">Parent/Guardian Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter full name" className="bg-gray-50 h-14 border-transparent focus:border-[#1a3a6b] rounded-xl px-5 text-lg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1a3a6b] font-bold">Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+91" className="bg-gray-50 h-14 border-transparent focus:border-[#1a3a6b] rounded-xl px-5 text-lg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1a3a6b] font-bold">Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="email@example.com" className="bg-gray-50 h-14 border-transparent focus:border-[#1a3a6b] rounded-xl px-5 text-lg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="classApplied"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1a3a6b] font-bold">Class Applying For *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-gray-50 h-14 border-transparent focus:border-[#1a3a6b] rounded-xl px-5 text-lg">
                                <SelectValue placeholder="Select a class" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="nursery">Pre-Primary (Nursery - UKG)</SelectItem>
                              <SelectItem value="primary">Primary (Class 1 - 5)</SelectItem>
                              <SelectItem value="middle">Middle (Class 6 - 8)</SelectItem>
                              <SelectItem value="secondary">Secondary (Class 9 - 10)</SelectItem>
                              <SelectItem value="senior">Senior Secondary (Class 11 - 12)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1a3a6b] font-bold">Additional Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="min-h-[150px] bg-gray-50 border-transparent focus:border-[#1a3a6b] rounded-xl p-5 text-lg resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button 
                    type="submit" 
                    className="w-full bg-[#1a3a6b] text-white py-5 rounded-xl font-bold text-xl hover:bg-[#1a3a6b]/90 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    <Send size={24} />
                    Submit Inquiry
                  </button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map Embed (Placeholder) */}
      <div className="w-full h-[500px] bg-gray-200 relative mt-12">
        <div className="absolute inset-0 bg-[#1a3a6b]/5 z-0"></div>
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 z-10">
          <div className="text-center bg-white p-8 rounded-3xl shadow-xl">
            <MapPin size={48} className="mx-auto mb-4 text-[#f5a623]" />
            <p className="font-serif font-bold text-2xl text-[#1a3a6b] mb-2">Google Maps Integration</p>
            <p className="text-gray-500 text-lg">MDN Global School, Kaithal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
