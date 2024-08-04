import { HeartPulseIcon } from 'lucide-react'

export const Logo = () => {
  return (
    <div className=" inline-flex gap-1 items-center text-foreground">
      <HeartPulseIcon size={24} />
      <b className="font-bold text-xl italic ">Fixing Health</b>
    </div>
  )
}
