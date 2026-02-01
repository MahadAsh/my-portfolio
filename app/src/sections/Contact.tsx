import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const form = formRef.current;

    if (!section || !heading || !form) return;

    const ctx = gsap.context(() => {
      // Heading animation
      const chars = heading.querySelectorAll('.char');
      gsap.fromTo(chars,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.03,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form slide up
      gsap.fromTo(form,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace with your actual Web3Forms access key using an environment variable
    const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "a144f416-4b3b-4d20-adc1-17e96f81551d";

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Message from Portfolio: ${formData.name}`,
        })
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error("Submission failed:", result);
        alert("Something went wrong. Please try again or email me directly.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);

      // Reset success state after 5 seconds
      if (isSubmitted) {
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const headingText = "LET'S TALK";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen py-24 px-4 sm:px-8 lg:px-16 bg-void overflow-hidden"
    >
      {/* Background Text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[25vw] text-white/[0.02] whitespace-nowrap"
          style={{
            WebkitTextStroke: '1px rgba(255, 92, 0, 0.1)',
            WebkitTextFillColor: 'transparent',
          }}
        >
          CONTACT
        </span>
      </div>

      {/* Dimming Overlay */}
      <div
        className={`fixed inset-0 bg-void/80 transition-opacity duration-500 pointer-events-none z-40 ${focusedField ? 'opacity-100' : 'opacity-0'
          }`}
      />

      <div className="relative z-50 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="font-display text-[clamp(3rem,10vw,7rem)] text-white mb-4 overflow-hidden"
          >
            {headingText.split('').map((char, i) => (
              <span key={i} className="char inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Have a project in mind? Let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              {[
                { icon: Phone, label: 'Phone', value: '+923330031950', href: 'tel:+923330031950' },
                { icon: Mail, label: 'Email', value: 'mahad8ash@gmail.com', href: 'mailto:mahad8ash@gmail.com' },
                { icon: MapPin, label: 'Location', value: 'Sahiwal, Pakistan', href: '#' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-start gap-4 group"
                >
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:border-orange-500/50 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block mb-1">{label}</span>
                    <span className="text-white group-hover:text-orange-500 transition-colors duration-300">
                      {value}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-white/10">
              <span className="text-sm text-gray-500 block mb-4">Connect with me</span>
              <div className="flex gap-3">
                {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="px-4 py-2 bg-white/5 rounded-lg text-sm text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name Field */}
              <div className="relative">
                <label
                  htmlFor="name"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'name' || formData.name
                    ? '-top-2 text-xs text-orange-500 bg-void px-2'
                    : 'top-4 text-gray-500'
                    }`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-4 bg-white/5 border rounded-lg text-white transition-all duration-300 input-glow ${focusedField === 'name' ? 'border-orange-500' : 'border-white/10'
                    }`}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'email' || formData.email
                    ? '-top-2 text-xs text-orange-500 bg-void px-2'
                    : 'top-4 text-gray-500'
                    }`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-4 bg-white/5 border rounded-lg text-white transition-all duration-300 input-glow ${focusedField === 'email' ? 'border-orange-500' : 'border-white/10'
                    }`}
                  required
                />
              </div>

              {/* Message Field */}
              <div className="relative">
                <label
                  htmlFor="message"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'message' || formData.message
                    ? '-top-2 text-xs text-orange-500 bg-void px-2'
                    : 'top-4 text-gray-500'
                    }`}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  className={`w-full px-4 py-4 bg-white/5 border rounded-lg text-white transition-all duration-300 input-glow resize-none ${focusedField === 'message' ? 'border-orange-500' : 'border-white/10'
                    }`}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`relative w-full py-4 rounded-lg font-medium transition-all duration-500 overflow-hidden ${isSubmitted
                  ? 'bg-green-500 text-white'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
              >
                <span className={`flex items-center justify-center gap-2 transition-all duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'
                  }`}>
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </span>

                {isSubmitting && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
