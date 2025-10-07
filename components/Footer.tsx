import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-4 mt-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-xl mb-4">Cribwise</h3>
          <p className="text-slate-400">Safe, verified student housing across Nigeria</p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">For Students</h4>
          <ul className="space-y-2 text-slate-400">
            <li><Link href="/properties">Browse Properties</Link></li>
            <li><Link href="/how-it-works">How It Works</Link></li>
            <li><Link href="/safety">Safety Guide</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">For Landlords</h4>
          <ul className="space-y-2 text-slate-400">
            <li><Link href="/landlords">List Property</Link></li>
            <li>Verification</li>
            <li>Pricing</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-slate-400">
            <li>About</li>
            <li>Contact</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
        <p>© 2025 Cribwise. Making student housing safe.</p>
      </div>
    </footer>
  )
}