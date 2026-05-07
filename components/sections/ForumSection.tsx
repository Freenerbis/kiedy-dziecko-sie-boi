'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Globe, Users } from 'lucide-react';
import Container from '@/components/ui/Container';

const POST = {
  group: 'Mamy nastolatków — wsparcie i porady',
  members: '47 832 członków',
  author: 'Agnieszka W.',
  time: '2 dni temu',
  avatar: 'A',
  avatarColor: '#E8614A',
  photo: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=72&h=72&fit=crop&crop=face&auto=format&q=80',
  text: 'Dziewczyny, potrzebuję pomocy. Moja córka (14 l.) od ok. 3 tygodni jest zupełnie inna — zamknięta w sobie, prawie nie je, nie wychodzi z pokoju, przestała rozmawiać z koleżankami. Jak próbuję porozmawiać to mówi "wszystko ok" i wychodzi. Psycholog — termin za 2,5 miesiąca. Co robić przez ten czas?? Czy ktoś przez to przechodził? 😔',
  likes: 284,
  comments: 61,
};

const COMMENTS = [
  {
    author: 'Marta K.',
    avatar: 'M',
    color: '#8BB5A0',
    photo: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=60&h=60&fit=crop&crop=face&auto=format&q=80',
    time: '2 dni temu',
    text: 'To pewnie depresja młodzieńcza, moja córka tak samo miała. Samo przejdzie jak zmieni klasę 🤷‍♀️',
    likes: 12,
  },
  {
    author: 'Joanna P.',
    avatar: 'J',
    color: '#6B9E8A',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop&crop=face&auto=format&q=80',
    time: '2 dni temu',
    text: 'Daj jej przestrzeń, nie naciskaj. Nastolatki potrzebują swojego czasu. Masz po prostu za dużo niepotrzebnego stresu ❤️',
    likes: 34,
  },
  {
    author: 'Beata L.',
    avatar: 'B',
    color: '#C0784A',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=60&h=60&fit=crop&crop=face&auto=format&q=80',
    time: '1 dzień temu',
    text: 'Spróbuj dieta, może niedobór witaminy D? Moja znajoma miała podobny przypadek i pomogły suplementy.',
    likes: 8,
  },
  {
    author: 'Kasia R.',
    avatar: 'K',
    color: '#7A6FBF',
    photo: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=60&h=60&fit=crop&crop=face&auto=format&q=80',
    time: '1 dzień temu',
    text: 'Mam identyczną sytuację od miesiąca i też czekam na psychologa 😭 jakbyś coś znalazła co pomaga to napisz bo sama nie wiem co robić',
    likes: 97,
  },
  {
    author: 'Agnieszka W.',
    avatar: 'A',
    color: '#E8614A',
    photo: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=60&h=60&fit=crop&crop=face&auto=format&q=80',
    time: '20 godz. temu',
    text: 'Dzięki wszystkim za odpowiedzi... ale nadal nie wiem CO KONKRETNIE robić na co dzień. Czuję się bezradna 😔',
    likes: 143,
    isAuthor: true,
  },
];

function Avatar({ letter, color, photo, size = 36 }: { letter: string; color: string; photo?: string; size?: number }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={letter}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white"
      style={{ width: size, height: size, background: color, fontSize: size * 0.38 }}
    >
      {letter}
    </div>
  );
}

function ReactionBar({ likes, comments, small }: { likes: number; comments?: number; small?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${small ? 'pt-1.5' : 'pt-3'} border-t border-gray-100`}>
      <div className="flex items-center gap-1.5">
        <div className="flex -space-x-1">
          {['👍','❤️','😢'].map((e, i) => (
            <span key={i} className={`${small ? 'text-[10px]' : 'text-xs'} leading-none`}>{e}</span>
          ))}
        </div>
        <span className={`text-gray-400 ${small ? 'text-[10px]' : 'text-xs'}`}>{likes}</span>
      </div>
      {comments !== undefined && (
        <span className="text-gray-400 text-xs">{comments} komentarzy</span>
      )}
    </div>
  );
}

export default function ForumSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-32 bg-[#F0F2F5] overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-forest/8 text-forest text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 bg-coral rounded-full animate-pulse" />
            Nie jesteś sama
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-forest leading-tight tracking-tight font-black">
            Tysiące mam szukają<br />
            <span className="text-coral">tych samych odpowiedzi.</span>
          </h2>
          <p className="text-forest/55 mt-4 text-lg max-w-xl mx-auto">
            Grupy na Facebooku pełne są takich pytań. I pełne ogólników zamiast konkretnej pomocy.
          </p>
        </motion.div>

        {/* Facebook mockup */}
        <div ref={ref} className="max-w-[560px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden shadow-2xl shadow-forest/12"
          >
            {/* FB Group header */}
            <div className="bg-[#1877F2] px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm leading-none">{POST.group}</div>
                <div className="text-white/60 text-[11px] mt-0.5">{POST.members} • Grupa prywatna</div>
              </div>
            </div>

            {/* Post */}
            <div className="bg-white px-4 pt-4 pb-2">
              {/* Post author */}
              <div className="flex items-center gap-2.5 mb-3">
                <Avatar letter={POST.avatar} color={POST.avatarColor} photo={POST.photo} />
                <div>
                  <div className="text-[#050505] font-semibold text-sm">{POST.author}</div>
                  <div className="flex items-center gap-1 text-gray-400 text-[11px]">
                    <span>{POST.time}</span>
                    <span>·</span>
                    <Globe className="w-3 h-3" />
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-gray-400 ml-auto" />
              </div>

              {/* Post text */}
              <p className="text-[#050505] text-sm leading-relaxed mb-3">{POST.text}</p>

              {/* Reactions */}
              <ReactionBar likes={POST.likes} comments={POST.comments} />

              {/* Action buttons */}
              <div className="flex gap-1 pt-1 border-t border-gray-100 mt-2">
                {[
                  { icon: ThumbsUp, label: 'Lubię to' },
                  { icon: MessageCircle, label: 'Komentuj' },
                  { icon: Share2, label: 'Udostępnij' },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-gray-500 text-xs font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white border-t border-gray-100 px-4 pt-3 pb-4 flex flex-col gap-3">
              {COMMENTS.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.18, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex gap-2.5 ${c.isAuthor ? 'mt-1' : ''}`}
                >
                  <Avatar letter={c.avatar} color={c.color} photo={c.photo} size={30} />
                  <div className="flex-1">
                    <div
                      className={`rounded-2xl px-3 py-2 text-[13px] leading-snug ${
                        c.isAuthor
                          ? 'bg-coral/10 border border-coral/20'
                          : 'bg-[#F0F2F5]'
                      }`}
                    >
                      <span className="font-semibold text-[#050505] mr-1">{c.author}</span>
                      <span className="text-[#050505]/80">{c.text}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 px-1">
                      <span className="text-gray-400 text-[11px]">{c.time}</span>
                      <button className="text-gray-500 text-[11px] font-semibold hover:text-[#1877F2]">Lubię to</button>
                      <button className="text-gray-500 text-[11px] font-semibold hover:text-[#1877F2]">Odpowiedz</button>
                      <div className="flex items-center gap-0.5 ml-auto">
                        <span className="text-[10px]">👍</span>
                        <span className="text-gray-400 text-[11px]">{c.likes}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Callout below */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-6 bg-forest rounded-2xl px-6 py-5 flex items-start gap-4"
          >
            <span className="text-2xl flex-shrink-0 mt-0.5">💬</span>
            <div>
              <div className="text-white font-bold text-sm mb-1">
                "Czuję się bezradna" — to najczęstszy komentarz.
              </div>
              <p className="text-sage/70 text-sm leading-relaxed">
                Forum daje empatię, ale nie daje narzędzi. Potrzebujesz konkretnego planu —
                nie kolejnego "daj jej czas".
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
