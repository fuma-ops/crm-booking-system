export type Language = 'fr' | 'en' | 'ar' | 'es' | 'pt' | 'de';

export const translations = {
  fr: {
    header: {
      title: "Smart Clinic OS",
      subtitle: "Medical CRM",
      nav_features: "Fonctionnalités",
      nav_demo: "Démo",
      nav_pricing: "Tarifs",
      nav_cta: "Essayer Gratuitement"
    },
    hero: {
      badge: "Pour les professionnels de santé",
      title: "Gestion de Clinique",
      title_accent: "Sans Abonnement",
      description: "Système complet de gestion de rendez-vous, CRM patient et formulaires personnalisés. 100% gratuit sur Google Sheets. Aucun serveur, aucune limite.",
      cta_primary: "Essayer la démo gratuite",
      cta_secondary: "Voir la vidéo (2 min)",
      trust_1: "0€/mois à jamais",
      trust_2: "100% privé sur vos sheets",
      trust_3: "6 langues incluses"
    },
    features: {
      section_title: "Tout ce dont vous avez besoin",
      booking_title: "Booking Intelligent",
      booking_desc: "Gestion des rendez-vous avec synchronisation Google Calendar en temps réel. Patients confirmés automatiquement.",
      email_title: "Emails Automatiques",
      email_desc: "Confirmations, rappels, annulations et changements. 6 langues. Personnalisables selon votre branding.",
      crm_title: "CRM Patient Complet",
      crm_desc: "Dossier patient centralisé, historique, notes médicales, fichier PDF exportable.",
      forms_title: "Formulaires sur Mesure",
      forms_desc: "Builder visuel sans code. Créez des formulaires de prise de rendez-vous en 2 minutes.",
      access_title: "Droits d'Accès Granulaires",
      access_desc: "Multi-utilisateurs avec permissions détaillées par formulaire et fonctionnalité.",
      analytics_title: "Dashboard Analytics",
      analytics_desc: "KPI en temps réel, graphiques de performance, taux de satisfaction patient."
    },
    demo: {
      section_title: "Voir en Action",
      description: "La démo interactive ci-dessous montre le flux complet du système. Cliquez sur les boutons pour naviguer."
    },
    pricing: {
      section_title: "Tarification Simple",
      starter: "Starter",
      pro: "Pro",
      enterprise: "Entreprise",
      price_free: "0€",
      button_start: "Démarrer"
    },
    testimonials: {
      section_title: "Avis des Utilisateurs"
    },
    footer: {
      copyright: "&copy; 2026 Smart Clinic OS. Made with ❤️ for healthcare professionals."
    }
  },
  en: {
    header: { title: "Smart Clinic OS", subtitle: "Medical CRM", nav_features: "Features", nav_demo: "Demo", nav_pricing: "Pricing", nav_cta: "Try Free" },
    hero: { 
      badge: "For healthcare professionals", 
      title: "Medical Clinic Management", 
      title_accent: "Without Subscription",
      description: "Full appointment system, patient CRM and custom forms. 100% free on Google Sheets. No server, no limits.",
      cta_primary: "Try the free demo",
      cta_secondary: "Watch video (2 min)",
      trust_1: "€0/month forever",
      trust_2: "100% private on your sheets",
      trust_3: "6 languages included"
    },
    features: { 
      section_title: "Everything you need",
      booking_title: "Smart Booking",
      booking_desc: "Appointment management with real-time Google Calendar sync.",
      email_title: "Automatic Emails",
      email_desc: "Confirmations, reminders, cancellations. Customizable branding.",
      crm_title: "Full Patient CRM",
      crm_desc: "Centralized record, history, medical notes, exportable PDF.",
      forms_title: "Custom Forms",
      forms_desc: "No-code visual builder. Create booking forms in 2 minutes.",
      access_title: "Granular Access",
      access_desc: "Multi-user with detailed permissions per form and feature.",
      analytics_title: "Analytics Dashboard",
      analytics_desc: "Real-time KPIs, charts, and patient satisfaction rates."
    },
    demo: { section_title: "See It In Action", description: "The interactive demo below shows the complete system flow. Click buttons to navigate." },
    pricing: { section_title: "Simple Pricing", starter: "Starter", pro: "Pro", enterprise: "Enterprise", price_free: "€0", button_start: "Start" },
    testimonials: { section_title: "User Reviews" },
    footer: { copyright: "&copy; 2026 Smart Clinic OS. Made with ❤️ for healthcare professionals." }
  },
  ar: {
    header: { title: "نظام العيادة الذكي", subtitle: "إدارة علاقات المرضى", nav_features: "الميزات", nav_demo: "تجريب", nav_pricing: "الأسعار", nav_cta: "جرب مجاناً" },
    hero: { 
      badge: "للمحترفين في الرعاية الصحية", 
      title: "إدارة العيادة الطبية", 
      title_accent: "بدون اشتراك",
      description: "نظام كامل لمواعيد، إدارة علاقات المرضى ونماذج مخصصة. مجاني 100٪ على Google Sheets. لا خوادم، لا قيود.",
      cta_primary: "جرب العرض المجاني",
      cta_secondary: "شاهد الفيديو (دقيقتان)",
      trust_1: "0 يورو/شهر للأبد",
      trust_2: "خصوصية 100٪ على أوراقك",
      trust_3: "6 لغات متضمنة"
    },
    features: { 
      section_title: "كل ما تحتاجه",
      booking_title: "حجز ذكي",
      booking_desc: "إدارة المواعيد مع مزامنة تقويم Google في الوقت الفعلي.",
      email_title: "رسائل بريد إلكتروني تلقائية",
      email_desc: "تأكيدات وتذكيرات وإلغاءات. قابلة للتخصيص حسب علامتك التجارية.",
      crm_title: "نظام CRM شامل للمرضى",
      crm_desc: "سجل مركزي ، تاريخ ، ملاحظات طبية ، ملف PDF قابل للتصدير.",
      forms_title: "نماذج مخصصة",
      forms_desc: "منشئ مرئي بدون كود. أنشئ نماذج حجز في دقيقتين.",
      access_title: "وصول محبب",
      access_desc: "متعدد المستخدمين مع أذونات مفصلة لكل نموذج وميزة.",
      analytics_title: "لوحة تحليلات",
      analytics_desc: "مؤشرات الأداء في الوقت الفعلي ومخططات ومعدلات رضا المرضى."
    },
    demo: { section_title: "شاهده في الواقع", description: "يوضح العرض التجريبي التفاعلي أدناه تدفق النظام بالكامل. انقر على الأزرار للتنقل." },
    pricing: { section_title: "تسعير بسيط", starter: "مبتدئ", pro: "محترف", enterprise: "مؤسسة", price_free: "0 يورو", button_start: "ابدأ" },
    testimonials: { section_title: "آراء المستخدمين" },
    footer: { copyright: "&copy; 2026 نظام العيادة الذكي. تم تقديمه بكل حب ❤️ لمخصصي الرعاية الصحية." }
  },
  es: {
    header: { title: "Smart Clinic OS", subtitle: "CRM Médico", nav_features: "Características", nav_demo: "Demo", nav_pricing: "Precios", nav_cta: "Probar Gratis" },
    hero: { 
      badge: "Para profesionales de la salud", 
      title: "Gestión de Clínica Médica", 
      title_accent: "Sin Suscripción",
      description: "Sistema completo de citas, CRM de pacientes y formularios. 100% gratis en Google Sheets. Sin servidores, sin límites.",
    },
    features: { section_title: "Todo lo que necesitas" },
    demo: { section_title: "Ver en Acción" },
    pricing: { section_title: "Precios Simples" },
    testimonials: { section_title: "Opiniones" },
    footer: { copyright: "&copy; 2026 Smart Clinic OS" }
  },
  pt: {
    header: { title: "Smart Clinic OS", subtitle: "CRM Médico", nav_features: "Recursos", nav_demo: "Demo", nav_pricing: "Preços", nav_cta: "Testar Grátis" },
    hero: { 
      badge: "Para profissionais de saúde", 
      title: "Gerenciamento de Clínica Médica", 
      title_accent: "Sem Assinatura",
      description: "Sistema completo de agendamento, CRM e formulários. 100% grátis no Google Sheets. Sem servidores, sem limites.",
    },
    features: { section_title: "Tudo o que você precisa" },
    demo: { section_title: "Ver em Ação" },
    pricing: { section_title: "Preços Simples" },
    testimonials: { section_title: "Avaliações" },
    footer: { copyright: "&copy; 2026 Smart Clinic OS" }
  },
  de: {
    header: { title: "Smart Clinic OS", subtitle: "Medizinisches CRM", nav_features: "Funktionen", nav_demo: "Demo", nav_pricing: "Preise", nav_cta: "Gratis Testen" },
    hero: { 
      badge: "Für Gesundheitsfachleute", 
      title: "Verwaltung Medizinischer Kliniken", 
      title_accent: "Ohne Abonnement",
      description: "Komplettes Terminsystem, Patienten-CRM und Formulare. 100% kostenlos auf Google Sheets. Keine Server, keine Limits.",
    },
    features: { section_title: "Alles, was Sie brauchen" },
    demo: { section_title: "In Aktion sehen" },
    pricing: { section_title: "Einfache Preise" },
    testimonials: { section_title: "Bewertungen" },
    footer: { copyright: "&copy; 2026 Smart Clinic OS" }
  }
};
