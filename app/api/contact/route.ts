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
    languageSupport: 'Dil Desteği',
    message: '💬 Mesaj',
    footerText: 'Bu mesaj elzadarya.com iletişim formu aracılığıyla gönderildi.',
   bioenergy: 'Biyoenerji Terapisi',
   biotherapy: 'Bioterapi', 
    notSpecified: 'Belirtilmemiş',
    turkish: 'Türkçe',
    russian: 'Rusça',
    azerbaijani: 'Azərbaycanca',
    english: 'İngilizce'
  },
  en: {
    newMessage: '🆕 New Contact Form Message',
    contactInfo: '👤 Contact Information',
    name: 'Name',
    email: 'Email',
    userType: 'User Type',
    languageSupport: 'Language Support',
    message: '💬 Message',
    footerText: 'This message was sent via elzadarya.com contact form.',
    bioenergy: 'Bioenergy Therapy',
    biotherapy: 'Biotherapy',
    notSpecified: 'Not Specified',
    turkish: 'Turkish',
    russian: 'Russian',
    azerbaijani: 'Azerbaijani',
    english: 'English'
  },
  ru: {
      newMessage: '🆕 Новое сообщение из формы контакта',
    contactInfo: '👤 Контактная информация',
    name: 'Имя',
    email: 'Электронная почта',
    userType: 'Тип пользователя',
    languageSupport: 'Поддержка языка',
    message: '💬 Сообщение',
    footerText: 'Это сообщение было отправлено через форму контакта elzadarya.com.',
    bioenergy: 'Биоэнергетическая терапия',
    biotherapy: 'Биотерапия',
    notSpecified: 'Не указано',
    turkish: 'Турецкий',
    russian: 'Русский',
    azerbaijani: 'Азербайджанский',
    english: 'Английский'
  },
  az: {
    newMessage: '🆕 Yeni İletişim Formu Mesajı',
      contactInfo: '👤 İletişim Bilgileri',
    name: 'Ad Soyad',
    email: 'E-poçt ünvanı',
    userType: 'İstifadəçi Tipi',
    languageSupport: 'Dil Desteği',
    message: '💬 Mesaj',
    footerText: 'Bu mesaj elzadarya.com iletişim formu aracılığıyla gönderildi.',
    bioenergy: 'Bioenerji Terapiyası',
    biotherapy: 'Bioterapi',
    notSpecified: 'Belirtilmemiş',
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
    const userTypeText = userType === 'bioenergy' ? 
                         (t as any).bioenergy : 
                         userType === 'biotherapy' ? 
                         (t as any).biotherapy : 
                         (t as any).notSpecified;

    // Format language support  
    const languageText = languageSupport === 'turkish' ? (t as any).turkish :
                         languageSupport === 'russian' ? (t as any).russian :
                         languageSupport === 'azerbaijani' ? (t as any).azerbaijani :
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
      from: 'elzadarya <info@elzadarya.com>', // Bu domain'i Resend'de verify etmen gerekiyor
      to: ['info@elzadarya.com'],
      replyTo: email, // User'ın mailini reply-to olarak ekle,
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