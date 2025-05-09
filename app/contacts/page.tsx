'use client';

import { useState } from 'react';
import ContactMap from './components/ContactMap';
import ContactForm from './components/ContactForm';
import FAQ from './components/FAQ';
import PartnershipForm from './components/PartnershipForm';
import PressInfo from './components/PressInfo';
import EmergencyContacts from './components/EmergencyContacts';
import OfficeInfo from './components/OfficeInfo';

export default function ContactsPage() {
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Контакты</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <OfficeInfo onSelectOffice={setSelectedOffice} />
        <ContactMap selectedOffice={selectedOffice} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ContactForm />
        <EmergencyContacts />
      </div>

      <div className="mb-12">
        <FAQ />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <PartnershipForm />
        <PressInfo />
      </div>
    </div>
  );
} 