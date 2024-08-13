import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"

export default function Home() {
  return (
    <div className="p-5">
      <Header />
      <h2 className="text-xl font-bold">Olá, João!</h2>
      <p>Segunda-feira, 06 de agosto</p>

      <div className="mt-6 flex items-center gap-2">
        <Input placeholder="Faça sua busca..."></Input>
        <Button>
          <SearchIcon></SearchIcon>
        </Button>
      </div>

      <div className="relative mt-6 h-[150px] w-full">
        <Image
          alt="Agende nos melhores com FSW Barber"
          src={"/banner-01.png"}
          fill
          className="rounded-xl object-cover"
        />
      </div>
    </div>
  )
}
