import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
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
    // In a real app, this would send to an API
    console.log(values);
    toast({
      title: "Inquiry Submitted",
      description: "Thank you for reaching out. Our admissions office will contact you soon.",
    });
    form.reset();
  }

  return (
    <div className="pt-24 pb-0 bg-white">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-primary-foreground/80 max-w-2xl mx-auto"
          >
            We welcome inquiries from parents and prospective students.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Contact Information</h2>
              <p className="text-muted-foreground mb-8">
                Have questions about admissions, facilities, or curriculum? Our team is here to help.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg mb-1">Campus Address</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    MDN Global School<br />
                    Ambala Road, Kaithal<br />
                    Haryana - 136027, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg mb-1">Phone</h4>
                  <p className="text-muted-foreground">Main Office: +91 98765 43210</p>
                  <p className="text-muted-foreground">Admissions: +91 98765 43211</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg mb-1">Email</h4>
                  <p className="text-muted-foreground">info@mdnglobalschool.com</p>
                  <p className="text-muted-foreground">admissions@mdnglobalschool.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg mb-1">Office Hours</h4>
                  <p className="text-muted-foreground">Monday - Saturday: 8:00 AM - 4:00 PM</p>
                  <p className="text-muted-foreground">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-black/5"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Admissions Inquiry</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Parent/Guardian Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" className="bg-secondary/50 border-transparent focus:border-primary" {...field} data-testid="input-name" />
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
                        <FormLabel className="text-foreground">Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="+91" className="bg-secondary/50 border-transparent focus:border-primary" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@example.com" className="bg-secondary/50 border-transparent focus:border-primary" {...field} data-testid="input-email" />
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
                        <FormLabel className="text-foreground">Class Applying For *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-secondary/50 border-transparent focus:border-primary" data-testid="select-class">
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
                      <FormLabel className="text-foreground">Additional Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How can we help you?" 
                          className="min-h-[120px] bg-secondary/50 border-transparent focus:border-primary resize-none" 
                          {...field} 
                          data-testid="input-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  data-testid="button-submit-inquiry"
                >
                  <Send size={20} />
                  Submit Inquiry
                </button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>

      {/* Map Embed (Placeholder) */}
      <div className="w-full h-[400px] bg-muted relative mt-16">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <MapPin size={48} className="mx-auto mb-4 opacity-50" />
            <p className="font-medium text-lg">Google Maps Integration</p>
            <p className="text-sm">Kaithal, Haryana</p>
          </div>
        </div>
        {/* Real iframe would go here */}
      </div>
    </div>
  );
}
