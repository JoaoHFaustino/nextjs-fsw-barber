import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"

import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/babershop-item"
import { quickSearchOptions } from "./_constants/quickSearch"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { ptBR } from "date-fns/locale"
import { format } from "date-fns"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./_components/ui/carousel"
import { Card } from "./_components/ui/card"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const barberShops = await db.barbershop.findMany()
  const popularBarberShops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : []

  return (
    <>
      {/* Web */}
      <div className="hidden p-0 lg:block">
        <Header />

        <div className="flex h-[400px] w-[1400px] gap-[128px] p-[64px]">
          <div className="flex-1">
            <h2 className="text-xl font-bold">
              Olá, {session?.user ? session.user.name : "bem vindo"}!
            </h2>
            <p>
              <span className="capitalize">
                {format(new Date(), "EEEE, dd", { locale: ptBR })}
              </span>
              <span>&nbsp;de&nbsp;</span>
              <span className="capitalize">
                {format(new Date(), "MMMM", { locale: ptBR })}
              </span>
            </p>
            {/* Busca */}
            <div className="mt-12 h-9 w-[439px] gap-2">
              <Search />
            </div>
            {confirmedBookings.length > 0 && (
              <>
                <h2 className="mt-12 h-9 w-32 gap-3 text-xs font-bold uppercase text-gray-400">
                  Agendamentos
                </h2>
                {/* AGENDAMENTO */}
                <div className="h-[335px] w-[439px]">
                  <BookingItem
                    key={confirmedBookings[0].id}
                    booking={confirmedBookings[0]}
                  />
                </div>
              </>
            )}
          </div>

          {/* Recomendados */}
          <div className="flex-1">
            <h2 className="mt-8 text-xs font-bold uppercase text-gray-400">
              Recomendados
            </h2>
            <Carousel
              className="mt-4"
              opts={{
                align: "start",
              }}
            >
              <CarouselContent>
                {barberShops.map((barberShop) => (
                  <CarouselItem
                    key={barberShop.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="border-0">
                      <Card className="border-0 bg-transparent">
                        <div className="flex w-1">
                          <BarberShopItem
                            key={barberShop.id}
                            barberShop={barberShop}
                          />
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
        <div className="flex h-[463px] w-[1400px] gap-[128px] p-[64px]">
          {/* Populares */}
          <div className="flex-1">
            <h2 className="mt-8 text-xs font-bold uppercase text-gray-400">
              Populares
            </h2>
            <Carousel
              className="mt-4"
              opts={{
                align: "start",
              }}
            >
              <CarouselContent>
                {popularBarberShops.map((barberShop) => (
                  <CarouselItem
                    key={barberShop.id}
                    className="md:basis-1/2 lg:basis-1/6"
                  >
                    <div className="border-0">
                      <Card className="border-0 bg-transparent">
                        <div className="flex w-1">
                          <BarberShopItem
                            key={barberShop.id}
                            barberShop={barberShop}
                          />
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div>
        <div className="p-5 sm:hidden">
          <Header />
          <h2 className="mt-6 text-xl font-bold">
            Olá, {session?.user ? session.user.name : "bem vindo"}!
          </h2>
          <p>
            <span className="capitalize">
              {format(new Date(), "EEEE, dd", { locale: ptBR })}
            </span>
            <span>&nbsp;de&nbsp;</span>
            <span className="capitalize">
              {format(new Date(), "MMMM", { locale: ptBR })}
            </span>
          </p>
          {/* Busca */}
          <div className="mt-6">
            <Search />
          </div>

          {/* Busca rápida */}
          <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            {quickSearchOptions.map((option) => (
              <Button
                className="gap-2"
                variant="secondary"
                key={option.title}
                asChild
              >
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image
                    src={option.imageUrl}
                    width={16}
                    height={16}
                    alt={option.title}
                  />
                  {option.title}
                </Link>
              </Button>
            ))}
          </div>

          {/* Imagem */}
          <div className="relative mt-6 h-[150px] w-full">
            <Image
              alt="Agende nos melhores com FSW Barber"
              src={"/banner-01.png"}
              fill
              className="rounded-xl object-cover"
            />
          </div>

          {confirmedBookings.length > 0 && (
            <>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                Agendamentos
              </h2>

              {/* AGENDAMENTO */}
              <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {confirmedBookings.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            </>
          )}
          {/* Recomendados */}
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Recomendados
          </h2>
          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {barberShops.map((barberShop) => (
              <BarberShopItem key={barberShop.id} barberShop={barberShop} />
            ))}
          </div>

          {/* Populares */}
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Populares
          </h2>
          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {popularBarberShops.map((barberShop) => (
              <BarberShopItem key={barberShop.id} barberShop={barberShop} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
