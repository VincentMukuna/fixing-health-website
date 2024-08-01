import { HeartPulseIcon } from 'lucide-react'

export const Logo = () => {
  return (
    <div className=" inline-flex gap-1 items-center">
      <HeartPulseIcon size={24} />
      <span className="font-bold text-xl italic">Fixing Health</span>
    </div>
  )
}
