import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <div>
      <h2>Hello From My APP</h2>
      <Button>Button</Button>

      <UserButton />
    </div>
  )
}
