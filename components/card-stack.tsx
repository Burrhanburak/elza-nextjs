"use client";
import { CardStack } from "@/components/ui/card-stack";
import { cn } from "@/lib/utils";

interface CardStackDemoProps {
  dict?: any;
}

export function CardStackDemo({ dict }: CardStackDemoProps) {
  // Create dynamic cards from dictionary or use fallback
  const getCards = () => {
    if (dict?.home?.carousel?.cardStack?.cards) {
      return dict.home.carousel.cardStack.cards.map((card: any, index: number) => ({
        id: index,
        name: card.name,
        designation: card.designation,
        content: (
          <p>
            {card.content.split('{highlight}').map((part: string, i: number) => {
              if (i === 0) return part;
              const [highlighted, ...rest] = part.split('{/highlight}');
              return (
                <span key={i}>
                  <Highlight>{highlighted}</Highlight>
                  {rest.join('{/highlight}')}
                </span>
              );
            })}
          </p>
        ),
      }));
    }
    return CARDS; // Fallback to default cards
  };

  return (
    <div className="h-60 flex items-center justify-center w-full">
      <CardStack items={getCards()} />
    </div>
  );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        " bg-emerald-100 text-black dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Bioenerji Terapisi",
    designation: "Bireysel Seans",
    content: (
      <p>
        Bedensel ve duygusal blokajları <Highlight>enerji dengeleme</Highlight> ile
        çözüp doğal iyileşme sürecini destekleyen bütünsel bir yaklaşım.
      </p>
    ),
  },
  {
    id: 1,
    name: "Bioterapi",
    designation: "Seans ve Program",
    content: (
      <p>
        Kişiye özel <Highlight>biyolojik enerji</Highlight> protokolleriyle düzenli seanslar ve
        takip; stres, uyku ve odak sorunlarında etkili destek.
      </p>
    ),
  },
  {
    id: 2,
    name: "Reiki ve Enerji Dengeleme",
    designation: "Uyumlama ve Seans",
    content: (
      <p>
        Zihin–beden–ruh uyumunu artıran <Highlight>şifa akışı</Highlight> ile dinginlik,
        rahatlama ve yüksek yaşam enerjisi.
      </p>
    ),
  },
];
