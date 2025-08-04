import { ShieldCheck } from "lucide-react"

export function PhishGuardLogo() {
  return (
    <div className="flex items-center gap-2 p-2">
      <ShieldCheck className="w-8 h-8 text-primary" />
      <h1 className="text-xl font-bold text-primary-foreground">PhishGuard</h1>
    </div>
  )
}
