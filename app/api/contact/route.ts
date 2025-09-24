import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Çeviri objeleri
const translations = {
  tr: {
    newMessage: '🆕 Yeni İletişim Formu Mesajı',
    contactInfo: '👤 İletişim Bilgileri',
    name: 'Ad Soyad',
    email: 'E-posta',
    userType: 'Kullanıcı Tipi',
    appointmentDate: 'Randevu Tarihi',
    languageSupport: 'Dil Desteği',
    message: '💬 Mesaj',
    footerText: 'Bu mesaj ZovPersonal.com iletişim formu aracılığıyla gönderildi.',
    jobSeeker: 'İş Arayan',
    employer: 'İş Veren',
    notSpecified: 'Belirtilmemiş',
    turkish: 'Türkçe',
    german: 'Almanca',
    english: 'İngilizce'
  },
  en: {
    newMessage: '🆕 New Contact Form Message',
    contactInfo: '👤 Contact Information',
    name: 'Name',
    email: 'Email',
    userType: 'User Type',
    appointmentDate: 'Appointment Date',
    languageSupport: 'Language Support',
    message: '💬 Message',
    footerText: 'This message was sent via ZovPersonal.com contact form.',
    jobSeeker: 'Job Seeker',
    employer: 'Employer',
    notSpecified: 'Not Specified',
    turkish: 'Turkish',
    german: 'German',
    english: 'English'
  },
  de: {
    newMessage: '🆕 Neue Kontaktformular-Nachricht',
    contactInfo: '👤 Kontaktinformationen',
    name: 'Name',
    email: 'E-Mail',
    userType: 'Benutzertyp',
    appointmentDate: 'Termindat',
    languageSupport: 'Sprachunterstützung',
    message: '💬 Nachricht',
    footerText: 'Diese Nachricht wurde über das Kontaktformular von ZovPersonal.com gesendet.',
    jobSeeker: 'Arbeitssuchender',
    employer: 'Arbeitgeber',
    notSpecified: 'Nicht angegeben',
    turkish: 'Türkisch',
    german: 'Deutsch',
    english: 'Englisch'
  },
  nl: {
    newMessage: '🆕 Nieuw Contactformulier Bericht',
    contactInfo: '👤 Contactinformatie',
    name: 'Naam',
    email: 'E-mail',
    userType: 'Gebruikerstype',
    appointmentDate: 'Afspraakdatum',
    languageSupport: 'Taalondersteuning',
    message: '💬 Bericht',
    footerText: 'Dit bericht is verzonden via het contactformulier van ZovPersonal.com.',
    jobSeeker: 'Werkzoekende',
    employer: 'Werkgever',
    notSpecified: 'Niet gespecificeerd',
    turkish: 'Turks',
    german: 'Duits',
    english: 'Engels'
  },
  bg: {
    newMessage: '🆕 Ново съобщение от контактната форма',
    contactInfo: '👤 Контактна информация',
    name: 'Име',
    email: 'Имейл',
    userType: 'Тип потребител',
    appointmentDate: 'Дата за среща',
    languageSupport: 'Езикова поддръжка',
    message: '💬 Съобщение',
    footerText: 'Това съобщение е изпратено чрез контактната форма на ZovPersonal.com.',
    jobSeeker: 'Търсещ работа',
    employer: 'Работодател',
    notSpecified: 'Неопределено',
    turkish: 'Турски',
    german: 'Немски',
    english: 'Английски'
  },
  hr: {
    newMessage: '🆕 Nova poruka s kontaktnog obrasca',
    contactInfo: '👤 Kontaktne informacije',
    name: 'Ime',
    email: 'Email',
    userType: 'Tip korisnika',
    appointmentDate: 'Datum termina',
    languageSupport: 'Jezična podrška',
    message: '💬 Poruka',
    footerText: 'Ova poruka je poslana putem kontaktnog obrasca ZovPersonal.com.',
    jobSeeker: 'Tražitelj posla',
    employer: 'Poslodavac',
    notSpecified: 'Nije specificirano',
    turkish: 'Turski',
    german: 'Njemački',
    english: 'Engleski'
  },
  ro: {
    newMessage: '🆕 Nou mesaj din formularul de contact',
    contactInfo: '👤 Informații de contact',
    name: 'Nume',
    email: 'Email',
    userType: 'Tip utilizator',
    appointmentDate: 'Data programării',
    languageSupport: 'Suport lingvistic',
    message: '💬 Mesaj',
    footerText: 'Acest mesaj a fost trimis prin formularul de contact ZovPersonal.com.',
    jobSeeker: 'Căutător de locuri de muncă',
    employer: 'Angajator',
    notSpecified: 'Nespecificat',
    turkish: 'Turcă',
    german: 'Germană',
    english: 'Engleză'
  },
  sr: {
    newMessage: '🆕 Novi kontakt formular poruka',
    contactInfo: '👤 Kontakt informacije',
    name: 'Ime',
    email: 'Email',
    userType: 'Tip korisnika',
    appointmentDate: 'Datum termina',
    languageSupport: 'Jezička podrška',
    message: '💬 Poruka',
    footerText: 'Ova poruka je poslana putem kontaktnog obrasca ZovPersonal.com.',
    jobSeeker: 'Tražitelj posla',
    employer: 'Poslodavac',
    notSpecified: 'Nije specificirano',
    turkish: 'Turski',
    german: 'Nemački',
    english: 'Engleski'
  }
};

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is available
    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 503 }
      );
    }
    
    const body = await request.json();
    const { name, email, date, userType, languageSupport, message, locale = 'en' } = body;


    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get translations for the locale
    const t = translations[locale as keyof typeof translations] || translations.en;

    // Format user type for display
    const userTypeText = userType === 'job_seeker' ? 
                         (t as any).jobSeeker : 
                         userType === 'employer' ? 
                         (t as any).employer : 
                         (t as any).notSpecified;

    // Format language support  
    const languageText = languageSupport === 'turkish' ? (t as any).turkish :
                         languageSupport === 'german' ? (t as any).german :
                         languageSupport === 'english' ? (t as any).english :
                         (t as any).notSpecified;

    // Format date
    const formattedDate = date ? new Date(date).toLocaleDateString(locale) : (t as any).notSpecified;

    // Create email content with localization
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1c2706; border-bottom: 2px solid #1c2706; padding-bottom: 10px;">
          ${t.newMessage}
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #1c2706; margin-top: 0;">${t.contactInfo}</h3>
          <p><strong>${t.name}:</strong> ${name}</p>
          <p><strong>${t.email}:</strong> ${email}</p>
          <p><strong>${t.userType}:</strong> ${userTypeText}</p>
          <p><strong>${(t as any).appointmentDate}:</strong> ${formattedDate}</p>
          <p><strong>${(t as any).languageSupport}:</strong> ${languageText}</p>
        </div>

        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h3 style="color: #1c2706; margin-top: 0;">${(t as any).message}</h3>
          <p style="line-height: 1.6; color: #333;">${message}</p>
        </div>

        <div style="background-color: #1c2706; color: white; padding: 15px; border-radius: 10px; margin-top: 20px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">
            ${(t as any).footerText}
          </p>
        </div>
      </div>
    `;

    // Send email using Resend
    const result = await resend.emails.send({
      from: 'ZovPersonal <info@zovpersonal.com>', // Bu domain'i Resend'de verify etmen gerekiyor
      to: ['info@zovpersonal.com'],
      replyTo: email, // User'ın mailini reply-to olarak ekle
      subject: `📨 ${t.newMessage}: ${name} - ${userTypeText}`,
      html: emailContent,
    });



    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully',
        id: result.data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    
    
    return NextResponse.json(
      { 
        error: 'Failed to send email', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 