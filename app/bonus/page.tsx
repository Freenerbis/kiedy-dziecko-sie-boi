import BonusPhone from '@/components/sections/BonusPhone';

export const metadata = {
  title: 'Bonus: Telefon SOS — Gotowe odpowiedzi dla mamy',
  description: 'Przedsmak bonusu — 20 gotowych odpowiedzi na najtrudniejsze sytuacje z nastolatkiem.',
};

export default function BonusPage() {
  return (
    <main className="min-h-screen bg-paper">
      <BonusPhone />
    </main>
  );
}
