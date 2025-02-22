"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

interface Speaker {
  name: string
  reputation: string
  image: string
  details: string
}

const speakers: Speaker[] = [
  {
    name: "Licypriya Kangujam",
    reputation: "International Climate Activist | Founder, The Child Movement | UN Youth Advocate",
    image: "/images/licy_igbc.jpg",
    details:
      "A leading voice in climate activism since the age of six, Licypriya Kangujam advocates for climate policy reforms, education, and sustainability through The Child Movement. She has addressed world leaders at COP and global forums, inspiring millions.At SustainXTomorrow, she shares her journey, the power of youth leadership, and the future of sustainability.Don’t miss this inspiring session!",
  },
  {
    name: "V Suresh ",
    reputation: "Chairman - Policies and Advocacy Committee IGBC | President - Good Governance India Foundation",
    image: "/images/suresh.jpg",
    details: "V. Suresh, former IGBC Chairman and current Chair of its Policy and Advocacy Committee, is President of the Good Governance India Foundation. A strong advocate of sustainability, he led awareness efforts like 'Harit Prem Bharat Mahotsav' and won the 1997 'Best Chief Executive of the Year' award. He promotes green buildings that conserve resources, reduce waste, and enhance efficiency, strengthening India’s green building movement through IGBC’s rating systems.",
  },
  {
    name: "K Lava",
    reputation: "Chairman- IGBC Cochin Chapter| MD- SFS Homes Pvt Ltd.",
    image: "/images/lava.png",
    details: "K. Lava, Chairman of the IGBC Kochi Chapter, is a key advocate for sustainable building practices in Kerala. Under his leadership, IGBC Kochi has promoted green initiatives, encouraging developers to adopt eco-friendly construction. As Managing Director of SFS Homes, he has integrated IGBC principles, earning prestigious green building certifications. His efforts extend to academia, supporting IGBC student chapters to foster future sustainability leaders. ",
  },
  {
    name: "Dr Jayaraman Chillayil",
    reputation: "Founder & CEO - Equinoct",
    image: "/images/jayaraman.jpg",
    details: "Dr. Jayaraman Chillayil is the Co-founder and Managing Director of Equinoct, a community-sourced modeling solutions provider. With 28 years of industrial experience, he holds a Ph.D. in Energy Management from Amrita School of Business. He previously served as Senior Manager at BPCL Kochi Refinery. A two-time Fulbright Scholar and recipient of  Fulbright Kalam Climate Change Doctoral Fellowship",
   },
   {
    name: "Shuva Raha",
    reputation: "Fellow & Lead | International Cooperation at CEEW",
    image: "/images/shuva.jpg",
    details: "Shuva Raha is a Fellow and Lead for International Cooperation at CEEW, overseeing programs in Asia-Oceania, West Asia, Africa, Europe, and the Americas. She advises on G20, BRICS, and UN initiatives, focusing on energy security, climate resilience, and sustainable development. With 25+ years of experience in public policy and corporate operations, she collaborates with governments and industries to drive change. A Global Solutions Fellow and international speaker, she has also held leadership roles in media and industrial policy, shaping India’s renewable energy landscape.",
  },
  {
    name: "Prerna Prasad",
    reputation: "Founder Ecoplore",
    image: "/images/prerna.jpg",
    details: "Prerna Prasad is the founder and CEO of Ecoplore, a platform promoting eco-friendly accommodations in India. A former journalist, she launched Ecoplore in 2016 after recognizing the environmental impact of conventional tourism. She personally verifies properties to ensure they use sustainable materials like mud, wood, bamboo, or stone and maintain at least 33% greenery.  Under her leadership, Ecoplore won the Outlook Responsible Tourism Award (2019) and was recognized by UNEP for supporting SDG 12."
},
  {
    name: "Renjini Thampi",
    reputation: "Eco - Innovator | Founder & CEO | Vapasee Designs",
    image: "/images/rajnithampi.jpg",
    details: "Renjini Thampi, known as the 'Glass Upcycling Woman,' is the founder of Vapasee, a brand transforming discarded glass into sustainable décor. A pioneer in eco-conscious entrepreneurship, she was incubated at IIM Bangalore’s NSRCEL and selected for the Climate Collective Launchpad in 2020. In 2021, she was recognized as a 'UN Women Industry Disruptor.' Recently, she was named one of 20 climate leaders by the Women Climate Collective program, supported by the L'Oréal Foundation."
   },
]

const SpeakerCard = ({ speaker }: { speaker: Speaker }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev)
    }, 4000) // Auto-flip every 4 seconds

    return () => clearInterval(interval)
  }, [])

  return (
  
    <motion.div
      className="w-80 h-96 cursor-pointer perspective mx-4 flex-shrink-0"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute w-full h-full backface-hidden">
          <Image
            src={speaker.image || "/placeholder.svg"}
            alt={speaker.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-900 to-transparent p-4 rounded-b-lg">
            <h3 className="text-xl font-semibold text-white">{speaker.name}</h3>
            <p className="text-green-300 text-sm">{speaker.reputation}</p>
          </div>
        </div>
        <div className="absolute w-full h-full backface-hidden rotateY-180 bg-green-800 rounded-lg p-4 flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold text-white mb-2">{speaker.name}</h3>
          <p className="text-green-300 text-center text-sm">{speaker.details}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function SpeakersSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="speakers" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center"><br/>Our Speakers</h2>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto custom-scrollbar snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#22c55e transparent" }}
          >
            {speakers.map((speaker, index) => (
              <div key={index} className="snap-center">
                <SpeakerCard speaker={speaker} />
              </div>
            ))}
          </div>
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-green-500/50 hover:bg-green-500/75 text-white p-2 rounded-full"
          >
            &lt;
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-500/50 hover:bg-green-500/75 text-white p-2 rounded-full"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  )
}