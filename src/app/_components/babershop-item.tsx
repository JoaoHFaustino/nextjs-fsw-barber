import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

interface BarberShopItemsProps {
  barberShop: Barbershop
}

const BarberShopItem = ({ barberShop }: BarberShopItemsProps) => {
  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        {/* Imagem */}
        <div className="relative h-[159px] w-full">
          <Image
            fill
            className="rounded-2xl object-cover"
            alt={barberShop.name}
            src={barberShop.imageUrl}
          ></Image>

          <Badge
            className="absolute left-2 top-2 space-x-2"
            variant={"secondary"}
          >
            <StarIcon
              size={12}
              className="fill-primary text-primary"
            ></StarIcon>
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>
        {/* Texto */}
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{barberShop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barberShop.address}</p>
          <Button variant="secondary" className="mt-3 w-full" asChild>
            <Link href={`/barbershops/${barberShop.id}`}>Reservar </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarberShopItem
