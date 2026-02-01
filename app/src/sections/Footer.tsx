import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/MahadAsh', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/mahad-ashraf', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:mahad8ash@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative w-full bg-void border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-4xl text-white mb-4">
              MY <span className="text-orange-500">PROFILES</span>
            </h3>


            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 rounded-lg text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-medium mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="mailto:mahad8ash@gmail.com"
                  className="hover:text-orange-500 transition-colors duration-300"
                >
                  mahad8ash@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+923330031950"
                  className="hover:text-orange-500 transition-colors duration-300"
                >
                  +92 333 003 1950
                </a>
              </li>
              <li>Sahiwal, Pakistan</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Made with lots of coffee.
            </p>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors duration-300"
            >
              <span className="text-sm">Back to top</span>
              <div className="p-2 bg-white/5 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300">
                <ArrowUp className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
