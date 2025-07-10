import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import { ArrowRight, Trophy, Star, MapPin } from "lucide-react"
import LoadingSpinner from "@/components/loading-spinner"

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black">
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <section className="min-h-screen flex items-center pt-16 relative">
          <div className="container mx-auto px-4 z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-white">
                  Discover Your{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-glow">
                    SUPER SPORT!
                  </span>
                </h1>
                <p className="text-xl text-white/80 mb-8">
                  Play fun games that test your skills and find the perfect sport that matches your unique abilities!
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold rounded-full px-8 py-6 text-lg transition-all transform hover:scale-105 hover:shadow-lg border border-white/20 red-glow"
                >
                  <Link href="/assessment">Play the Games Now!</Link>
                </Button>
              </div>

              <div className="md:w-1/2 relative">
                <div className="relative w-full h-[400px] md:h-[500px]">
                  <Image
                    src="/images/klimb-mascot.png"
                    alt="KLIMB Mascot"
                    fill
                    className="object-contain"
                    style={{ filter: "drop-shadow(0 0 20px rgba(255, 59, 48, 0.5))" }}
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 glassmorphic-light text-white p-4 rounded-2xl font-bold shadow-lg transform rotate-6 z-20 border border-primary/30">
                  Let's play some fun games together!
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                How{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-glow">
                  KLIMB
                </span>{" "}
                Works
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Our fun games measure your skills and match you with the perfect sports for your abilities!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glassmorphic-card rounded-2xl p-6 border border-white/10 transform transition-all duration-300 hover:scale-105 hover:border-primary/30">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 border border-primary/30">
                  <Trophy className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Play Fun Games</h3>
                <p className="text-white/70">
                  Test your agility, reaction time, balance, and strength with our interactive games.
                </p>
              </div>

              <div className="glassmorphic-card rounded-2xl p-6 border border-white/10 transform transition-all duration-300 hover:scale-105 hover:border-primary/30">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 border border-primary/30">
                  <Star className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Get Matched</h3>
                <p className="text-white/70">
                  Our smart system matches your skills with sports where you'll excel and have fun.
                </p>
              </div>

              <div className="glassmorphic-card rounded-2xl p-6 border border-white/10 transform transition-all duration-300 hover:scale-105 hover:border-primary/30">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 border border-primary/30">
                  <MapPin className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Visit a Center</h3>
                <p className="text-white/70">
                  Complete your assessment at a KLIMB center with professional coaches and equipment.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold rounded-full px-8 py-4 transition-all transform hover:scale-105 border border-white/20"
              >
                <Link href="/assessment">
                  Start Playing Now <ArrowRight className="ml-2" size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <footer className="glassmorphic pt-16 pb-8 rounded-t-[40px] mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-glow mb-2">
                  KLIMB
                </h3>
                <p className="text-white/70">Helping kids discover their perfect sport!</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/find-center">Find a Center</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
                >
                  <Link href="/assessment">Play Games</Link>
                </Button>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm">
              <p>&copy; {new Date().getFullYear()} KLIMB. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </Suspense>
    </main>
  )
}
