import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="glassmorphic pt-16 pb-8 rounded-t-[40px] mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-glow mb-4">
              KLIMB
            </h3>
            <p className="text-white/70 mb-4">
              Helping kids discover their PERFECT sport through fun games and awesome activities!
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white/50 hover:text-primary transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-white/50 hover:text-primary transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-white/50 hover:text-primary transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-white/50 hover:text-primary transition-colors">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#journey" className="text-white/70 hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-white/70 hover:text-primary transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#quiz" className="text-white/70 hover:text-primary transition-colors">
                  Take the Quiz
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white/70 hover:text-primary transition-colors">
                  Sports Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-primary transition-colors">
                  Find a Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-primary transition-colors">
                  Partner Academies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Contact Us</h4>
            <address className="not-italic text-white/70 space-y-2">
              <p>123 Sports Avenue</p>
              <p>Playful City, PC 12345</p>
              <p>Email: hello@klimb.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} KLIMB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
