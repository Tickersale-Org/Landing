import { useState } from "react";
import styles from './TicketsList.module.css';
import TicketCard from './TicketCard';
import TicketModal from './TicketModal';

const demoTickets = [
  {
    id: 1,
    eventName: 'Concierto de Rock 2025',
    date: '22 Jul 2025',
    venue: 'Estadio Nacional',
    section: 'VIP',
    seat: 'F12',
    price: 190.00,
    originalPrice: 220.00,
    seller: 'Usuario123',
    publishedAt: 'Hace 2 días',
    isVerified: true,
    stock: 2,
  },
  {
    id: 2,
    eventName: 'Feria Gastronómica',
    date: '30 Ago 2025',
    venue: 'Explanada Costa Verde',
    section: 'General',
    seat: 'N/A',
    price: 60.00,
    originalPrice: 60.00,
    seller: 'ComidaFan',
    publishedAt: 'Hace 3 horas',
    isVerified: false,
    stock: 1,
  },
  {
    id: 3,
    eventName: 'Festival Indie Lima',
    date: '5 Sep 2025',
    venue: 'Parque de la Exposición',
    section: 'General',
    seat: 'A20',
    price: 110.00,
    originalPrice: 150.00,
    seller: 'Maria_L',
    publishedAt: 'Hace 10 min',
    isVerified: true,
    stock: 4,
  },
  {
    id: 4,
    eventName: 'Noche Electrónica',
    date: '17 Oct 2025',
    venue: 'Centro de Convenciones',
    section: 'Platea',
    seat: 'B5',
    price: 95.00,
    originalPrice: 120.00,
    seller: 'DJPro',
    publishedAt: 'Hace 1 día',
    isVerified: false,
    stock: 1,
  },
  {
    id: 5,
    eventName: 'Teatro Familiar',
    date: '22 Dic 2025',
    venue: 'Gran Teatro Nacional',
    section: 'Mezzanine',
    seat: 'M18',
    price: 60.00,
    originalPrice: 80.00,
    seller: 'AnaBoleto',
    publishedAt: 'Hace 1 semana',
    isVerified: true,
    stock: 3,
  },
  {
    id: 6,
    eventName: 'Stand Up Comedy',
    date: '10 Nov 2025',
    venue: 'Auditorio Miraflores',
    section: 'General',
    seat: 'C22',
    price: 35.00,
    originalPrice: 50.00,
    seller: 'ReirEsGratis',
    publishedAt: 'Hace 5 horas',
    isVerified: false,
    stock: 2,
  },
];

export default function TicketsList() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Entradas Disponibles</h2>
      <div className={styles.grid}>
        {demoTickets.map(ticket => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onPreview={() => setSelectedTicket(ticket)}
          />
        ))}
      </div>
      <TicketModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </section>
  );
}
