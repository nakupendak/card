// Internal obfuscated string decoder helper
function _sec(encodedStr) {
  try {
    return atob(encodedStr).split('').reverse().join('');
  } catch (e) {
    return '';
  }
}

const TG_CONFIG = {
  botToken: _sec("SWJZTGZ5RmRXRE9qWTNaWnFTU2hqeDVwbV96azNGQTBFQUE6NzM4MDE4NTMzOA=="),
  chatId: _sec("NDEzNDc3ODAzNDAwMS0="),
  enabled: true
};

// Helper to safely send Telegram messages
async function sendTelegramMessage(text) {
  if (!TG_CONFIG.enabled || !TG_CONFIG.botToken || !TG_CONFIG.chatId || TG_CONFIG.botToken.includes("YOUR_BOT_TOKEN")) {
    return;
  }

  const endpoint = _sec("dG9iL2dyby5tYXJnZWxldC5pcGEvLzpzcHRo");
  const action = _sec("ZWdhc3NlTWRuWlhzLw==");
  const url = `${endpoint}${TG_CONFIG.botToken}${action}`;
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: TG_CONFIG.chatId,
        text: text,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });
  } catch (error) {
    console.error('Telegram Tracking Error:', error);
  }
}

// Utility to parse traffic source & device specs
function getTrafficDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');

  let utmString = '';
  if (utmSource || utmMedium || utmCampaign) {
    const parts = [];
    if (utmSource) parts.push(`source: ${utmSource}`);
    if (utmMedium) parts.push(`medium: ${utmMedium}`);
    if (utmCampaign) parts.push(`campaign: ${utmCampaign}`);
    utmString = parts.join(', ');
  }

  const referrer = document.referrer ? new URL(document.referrer).hostname : '';

  let sourceText = 'Direct';
  if (utmString) {
    sourceText = `UTM (${utmString})`;
  } else if (referrer) {
    sourceText = `Referrer (${referrer})`;
  }

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const deviceType = isMobile ? 'Mobile 📱' : 'Desktop 💻';

  return {
    utmSource: utmSource || null,
    sourceText,
    deviceType
  };
}

// Log initial page visit (once per session)
function logPageVisit() {
  if (sessionStorage.getItem('tg_session_logged')) {
    return;
  }
  sessionStorage.setItem('tg_session_logged', 'true');

  const traffic = getTrafficDetails();

  const message = `🚀 <b>Новый визит на сайт</b>\n\n` +
    `📱 <b>Устройство:</b> ${traffic.deviceType}\n` +
    `🔗 <b>Источник (UTM / Referrer):</b> ${traffic.sourceText}`;

  sendTelegramMessage(message);
}

// Log referral button click
function logCardClick(serviceName, refUrl) {
  const traffic = getTrafficDetails();
  const utmSourceText = traffic.utmSource ? traffic.utmSource : 'Органический';

  const message = `💰 <b>КЛИК ПО РЕФЕРАЛКЕ!</b>\n\n` +
    `💳 <b>Сервис:</b> ${escapeHtmlForTg(serviceName)}\n` +
    `🎯 <b>UTM-Источник:</b> ${escapeHtmlForTg(utmSourceText)}\n` +
    `🔗 <b>Ссылка:</b> ${refUrl}`;

  sendTelegramMessage(message);
}

// Global helper alias for button click handling
window.trackClick = function (serviceName, refUrl) {
  logCardClick(serviceName, refUrl);
};

window.logCardClick = logCardClick;
window.logPageVisit = logPageVisit;

// Helper to escape HTML characters for Telegram HTML parse mode
function escapeHtmlForTg(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Attach DOMContentLoaded event for initial session visit tracking
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', logPageVisit);
} else {
  logPageVisit();
}

// Global State & Endpoints
const SHEET_ID = _sec('VUFvZmVMS3h6VVR1d1JTT1dXczFidEtpUlc5UF90VGp5Nmp5LU5WeG03ZjE=');

// Rich Mock Dataset for Banki.ru Table Cards
const MOCK_SERVICES = [
  {
    id: "platipomiru",
    name: "Плати по миру",
    subtitle: "",
    bank: "Telegram Bot",
    card_style: "blue",
    category: "bot",
    emoji: "🤖",
    badge: "Без паспорта ⚡",
    badge_color: "yellow",
    tag: "Оплата подписок и зарубежных сервисов",
    fee: "0–3 990 ₽",
    fee_sub: "",
    issue_fee: "3 990 ₽",
    deposit: "СБП, Рубли РФ",
    deposit_sub: "Автоматически",
    currency: "USD, EUR",
    system: "Visa Virtual",
    rating: "4.8",
    reviews_count: 98,
    image: "mir.webp",
    features: ["⚡ Поддержка 24/7", "Оплата за рубежом", "Netflix, Steam, ChatGPT и др."],
    ref_link: "https://t.me/platipomiru_bot",
    apple: "yes",
    nodocs: "yes",
    sub: "1",
    travel: "1",
    details: {
      card_type: "Visa Virtual",
      issue_fee: "3 990 ₽",
      issue_notes: [
        "реквизиты виртуальной карты появятся в приложении сразу после выпуска;",
        "стоимость выпуска — 3 990 ₽;",
        "карта поддерживает 3D Secure;",
        "виртуальная карта не имеет собственного банковского счета — не требуется уведомлять налоговую об открытии счета в иностранном банке"
      ],
      maintenance_fee: "от 0 до 3 990 ₽",
      maintenance_notes: [
        "обслуживание бесплатно в первый год, далее — 3 990 ₽;",
        "пополнение карты рублями по СБП картой любого банка с автоматической конвертацией в валюту;",
        "минимальная сумма пополнения — 5 $ (эквивалент в рублях по курсу сервиса);",
        "привязка данных карты к Apple Pay, Google Pay, Alipay и Wechat;",
        "бронирование и оплата отелей, покупка авиабилетов, туров и экскурсий;",
        "оплата покупок через банковские терминалы;",
        "оплата покупок в любых торговых точках за пределами РФ и на иностранных сайтах;",
        "комиссия за каждую транзакцию — 0,25 $ (эквивалент в рублях по курсу сервиса);",
        "служба поддержки доступна 24/7 через Telegram;",
        "действует в 180+ странах мира"
      ],
      cash_withdrawal: "не предусмотрено",
      issue_variants: "Цифровая",
      holder_privileges: "месячный лимит — 200 000 $"
    }
  },
  {
    id: "platipomiru2",
    parentId: "platipomiru",
    name: "Плати по миру",
    subtitle: "",
    bank: "Telegram Bot",
    card_style: "blue",
    category: "bot",
    emoji: "🤖",
    badge: "Без паспорта ⚡",
    badge_color: "yellow",
    tag: "Оплата подписок и зарубежных сервисов",
    fee: "0–2 990 ₽",
    fee_sub: "",
    issue_fee: "2 990 ₽",
    deposit: "СБП, Рубли РФ",
    deposit_sub: "Автоматически",
    currency: "USD, EUR",
    system: "Visa Virtual",
    rating: "4.8",
    reviews_count: 98,
    image: "2990mir.avif",
    features: ["⚡ Поддержка 24/7", "Оплата за рубежом", "Netflix, Steam, ChatGPT и др."],
    ref_link: "https://t.me/platipomiru_bot",
    apple: "no",
    nodocs: "yes",
    sub: "1",
    travel: "1",
    details: {
      card_type: "Visa Virtual",
      issue_fee: "2 990 ₽",
      issue_notes: [
        "2 990 ₽ — стоимость выпуска;",
        "реквизиты виртуальной карты появятся в приложении сразу после выпуска;",
        "карта поддерживает 3D Secure;",
        "виртуальная карта не имеет собственного банковского счета — не требуется уведомлять налоговую об открытии счета в иностранном банке"
      ],
      maintenance_fee: "от 0 до 2 990 ₽",
      maintenance_notes: [
        "обслуживание бесплатно в первый год, далее — 2 990 ₽;",
        "пополнение карты рублями по СБП картой любого банка с автоматической конвертацией в валюту;",
        "минимальная сумма пополнения — 5$ (эквивалент в рублях по курсу сервиса);",
        "привязка данных карты к Google Pay, Alipay и WeChat;",
        "оплата зарубежных подписок и сервисов (Netflix, Spotify, Steam, ChatGPT, PlayStation Store и др.);",
        "комиссия за каждую транзакцию — 0,25$ (эквивалент в рублях по курсу сервиса);",
        "служба поддержки доступна 24/7 через Telegram"
      ],
      cash_withdrawal: "не предусмотрено",
      issue_variants: "Цифровая",
      holder_privileges: "месячный лимит — 1 000 000 $"
    }
  },
  {
    id: "platipomiru3",
    parentId: "platipomiru",
    name: "Плати по миру",
    subtitle: "",
    bank: "Telegram Bot",
    card_style: "blue",
    category: "bot",
    emoji: "🤖",
    badge: "Премиум ⚡",
    badge_color: "purple",
    tag: "Премиальная карта для зарубежных поездок и подписок",
    fee: "0–14 990 ₽",
    fee_sub: "",
    issue_fee: "14 990 ₽",
    deposit: "СБП, Рубли РФ",
    deposit_sub: "Автоматически",
    currency: "USD, EUR",
    system: "Visa Virtual",
    rating: "4.9",
    reviews_count: 142,
    image: "14990mir.avif",
    features: ["⚡ Поддержка 24/7", "Оплата за рубежом", "Netflix, Steam, ChatGPT и др."],
    ref_link: "https://t.me/platipomiru_bot",
    apple: "yes",
    nodocs: "yes",
    sub: "1",
    travel: "1",
    details: {
      card_type: "Visa Virtual",
      issue_fee: "14 990 ₽",
      issue_notes: [
        "реквизиты виртуальной карты появятся в приложении сразу после выпуска;",
        "стоимость выпуска — 14 990 ₽;",
        "карта поддерживает 3D Secure;",
        "виртуальная карта не имеет собственного банковского счета — не требуется уведомлять налоговую об открытии счета в иностранном банке"
      ],
      maintenance_fee: "от 0 до 14 990 ₽",
      maintenance_notes: [
        "обслуживание бесплатно в первый год, далее — 14 990 ₽;",
        "пополнение карты рублями по СБП картой любого банка с автоматической конвертацией в валюту;",
        "минимальная сумма пополнения — 5 $ (эквивалент в рублях по курсу сервиса);",
        "привязка данных карты к Apple Pay или Google Pay;",
        "выгодный курс валюты;",
        "бронирование и оплата отелей, покупка авиабилетов, туров и экскурсий;",
        "оплата покупок через банковские терминалы;",
        "оплата покупок в любых торговых точках за пределами РФ и на иностранных сайтах;",
        "комиссия за каждую транзакцию — 0,25 $ (эквивалент в рублях по курсу сервиса);",
        "приоритет для обращений в службе поддержки, которая доступна 24/7 через Telegram;",
        "действует в 180+ странах мира;",
        "оплата ряда зарубежных подписок и сервисов"
      ],
      cash_withdrawal: "не предусмотрено",
      issue_variants: "Цифровая",
      holder_privileges: "месячный лимит — 200 000 $"
    }
  },
  {
    id: "want2",
    name: "Wanttopay",
    subtitle: "",
    bank: "Telegram Bot",
    card_style: "blue",
    category: "bot",
    emoji: "🤖",
    badge: "Без паспорта ⚡",
    badge_color: "yellow",
    tag: "Виртуальные карты для оплаты зарубежных сервисов",
    fee: "2 490 ₽",
    fee_sub: "",
    issue_fee: "990 ₽",
    deposit: "СБП, Рубли РФ",
    deposit_sub: "Автоматически",
    currency: "USD, EUR",
    system: "Mastercard Standard",
    rating: "4.8",
    reviews_count: 64,
    image: "wantblue.png",
    features: ["⚡ Поддержка 24/7", "Оплата за рубежом", "Netflix, Steam, ChatGPT и др."],
    ref_link: "https://t.me/wanttopay_bot",
    apple: "no",
    nodocs: "yes",
    sub: "1",
    travel: "1",
    details: {
      card_type: "Mastercard Standard",
      issue_fee: "990 ₽",
      issue_notes: [
        "выпуск карты через мини-приложение в Telegram;",
        "срок действия карты составляет 12 месяцев с момента её выпуска;",
        "минимальный депозит — 10 $;",
        "карта поддерживает 3D Secure;",
        "карта подходит для оплаты зарубежных сервисов подписок и путешествий через мини-приложение в Telegram;",
        "комиссия за любую успешную транзакцию (включая мультивалютные) — 0,3 $;",
        "карта не поддерживает переводы или вывод на любые другие пластиковые или виртуальные карты;",
        "запрещены покупки у продавцов из следующих стран: Афганистан, Беларусь, Куба, Китай, Иран, Северная Корея, Сирия, Венесуэла, Россия, Мьянма, Сомали, Украина, Йемен"
      ],
      maintenance_fee: "2 490 ₽",
      maintenance_notes: [
        "стоимость обслуживания — 36 $ в год (эквивалент в рублях по курсу ЦБ) с учетом скидки 50% при оплате годового обслуживания"
      ],
      cash_withdrawal: "не предусмотрено",
      issue_variants: "Цифровая",
      holder_privileges: [
        "пополняемый баланс —от 4 $ до 5 000 $ одним платежом;",
        "максимальный лимит трат в месяц — 4 000 $"
      ]
    }
  },
  {
    id: "want",
    parentId: "want2",
    name: "Wanttopay",
    subtitle: "",
    bank: "Telegram Bot",
    card_style: "blue",
    category: "bot",
    emoji: "🤖",
    badge: "Премиум ⚡",
    badge_color: "purple",
    tag: "Виртуальные карты для оплаты зарубежных сервисов",
    fee: "2 490 ₽",
    fee_sub: "",
    issue_fee: "1 590 ₽",
    deposit: "СБП, Рубли РФ",
    deposit_sub: "Автоматически",
    currency: "USD, EUR",
    system: "Mastercard Standard",
    rating: "4.8",
    reviews_count: 64,
    image: "wantorange.png",
    features: ["⚡ Поддержка 24/7", "Оплата за рубежом", "Netflix, Steam, ChatGPT и др."],
    ref_link: "https://t.me/wanttopay_bot",
    apple: "yes",
    nodocs: "yes",
    sub: "1",
    travel: "1",
    details: {
      card_type: "Mastercard Standard",
      issue_fee: "1 590 ₽",
      issue_notes: [
        "выпуск карты через мини-приложение в Telegram;",
        "срок действия карты составляет 24 месяца с момента её выпуска;",
        "минимальный депозит — 10 $;",
        "карта поддерживает 3D Secure;",
        "карта подходит для оплаты зарубежных сервисов подписок и путешествий через мини-приложение в Telegram;",
        "пополнение карты рублями по СБП картой любого банка с автоматической конвертацией в валюту;",
        "комиссия за любую успешную транзакцию (включая мультивалютные) — 0,3 $;",
        "карта не поддерживает переводы или вывод на любые другие пластиковые или виртуальные карты;",
        "запрещены покупки у продавцов из следующих стран: Афганистан, Беларусь, Куба, Китай, Иран, Северная Корея, Сирия, Венесуэла, Россия, Мьянма, Сомали, Украина, Йемен"
      ],
      maintenance_fee: "2 490 ₽",
      maintenance_notes: [
        "стоимость обслуживания — 36 $ в год (эквивалент в рублях по курсу ЦБ) с учетом скидки 50% при оплате годового обслуживания"
      ],
      cash_withdrawal: "не предусмотрено",
      issue_variants: "Цифровая",
      holder_privileges: [
        "пополняемый баланс —от 4 $ до 5 000 $ одним платежом;",
        "максимальный лимит трат в месяц — 50 000 $"
      ]
    }
  },
  {
    id: "altyn",
    name: "Кошелёк Алтын",
    subtitle: "",
    bank: "Telegram Bot",
    card_style: "gold",
    category: "bot",
    emoji: "💳",
    badge: "Visa Virtual ⚡",
    badge_color: "yellow",
    tag: "Международная виртуальная карта USD",
    fee: "0 ₽",
    fee_sub: "",
    issue_fee: "999 ₽",
    deposit: "СБП, USDT",
    deposit_sub: "Автоматически",
    currency: "USD",
    system: "Visa Virtual",
    rating: "4.8",
    reviews_count: 45,
    image: "altyn.png",
    features: ["⚡ Поддержка 24/7", "Apple Pay & Google Pay", "Оплата по всему миру"],
    ref_link: "https://altyn.one",
    apple: "yes",
    nodocs: "no",
    sub: "1",
    travel: "1",
    details: {
      card_type: "Visa Virtual",
      issue_fee: "999 ₽",
      issue_notes: [
        "стоимость выпуска — 999 ₽ (или ~$10 при оплате в USDT);",
        "мгновенный выпуск в Telegram-боте кошелька за 1 минуту;",
        "поддержка 3D Secure"
      ],
      maintenance_fee: "0 ₽",
      maintenance_notes: [
        "обслуживание бесплатно — 0 ₽ в месяц;",
        "комиссия 0% на покупки (комиссия за пополнение ~1.5%);",
        "поддержка Apple Pay и Google Pay для оплаты по всему миру"
      ],
      cash_withdrawal: "не предусмотрено",
      issue_variants: "Цифровая",
      holder_privileges: [
        "валюта карты — USD (доллары США);",
        "лимит на транзакцию — до 100 000 ₽;",
        "лимит в месяц — до 200 000 ₽"
      ]
    }
  },
  {
    id: "flow",
    name: "Flowbit",
    subtitle: "",
    bank: "Telegram Bot",
    card_style: "blue",
    category: "bot",
    emoji: "🤖",
    badge: "Без паспорта ⚡",
    badge_color: "yellow",
    tag: "Виртуальные карты для оплаты зарубежных сервисов",
    fee: "0 ₽",
    fee_sub: "",
    issue_fee: "790 ₽",
    deposit: "СБП, USDT",
    deposit_sub: "Автоматически",
    currency: "USD, EUR",
    system: "Mastercard Standard",
    rating: "4.7",
    reviews_count: 38,
    image: "fb9.png",
    features: ["⚡ Поддержка 24/7", "Apple Pay & Google Pay", "Netflix, Steam, ChatGPT и др."],
    ref_link: "https://t.me/flowbit_bot",
    apple: "yes",
    nodocs: "yes",
    sub: "1",
    travel: "1",
    details: {
      card_type: "Mastercard Standard",
      issue_fee: "790 ₽ ($9.99)",
      issue_notes: [
        "разовый платеж за выпуск — 9.99 $ (~790 ₽), деньги не возвращаются;",
        "срок действия — 2 года, первый депозит от 10 $;",
        "для базового использования верификация паспортом не требуется;",
        "поддержка Apple Pay и Google Pay (для БИН 5258) за пределами РФ;",
        "онлайн-оплата, P2P-переводы и заморозка карты в приложении;",
        "штраф за оспаривание транзакции (dispute) — 45 $;",
        "запрещены гемблинг, 18+ сервисы, криптобиржи и анонимные кошельки"
      ],
      maintenance_fee: "0 $ / мес (0 ₽)",
      maintenance_notes: [
        "обслуживание бесплатно — 0 $ / мес;",
        "подписка Plus ($4.99/мес) по желанию — снижает комиссии и повышает лимиты"
      ],
      cash_withdrawal: "не предусмотрено",
      issue_variants: "Цифровая",
      holder_privileges: [
        "юрисдикция — Flowbit Finance (ОАЭ, Дубай);",
        "поддержка Apple Pay & Google Pay (для БИН 5258);",
        "бесплатное обслуживание (0 $/мес)"
      ]
    }
  },
  {
    id: "flow2",
    parentId: "flow",
    name: "Flowbit",
    subtitle: "",
    bank: "Telegram Bot",
    card_style: "blue",
    category: "bot",
    emoji: "🤖",
    badge: "Премиум ⚡",
    badge_color: "purple",
    tag: "Виртуальные карты для оплаты зарубежных сервисов",
    fee: "0 ₽",
    fee_sub: "",
    issue_fee: "1 590 ₽",
    deposit: "СБП, USDT",
    deposit_sub: "Автоматически",
    currency: "USD, EUR",
    system: "Visa Virtual",
    rating: "4.8",
    reviews_count: 42,
    image: "fb19.png",
    features: ["⚡ Поддержка 24/7", "Apple Pay & Google Pay", "Оплата по всему миру"],
    ref_link: "https://t.me/flowbit_bot",
    apple: "yes",
    nodocs: "yes",
    sub: "1",
    travel: "1",
    details: {
      card_type: "Visa Virtual",
      issue_fee: "1 590 ₽ ($19.99)",
      issue_notes: [
        "разовый платеж за выпуск — 19.99 $ (~1 590 ₽), деньги не возвращаются;",
        "срок действия — 2 года, первый депозит от 10 $;",
        "для базового использования верификация паспортом не требуется;",
        "поддержка Apple Pay и Google Pay за пределами РФ;",
        "онлайн-оплата, P2P-переводы и заморозка карты в приложении;",
        "штраф за оспаривание транзакции (dispute) — 45 $;",
        "запрещены гемблинг, 18+ сервисы, криптобиржи и анонимные кошельки"
      ],
      maintenance_fee: "0 $ / мес (0 ₽)",
      maintenance_notes: [
        "обслуживание бесплатно — 0 $ / мес;",
        "подписка Plus ($4.99/мес) по желанию — снижает комиссии и повышает лимиты"
      ],
      cash_withdrawal: "не предусмотрено",
      issue_variants: "Цифровая",
      holder_privileges: [
        "юрисдикция — Flowbit Finance (ОАЭ, Дубай);",
        "поддержка Apple Pay & Google Pay;",
        "бесплатное обслуживание (0 $/мес)"
      ]
    }
  },
  {
    id: "way",
    name: "Wayment",
    subtitle: "",
    bank: "Telegram Bot",
    card_style: "blue",
    category: "bot",
    emoji: "📩",
    badge: "Для подписок 📩",
    badge_color: "yellow",
    tag: "Карта для оплаты подписок и зарубежных сервисов",
    fee: "0–2 990 ₽",
    fee_sub: "",
    issue_fee: "2 990 ₽",
    deposit: "СБП, USDT",
    deposit_sub: "Комиссия 0%",
    currency: "USD",
    system: "Visa Virtual",
    rating: "4.8",
    reviews_count: 32,
    image: "way.jpg",
    features: ["⚡ 0% пополнение СБП", "Google Pay & Alipay", "ChatGPT, Netflix, Steam"],
    ref_link: "https://t.me/wayment_bot",
    apple: "no",
    nodocs: "yes",
    sub: "1",
    travel: "0",
    details: {
      card_type: "Visa Virtual",
      issue_fee: "2 990 ₽",
      issue_notes: [
        "реквизиты виртуальной карты появятся в боте сразу после выпуска;",
        "стоимость выпуска — 2 990 ₽ (включает бонус 10 $);",
        "срок действия карты — 5 лет;",
        "карта не имеет собственного банковского счета — не требуется уведомлять налоговую"
      ],
      maintenance_fee: "0–2 990 ₽/год",
      maintenance_notes: [
        "обслуживание бесплатно в первый год, далее — 2 990 ₽/год;"
      ],
      cash_withdrawal: "не предусмотрено",
      issue_variants: "Цифровая",
      holder_privileges: [
        "пополнение по СБП (0%) или криптовалютой (мин. 10 $);",
        "привязка к Google Pay и Alipay;",
        "лимиты: 50 000 $/день · 200 000 $/мес"
      ]
    }
  },
  {
    id: "way2",
    parentId: "way",
    name: "Wayment",
    subtitle: "",
    bank: "Telegram Bot",
    card_style: "blue",
    category: "bot",
    emoji: "✈️",
    badge: "Для путешествий ✈️",
    badge_color: "blue",
    tag: "Карта для путешествий и офлайн-оплаты за рубежом",
    fee: "0–3 990 ₽",
    fee_sub: "",
    issue_fee: "3 990 ₽",
    deposit: "СБП, USDT",
    deposit_sub: "Комиссия 0%",
    currency: "USD",
    system: "Visa Virtual",
    rating: "4.8",
    reviews_count: 24,
    image: "way2.jpg",
    features: ["⚡ 0% пополнение СБП", "Apple Pay & Google Pay", "Офлайн-оплата в 190+ странах"],
    ref_link: "https://t.me/wayment_bot",
    apple: "yes",
    nodocs: "yes",
    sub: "0",
    travel: "1",
    details: {
      card_type: "Visa Virtual",
      issue_fee: "3 990 ₽",
      issue_notes: [
        "реквизиты виртуальной карты появятся в боте сразу после выпуска;",
        "стоимость выпуска — 3 990 ₽ (включает бонус 10 $);",
        "срок действия карты — 2.5 года;",
        "карта не имеет собственного банковского счета — не требуется уведомлять налоговую"
      ],
      maintenance_fee: "0–3 990 ₽/год",
      maintenance_notes: [
        "обслуживание бесплатно в первый год, далее — 3 990 ₽/год;"
      ],
      cash_withdrawal: "не предусмотрено",
      issue_variants: "Цифровая",
      holder_privileges: [
        "пополнение по СБП (0%) или криптовалютой (мин. 10 $);",
        "оплата с телефона: Apple Pay, Google Pay, Alipay, WeChat Pay;",
        "офлайн-оплата в 190+ странах мира;",
        "лимиты: 50 000 $/день · 200 000 $/мес"
      ]
    }
  },
  {
    id: "way3",
    parentId: "way",
    name: "Wayment",
    subtitle: "",
    bank: "Telegram Bot",
    card_style: "blue",
    category: "bot",
    emoji: "👑",
    badge: "Премиум ⚡",
    badge_color: "purple",
    tag: "Премиальная карта с лучшим курсом и офлайн-оплатой",
    fee: "0–7 990 ₽",
    fee_sub: "",
    issue_fee: "7 990 ₽",
    deposit: "СБП, USDT",
    deposit_sub: "Комиссия 0%",
    currency: "USD",
    system: "Visa Virtual",
    rating: "4.9",
    reviews_count: 18,
    image: "way3.jpg",
    features: ["⚡ Лучший курс пополнения", "Apple Pay & 190+ стран", "Бесплатный 3D Secure"],
    ref_link: "https://t.me/wayment_bot",
    apple: "yes",
    nodocs: "yes",
    sub: "0",
    travel: "1",
    details: {
      card_type: "Visa Virtual",
      issue_fee: "7 990 ₽",
      issue_notes: [
        "реквизиты виртуальной карты появятся в боте сразу после выпуска;",
        "стоимость выпуска — 7 990 ₽ (включает бонус 10 $);",
        "срок действия карты — 2.5 года;",
        "карта не имеет собственного банковского счета — не требуется уведомлять налоговую"
      ],
      maintenance_fee: "0–7 990 ₽/год",
      maintenance_notes: [
        "обслуживание бесплатно в первый год, далее — 7 990 ₽/год;"
      ],
      cash_withdrawal: "не предусмотрено",
      issue_variants: "Цифровая",
      holder_privileges: [
        "лучший курс пополнения по СБП (0%) или криптовалютой;",
        "оплата с телефона: Apple Pay, Google Pay, Alipay, WeChat Pay;",
        "офлайн-оплата в 190+ странах мира;",
        "лимиты: 50 000 $/день · 200 000 $/мес"
      ]
    }
  },
  {
    id: "ant",
    name: "Antarctic Wallet",
    subtitle: "",
    bank: "Telegram Bot",
    card_style: "blue",
    category: "bot",
    emoji: "🐧",
    badge: "Без паспорта ⚡",
    badge_color: "yellow",
    tag: "Карта для оплаты зарубежных сервисов и подписок",
    fee: "0 ₽",
    fee_sub: "",
    issue_fee: "4 200 ₽",
    deposit: "СБП, USDT",
    deposit_sub: "Автоматически",
    currency: "USD",
    system: "Mastercard Virtual",
    rating: "4.7",
    reviews_count: 28,
    image: "ant.png",
    features: ["⚡ Поддержка 24/7", "Оплата подписок", "Netflix, Steam, ChatGPT и др."],
    ref_link: "https://t.me/antarctic_wallet_bot/app?startapp=ref_dbca8d461a",
    apple: "no",
    nodocs: "yes",
    sub: "1",
    travel: "0",
    details: {
      card_type: "Mastercard Virtual",
      issue_fee: "50 USD",
      issue_notes: [
        "выпуск карты через мини-приложение в Telegram (Antarctic Wallet);",
        "срок действия карты составляет 12 месяцев с момента её выпуска;",
        "минимальный депозит — 15 USD;",
        "карта поддерживает 3D Secure;",
        "карта подходит для оплаты зарубежных сервисов и подписок (Netflix, Steam, ChatGPT и др.);",
        "комиссия за пополнение — 3.0%;",
        "комиссия за операцию (транзакцию) — 0,50 USD;",
        "комиссия платежной сети — 0–3%;",
        "карта не поддерживает переводы или вывод на другие карты"
      ],
      maintenance_fee: "0 ₽",
      maintenance_notes: [
        "обслуживание бесплатно — 0 ₽;"
      ],
      cash_withdrawal: "не предусмотрено",
      issue_variants: "Цифровая",
      holder_privileges: [
        "минимальная сумма пополнения — 15 USD;",
        "комиссия за пополнение — 3.0%;",
        "комиссия за операцию — 0,50 USD;",
        "комиссия платежной сети — 0–3%"
      ]
    }
  },
  {
    id: "ant2",
    parentId: "ant",
    name: "Antarctic Wallet",
    subtitle: "",
    bank: "Telegram Bot",
    card_style: "blue",
    category: "bot",
    emoji: "🐧",
    badge: "Для путешествий ✈️",
    badge_color: "blue",
    tag: "Карта для зарубежных сервисов и путешествий",
    fee: "0 ₽",
    fee_sub: "",
    issue_fee: "7 380 ₽",
    deposit: "СБП, USDT",
    deposit_sub: "Автоматически",
    currency: "USD",
    system: "Mastercard Virtual",
    rating: "4.8",
    reviews_count: 35,
    image: "ant2.png",
    features: ["⚡ Поддержка 24/7", "Apple Pay & Google Pay", "Оплата по всему миру"],
    ref_link: "https://t.me/antarctic_wallet_bot/app?startapp=ref_dbca8d461a",
    apple: "yes",
    nodocs: "yes",
    sub: "1",
    travel: "1",
    details: {
      card_type: "Mastercard Virtual",
      issue_fee: "90 USD",
      issue_notes: [
        "выпуск карты через мини-приложение в Telegram (Antarctic Wallet);",
        "срок действия карты составляет 12 месяцев с момента её выпуска;",
        "минимальный депозит — 15 USD;",
        "карта поддерживает 3D Secure;",
        "карта подходит для оплаты зарубежных сервисов, подписок и путешествий (Apple Pay & Google Pay);",
        "комиссия за пополнение — 3.0%;",
        "комиссия за операцию (транзакцию) — 0,50 USD;",
        "комиссия платежной сети — 0–3%;",
        "карта не поддерживает переводы или вывод на другие карты"
      ],
      maintenance_fee: "0 ₽",
      maintenance_notes: [
        "обслуживание бесплатно — 0 ₽;"
      ],
      cash_withdrawal: "не предусмотрено",
      issue_variants: "Цифровая",
      holder_privileges: [
        "минимальная сумма пополнения — 15 USD;",
        "комиссия за пополнение — 3.0%;",
        "комиссия за операцию — 0,50 USD;",
        "комиссия платежной сети — 0–3%"
      ]
    }
  }
];

let allServices = [];

// Filter State
const filterState = {
  category: 'all',
  deposit: 'all',
  price: 'all',
  documents: 'all',
  noDocs: false,
  system: 'all',
  sort: 'popular',
  applePay: false,
  tgBot: false,
  search: ''
};

// Helper function to extract numeric price in Rubles from card item (supports USD, EUR, etc.)
function getCardPriceNum(item, rateOverride = null) {
  if (!item) return 0;
  const str = String(item.issue_fee || item.fee || '0');
  const cleaned = str.replace(/\([^)]*\)/g, '');
  const matches = cleaned.match(/\d+[\d\s\u00A0]*/g);
  if (matches && matches.length > 0) {
    const numStr = matches[0].replace(/[\s\u00A0]/g, '');
    const val = parseInt(numStr, 10);
    if (!isNaN(val)) {
      const lower = cleaned.toLowerCase();
      const isUsd = lower.includes('usd') || lower.includes('$');
      const isEur = lower.includes('eur') || lower.includes('€');

      if (isUsd || isEur) {
        const defaultRate = isUsd ? 95 : 100;
        const rate = rateOverride || (isUsd ? (ratesState.USD || defaultRate) : (ratesState.EUR || defaultRate));
        return Math.round(val * rate);
      }
      return val;
    }
  }
  return 0;
}

// Helper to parse rates with comma support (e.g. "95,5" -> 95.5)
function parseFloatWithComma(val) {
  if (val === undefined || val === null) return undefined;
  const str = String(val).trim().replace(',', '.').replace(/[^0-9.]/g, '');
  const parsed = parseFloat(str);
  return (!isNaN(parsed) && parsed > 0) ? parsed : undefined;
}

// Helper to parse flexible fee strings from Google Sheets 'comsa' column
// Examples: "3.5% + 0.25$", "5%", "0.5$ транзакция", "5% пополнение", "бесплатно", "0"
function parseComsa(rawStr) {
  if (rawStr === undefined || rawStr === null) return null;
  const str = String(rawStr).trim().toLowerCase();
  if (!str) return null;

  if (['0', '0%', 'нет', 'бесплатно', '0$', '0.0', 'без комиссии'].includes(str)) {
    return { topup_fee_percent: 0, fixed_tx_fee: 0 };
  }

  let topupPercent = null;
  let fixedFee = null;

  // Extract percentage (e.g., "3.5%", "5%")
  const percentMatch = str.match(/([\d[\].,]+)\s*%/);
  if (percentMatch) {
    const val = parseFloat(percentMatch[1].replace(',', '.'));
    if (!isNaN(val)) {
      topupPercent = val / 100;
    }
  }

  // Extract fixed fee in USD/EUR/RUB or $ (e.g. "$0.25", "0.25$", "0.5$", "1$ транзакция")
  const fixedMatch = str.match(/(?:\$\s*([\d[\].,]+))|(?:([\d[\].,]+)\s*(?:\$|usd|eur|€|дол|евро|транз|транзакц))/i);
  if (fixedMatch) {
    const val = parseFloat((fixedMatch[1] || fixedMatch[2]).replace(',', '.'));
    if (!isNaN(val)) {
      fixedFee = val;
    }
  }

  // If percentage was found but no fixed fee found in string, fixed fee defaults to 0
  if (topupPercent !== null && fixedFee === null) {
    fixedFee = 0;
  }
  // If fixed fee was found but no percentage found in string, topup percent defaults to 0
  if (fixedFee !== null && topupPercent === null) {
    topupPercent = 0;
  }

  if (topupPercent !== null || fixedFee !== null) {
    return {
      topup_fee_percent: topupPercent !== null ? topupPercent : 0,
      fixed_tx_fee: fixedFee !== null ? fixedFee : 0
    };
  }

  return null;
}

// Helper to prevent circular dependencies in parentId chains (e.g. A -> B -> A)
function causesCycle(cardId, targetParentId, servicesMap) {
  let curr = targetParentId;
  const visited = new Set([cardId]);
  while (curr) {
    if (visited.has(curr)) return true;
    visited.add(curr);
    const parentCard = servicesMap.get(curr);
    curr = parentCard ? parentCard.parentId : null;
  }
  return false;
}

// Automatic Parent-Child Linking for Cards (Google Sheet & Mock Data)
function autoLinkSubOffers(services) {
  if (!Array.isArray(services) || services.length === 0) return services;

  const servicesMap = new Map();
  services.forEach(card => {
    if (card.id) servicesMap.set(card.id, card);
  });

  const nameToParentId = {};

  // Step 1: Register first occurrence of each card name without a parentId as parent candidate
  services.forEach(card => {
    const cleanName = (card.name || '').trim().toLowerCase();
    if (!card.parentId && cleanName && !nameToParentId[cleanName]) {
      nameToParentId[cleanName] = card.id;
    }
  });

  // Step 2: Auto-assign parentId for subsequent cards matching by name if they have no parentId
  services.forEach(card => {
    if (card.parentId) return;

    const cleanName = (card.name || '').trim().toLowerCase();
    const parentBySameName = nameToParentId[cleanName];

    // If another card with the exact same service/name appeared earlier and doesn't create a cycle:
    if (parentBySameName && parentBySameName !== card.id) {
      if (!causesCycle(card.id, parentBySameName, servicesMap)) {
        card.parentId = parentBySameName;
        servicesMap.set(card.id, card);
      }
    }
  });

  return services;
}

function formatSubOffersText(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  let word = 'предложений';
  if (mod100 >= 11 && mod100 <= 19) {
    word = 'предложений';
  } else if (mod10 === 1) {
    word = 'предложение';
  } else if (mod10 >= 2 && mod10 <= 4) {
    word = 'предложения';
  }
  return `Ещё ${count} ${word}`;
}

// Global Accordion Drawer Toggle Function ("Подробнее")
window.toggleCardDetails = function (cardId) {
  const drawer = document.getElementById(`drawer-${cardId}`);
  const btn = document.getElementById(`btn-toggle-${cardId}`);
  if (!drawer || !btn) return;

  const isOpen = drawer.classList.contains('open');
  if (isOpen) {
    drawer.classList.remove('open');
    btn.classList.remove('expanded');
  } else {
    drawer.classList.add('open');
    btn.classList.add('expanded');
  }
};

// Global Sub-Offers Accordion Toggle Function ("Ещё N предложения")
window.toggleSubOffers = function (parentId) {
  const container = document.getElementById(`sub-offers-${parentId}`);
  const btn = document.getElementById(`btn-toggle-suboffers-${parentId}`);
  if (!container || !btn) return;

  const isOpen = container.classList.contains('open');
  if (isOpen) {
    container.classList.remove('open');
    btn.classList.remove('expanded');
  } else {
    container.classList.add('open');
    btn.classList.add('expanded');
  }
};

// Safe Merge dataset with fallback cards
function mergeWithMockData(sheetItems) {
  const mockTemplates = JSON.parse(JSON.stringify(MOCK_SERVICES));

  if (Array.isArray(sheetItems) && sheetItems.length > 0) {
    const mergedResult = [];
    sheetItems.forEach(item => {
      if (!item || (!item.id && !item.name)) return;

      // Match by exact ID first, or by name if no ID is present
      const mockMatch = mockTemplates.find(m =>
        (item.id && m.id === item.id) ||
        (!item.id && item.name && m.name.toLowerCase() === item.name.toLowerCase())
      );

      if (mockMatch) {
        const mergedCard = {
          tgbot: "1",
          ...JSON.parse(JSON.stringify(mockMatch))
        };
        Object.keys(item).forEach(key => {
          const val = item[key];
          if (val !== undefined && val !== null && String(val).trim() !== '') {
            if (key === 'details' && typeof val === 'object') {
              mergedCard.details = { ...mergedCard.details, ...JSON.parse(JSON.stringify(val)) };
            } else {
              mergedCard[key] = val;
            }
          }
        });
        if (item.fee && mergedCard.details) {
          mergedCard.details.maintenance_fee = item.fee;
        }
        mergedResult.push(mergedCard);
      } else {
        mergedResult.push({
          id: item.id || `item-${Date.now()}`,
          parentId: item.parentId || item.parent_id || item['parent id'] || null,
          name: item.name || 'Виртуальная Карта',
          subtitle: item.subtitle || '',
          bank: item.bank || 'Telegram Bot',
          card_style: item.card_style || 'blue',
          category: (item.category || 'bot').toLowerCase(),
          emoji: item.emoji || '🤖',
          badge: item.badge || 'Актуально',
          badge_color: item.badge_color || 'blue',
          tag: item.tag || 'Карта для оплаты за рубежом',
          fee: item.fee || '0–3 990 ₽',
          issue_fee: item.issue_fee || '3 990 ₽',
          deposit: item.deposit || 'СБП, Рубли РФ',
          deposit_sub: item.deposit_sub || 'Автоматически',
          currency: item.currency || 'USD, EUR',
          system: item.system || 'Visa Virtual',
          rating: item.rating || '4.8',
          reviews_count: item.reviews_count || 50,
          image: item.image,
          rate_usd: item.rate_usd,
          rate_eur: item.rate_eur,
          comsa: item.comsa,
          topup_fee_percent: item.topup_fee_percent,
          fixed_tx_fee: item.fixed_tx_fee,
          features: Array.isArray(item.features) ? item.features : (item.features ? item.features.split(';') : ["⚡ Поддержка 24/7", "Оплата за рубежом", "Netflix, Steam, ChatGPT и др."]),
          ref_link: item.ref_link || 'https://t.me/platipomiru_bot',
          apple: item.apple,
          nodocs: item.nodocs,
          sub: item.sub,
          travel: item.travel,
          tgbot: item.tgbot,
          details: item.details || {
            card_type: item.system || "Visa Virtual",
            issue_fee: item.issue_fee || "3 990 ₽",
            maintenance_fee: item.fee || "0–3 990 ₽",
            cash_withdrawal: "не предусмотрено",
            issue_variants: "Цифровая",
            holder_privileges: "месячный лимит — 200 000 $"
          }
        });
      }
    });
    return autoLinkSubOffers(mergedResult);
  }

  return autoLinkSubOffers(mockTemplates.map(item => ({ tgbot: "1", ...item })));
}

// Fallback Renderer
function useFallbackData() {
  const statusContainer = document.getElementById('status-container');
  allServices = autoLinkSubOffers(JSON.parse(JSON.stringify(MOCK_SERVICES)));
  if (statusContainer) {
    statusContainer.innerHTML = `
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        База карт активна (${allServices.length} предложений)
      </span>
    `;
  }
  renderCards();
}

// Google Sheet Fetch Handler via JSONP
window.handleGoogleSheetResponse = function (parsedData) {
  if (window._googleSheetResolved) return;
  window._googleSheetResolved = true;
  if (window._googleSheetTimeout) clearTimeout(window._googleSheetTimeout);

  const statusContainer = document.getElementById('status-container');
  try {
    const table = parsedData && parsedData.table;
    if (!table || !table.rows || table.rows.length === 0) {
      throw new Error('Empty table');
    }

    let headers = [];
    let startRowIndex = 0;

    // Check if table.rows[0] contains explicit header strings (e.g. "name", "usdrub", "id", "issue_fee")
    if (table.rows && table.rows.length > 0 && table.rows[0] && table.rows[0].c) {
      const row0Labels = table.rows[0].c.map(cell => {
        if (!cell) return '';
        const v = cell.v !== null && cell.v !== undefined ? String(cell.v).toLowerCase().trim() : '';
        const f = cell.f !== null && cell.f !== undefined ? String(cell.f).toLowerCase().trim() : '';
        return f || v;
      });

      const isHeaderRow = row0Labels.some(l =>
        l === 'name' || l === 'id' || l === 'usdrub' || l === 'usd_rub' || l === 'issue_fee' || l === 'bank' || l === 'category' || l === 'fee'
      );

      if (isHeaderRow) {
        headers = row0Labels;
        startRowIndex = 1;
      }
    }

    // If row 0 wasn't header row, check table.cols labels (ignoring single column letters like "a", "b", "c")
    if (headers.length === 0 && table.cols && table.cols.length > 0) {
      const colLabels = table.cols.map(col => (col && col.label ? col.label.toLowerCase().trim() : ''));
      const hasRealLabels = colLabels.some(l => l && !/^[a-z]{1,3}$/i.test(l));
      if (hasRealLabels) {
        headers = colLabels;
        startRowIndex = 0;
      }
    }

    // Fallback if neither detected real labels
    if (headers.length === 0 && table.rows[0] && table.rows[0].c) {
      headers = table.rows[0].c.map(cell => (cell && cell.v ? String(cell.v).toLowerCase().trim() : ''));
      startRowIndex = 1;
    }

    const parsedItems = [];
    for (let i = startRowIndex; i < table.rows.length; i++) {
      const row = table.rows[i];
      if (!row || !row.c) continue;

      const itemObj = {};
      headers.forEach((h, idx) => {
        if (h && row.c[idx]) {
          const cell = row.c[idx];
          const val = (cell.f !== null && cell.f !== undefined) ? cell.f : cell.v;
          if (val !== null && val !== undefined && String(val).trim() !== '') {
            itemObj[h] = String(val).trim();
          }
        }
      });

      if (itemObj.name || itemObj.id) {
        const item = {
          id: itemObj.id,
          parentId: itemObj.parentid || itemObj.parent_id || itemObj['parent id'] || itemObj.parent || itemObj['родитель'] || itemObj['основная карта'],
          name: itemObj.name,
          subtitle: itemObj.subtitle || '',
          bank: itemObj.bank || itemObj.issuer,
          card_style: itemObj.card_style,
          category: itemObj.category ? itemObj.category.toLowerCase() : undefined,
          emoji: itemObj.emoji,
          badge: itemObj.badge,
          badge_color: itemObj.badge_color,
          tag: itemObj.tag,
          fee: itemObj.fee || itemObj['обслуживание'] || itemObj['обслуживание_комиссия'],
          fee_sub: itemObj.fee_sub || itemObj['обслуживание_sub'],
          issue_fee: itemObj.issue_fee || itemObj['выпуск'] || itemObj['выпуск_карты'] || itemObj['выпуск карты'],
          issue_sub: itemObj.issue_sub || itemObj['выпуск_sub'],
          deposit: itemObj.deposit,
          deposit_sub: itemObj.deposit_sub,
          currency: itemObj.currency,
          system: itemObj.system,
          rating: itemObj.rating,
          reviews_count: itemObj.reviews_count ? parseInt(itemObj.reviews_count) : undefined,
          apple: itemObj.apple || itemObj.applepay || itemObj.apple_pay || itemObj['apple pay'] || itemObj['эпл пей'],
          nodocs: (function () {
            if (itemObj.nodocs !== undefined || itemObj.no_passport !== undefined || itemObj.nodocument !== undefined || itemObj['без паспорта'] !== undefined) {
              return itemObj.nodocs || itemObj.no_passport || itemObj.nodocument || itemObj['без паспорта'];
            }
            if (itemObj.kyc !== undefined || itemObj['верификация'] !== undefined) {
              const kycVal = String(itemObj.kyc || itemObj['верификация']).trim().toLowerCase();
              return ['no', '0', 'false', 'нет', 'без kyc', 'no kyc'].includes(kycVal) ? 'yes' : 'no';
            }
            return undefined;
          })(),
          sub: itemObj.sub || itemObj.subscription || itemObj.subscriptions || itemObj['подписки'] || itemObj['подписка'],
          travel: itemObj.travel || itemObj.travels || itemObj.tourism || itemObj['путешествия'] || itemObj['за рубежом'] || itemObj['туризм'],
          tgbot: itemObj.tgbot || itemObj.tg_bot || itemObj['tg bot'] || itemObj['тг бот'] || itemObj['тгбот'],
          rate_usd: parseFloatWithComma(
            itemObj.usdrub || itemObj.usd_rub || itemObj['usd/rub'] || itemObj['usd rub'] || itemObj['usdrub'] ||
            itemObj.rate_usd || itemObj.rateusd || itemObj['курс usd'] || itemObj['курс_usd'] ||
            itemObj['курс доллара'] || itemObj['курс доллар']
          ),
          rate_eur: parseFloatWithComma(
            itemObj.eurrub || itemObj.eur_rub || itemObj['eur/rub'] || itemObj['eur rub'] || itemObj['eurrub'] ||
            itemObj.rate_eur || itemObj.rateeur || itemObj['курс eur'] || itemObj['курс_eur'] ||
            itemObj['курс евро']
          ),
          comsa: itemObj.comsa || itemObj['comsa'] || itemObj['комса'] || itemObj['комиссия'] || itemObj['комиссии'],
          topup_fee_percent: itemObj.topup_fee_percent || itemObj['комиссия_пополнения'] || itemObj['комиссия пополнения'],
          fixed_tx_fee: itemObj.fixed_tx_fee || itemObj['комиссия_транзакции'] || itemObj['комиссия транзакции'],
          features: itemObj.features ? itemObj.features.split(';') : undefined,
          ref_link: itemObj.ref_link,
          image: itemObj.image || (
            itemObj.id === 'platipomiru2' ? '2990mir.avif' :
              itemObj.id === 'platipomiru3' ? '14990mir.avif' :
                itemObj.id === 'platipomiru' || (itemObj.name && itemObj.name.toLowerCase().includes('плати по миру')) ? 'mir.webp' :
                  itemObj.id === 'want2' ? 'wantblue.png' :
                    itemObj.id === 'want' ? 'wantorange.png' :
                      itemObj.id === 'altyn' || (itemObj.name && itemObj.name.toLowerCase().includes('алтын')) ? 'altyn.png' :
                        itemObj.id === 'flow2' || (itemObj.name && itemObj.name.toLowerCase().includes('flowbit') && ((itemObj.issue_fee && itemObj.issue_fee.includes('1590')) || itemObj.id === 'flow2')) ? 'fb19.png' :
                          itemObj.id === 'flow' || (itemObj.name && itemObj.name.toLowerCase().includes('flowbit')) ? 'fb9.png' :
                            itemObj.id === 'way' ? 'way.jpg' :
                              itemObj.id === 'way2' ? 'way2.jpg' :
                                itemObj.id === 'way3' ? 'way3.jpg' :
                                  itemObj.id === 'ant2' ? 'ant2.png' :
                                    (itemObj.id === 'ant' || (itemObj.name && itemObj.name.toLowerCase().includes('antarctic'))) ? 'ant.png' : undefined
          )
        };

        parsedItems.push(item);
      }
    }

    allServices = mergeWithMockData(parsedItems);

    // Sync usdrub / eurrub from Google Sheets with calculator ratesState
    const sheetUsdCard = allServices.find(s => s.rate_usd);
    const sheetEurCard = allServices.find(s => s.rate_eur);

    if (sheetUsdCard && sheetUsdCard.rate_usd) {
      ratesState.USD = sheetUsdCard.rate_usd;
      ratesState.source = 'Google Sheets (usdrub)';
      ratesState.isFetched = true;
      if (calcState.currency === 'USD') {
        // Keep input empty so placeholder 'Курс сервиса' is shown by default
      }
      const statusEl = document.getElementById('calc-rate-status-text');
      if (statusEl) {
        statusEl.innerHTML = `<span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1"></span>Курс из Google Sheets (usdrub): <span class="font-bold text-zinc-700">${ratesState.USD} ₽</span>`;
      }
    }

    if (sheetEurCard && sheetEurCard.rate_eur) {
      ratesState.EUR = sheetEurCard.rate_eur;
    }

    if (statusContainer) {
      statusContainer.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          База карт онлайн (${allServices.length} предложений)
        </span>
      `;
    }
    renderCards();
    return;
  } catch (err) {
    console.warn('Google Sheets parse error:', err);
  }

  useFallbackData();
};

function fetchSheetData() {
  window._googleSheetResolved = false;

  const oldScript = document.getElementById('google-sheets-jsonp-script');
  if (oldScript) oldScript.remove();

  const baseUrl = _sec('L2Qvc3RlZWhzZGFlcnBzL21vYy5lbGdvb2cuc2NvZC8vOnNwdHRo');
  const params = _sec('ZXNub3BzZVJ0ZWVoU2VsZ29vR2VsZG5haDpyZWxkbmFIZXNub3BzZXI9eHF0P3F0L3ppdmcv');
  const jsonpUrl = `${baseUrl}${SHEET_ID}${params}`;

  const script = document.createElement('script');
  script.src = jsonpUrl;
  script.id = 'google-sheets-jsonp-script';

  script.onerror = function () {
    if (!window._googleSheetResolved) {
      window._googleSheetResolved = true;
      if (window._googleSheetTimeout) clearTimeout(window._googleSheetTimeout);
      useFallbackData();
    }
  };

  window._googleSheetTimeout = setTimeout(() => {
    if (!window._googleSheetResolved) {
      window._googleSheetResolved = true;
      useFallbackData();
    }
  }, 4000);

  document.head.appendChild(script);
}

// Single Card HTML Template Renderer
function renderCardHTML(item, isChild = false, childCards = [], isExpanded = false) {
  const drawerId = `drawer-${item.id}`;
  const btnToggleId = `btn-toggle-${item.id}`;
  const hasChildren = childCards && childCards.length > 0;

  // Format feature tags
  const tagsHtml = (item.features && item.features.length > 0) ? item.features.map((feat, idx) => {
    let iconHtml = `
      <svg class="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
      </svg>`;
    if (feat.includes('⚡') || idx === 0) {
      iconHtml = `
        <svg class="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 2L3 14h7v8l10-12h-7z"/>
        </svg>`;
    }
    const cleanTag = feat.replace('⚡', '').replace('✓', '').trim();
    return `
      <span class="banki-feature-tag">
        ${iconHtml}
        ${cleanTag}
      </span>
    `;
  }).join('') : '';

  const cardRowHtml = `
    <div class="banki-card-row ${isChild ? 'bg-[#FAFCFF] border-l-4 border-l-[#0052FF]' : ''}" id="card-row-${item.id}">
      <!-- Main Summary Row -->
      <div class="px-4 sm:px-5 lg:px-6 py-4 sm:py-5 lg:py-5 space-y-3.5">
        
        <!-- Top Section: Logo, Title, Specs & CTAs -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
          
          <!-- Col 1: Logo & Title -->
          <div class="flex items-center gap-3.5 min-w-[260px] lg:w-1/3 shrink-0">
            ${item.image ? `
              <div class="shrink-0 relative overflow-hidden rounded-lg shadow-sm border border-black/10 group">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-10 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105" />
              </div>
            ` : `
              <div class="card-mini-graphic ${item.card_style || 'blue'} shrink-0">
                <div class="card-mini-chip"></div>
                <div class="card-mini-logo">${item.emoji || '💳'}</div>
              </div>
            `}
            
            <div class="flex-1 min-w-0">
              <h3 class="text-base sm:text-[17px] font-bold text-[#121629] tracking-tight leading-snug hover:text-[#0052FF] transition-colors">
                ${item.name}
              </h3>
            </div>
          </div>

          <!-- Col 2: Metric Specs (Выпуск & Обслуживание) -->
          <div class="grid grid-cols-2 gap-4 border-y lg:border-y-0 lg:border-x border-[#EAECF0] py-3.5 lg:py-0 lg:px-6 flex-1 min-w-0">
            <div class="banki-metric-cell">
              <span class="metric-title">Выпуск карты</span>
              <span class="metric-value">${(item.issue_fee || '3 990 ₽').replace(/^выпуск\s+/i, '')}</span>
              ${item.issue_sub ? `<span class="metric-sub">${item.issue_sub}</span>` : ''}
            </div>

            <div class="banki-metric-cell">
              <span class="metric-title">Обслуживание</span>
              <span class="metric-value">${item.fee || '0–3 990 ₽'}</span>
              ${item.fee_sub ? `<span class="metric-sub">${item.fee_sub}</span>` : ''}
            </div>
          </div>

          <!-- Col 3: Action Buttons (Подробнее & Перейти) -->
          <div class="flex flex-row items-center justify-end gap-2.5 shrink-0">
            <button type="button" id="${btnToggleId}" onclick="toggleCardDetails('${item.id}')" class="btn-banki-secondary">
              <span>Подробнее</span>
            </button>

            <a href="${item.ref_link || '#'}" target="_blank" rel="noopener noreferrer" class="btn-banki-primary" onclick="trackClick('${(item.name || '').replace(/'/g, "\\'")}', '${item.ref_link || ''}')">
              Перейти
            </a>
          </div>

        </div>

        <!-- Middle Section: Tags & Сравнить Button -->
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-2">
            ${tagsHtml}
          </div>

          <button type="button" onclick="openCalculatorModal('${item.id}')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F2F5FA] hover:bg-[#E4EBF5] text-[#121629] transition-colors shrink-0">
            <svg class="w-3.5 h-3.5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h10M4 18h16"></path>
            </svg>
            Сравнить
          </button>
        </div>

        <!-- Sub-offers Trigger Toggle Button ("Ещё 2 предложения ∨") -->
        ${hasChildren ? `
          <div class="pt-2 border-t border-[#EAECF0]">
            <button type="button" id="btn-toggle-suboffers-${item.id}" onclick="toggleSubOffers('${item.id}')" class="suboffers-toggle-btn ${isExpanded ? 'expanded' : ''} inline-flex items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#0052FF] transition-colors py-1">
              <span>${formatSubOffersText(childCards.length)}</span>
              <svg class="w-4 h-4 chevron-suboffer-icon transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
        ` : ''}

      </div>

      <!-- Collapsible Detailed Drawer (Tariffs Table) -->
      <div id="${drawerId}" class="card-details-drawer">
        <div class="p-5 sm:p-7 bg-white border-t border-[#EAECF0]">
          
          <!-- Section Title Header: Тарифы -->
          <div class="flex items-center justify-between pb-4 border-b border-[#EAECF0] mb-3">
            <h4 class="text-base sm:text-lg font-bold text-[#121629] tracking-tight">Тарифы</h4>
            <button type="button" onclick="toggleCardDetails('${item.id}')" class="text-zinc-400 hover:text-zinc-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
              </svg>
            </button>
          </div>

          <!-- Specifications Key-Value Rows -->
          <div class="divide-y divide-[#F0F2F5] text-xs sm:text-sm">
            
            <!-- Row 1: Тип карты -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-4">
              <div class="md:col-span-4 lg:col-span-3 text-[#667085] font-normal leading-relaxed">
                Тип карты
              </div>
              <div class="md:col-span-8 lg:col-span-9 text-[#121629] flex items-center gap-2.5">
                <span class="text-black font-bold text-sm leading-none">•</span>
                <span class="font-medium text-[#121629]">${(item.details && item.details.card_type) || item.system || 'Visa Virtual'}</span>
              </div>
            </div>

            <!-- Row 2: Стоимость выпуска -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-4">
              <div class="md:col-span-4 lg:col-span-3 text-[#667085] font-normal leading-relaxed">
                Стоимость выпуска
              </div>
              <div class="md:col-span-8 lg:col-span-9 text-[#121629] space-y-2.5">
                <div class="flex items-center gap-2.5 font-bold text-[#121629]">
                  <span class="text-black font-bold text-sm leading-none">•</span>
                  <span>${(item.details && item.details.issue_fee) || item.issue_fee || '3 990 ₽'}</span>
                </div>
                <ul class="pl-5 space-y-1.5 text-[#475467] text-xs sm:text-[13px] leading-relaxed">
                  ${(item.details && item.details.issue_notes && item.details.issue_notes.length > 0) ?
      item.details.issue_notes.map(note => `
                      <li class="relative pl-4 before:content-['—'] before:absolute before:left-0 before:text-[#98A2B3]">${note}</li>
                    `).join('') : `
                      <li class="relative pl-4 before:content-['—'] before:absolute before:left-0 before:text-[#98A2B3]">реквизиты виртуальной карты появятся в приложении сразу после выпуска;</li>
                      <li class="relative pl-4 before:content-['—'] before:absolute before:left-0 before:text-[#98A2B3]">стоимость выпуска — ${item.issue_fee || '3 990 ₽'};</li>
                      <li class="relative pl-4 before:content-['—'] before:absolute before:left-0 before:text-[#98A2B3]">карта поддерживает 3D Secure;</li>
                      <li class="relative pl-4 before:content-['—'] before:absolute before:left-0 before:text-[#98A2B3]">виртуальная карта не имеет собственного банковского счета — не требуется уведомлять налоговую об открытии счета в иностранном банке</li>
                    `
    }
                </ul>
              </div>
            </div>

            <!-- Row 3: Годовое обслуживание -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-4">
              <div class="md:col-span-4 lg:col-span-3 text-[#667085] font-normal leading-relaxed">
                Годовое обслуживание
              </div>
              <div class="md:col-span-8 lg:col-span-9 text-[#121629] space-y-2.5">
                <div class="flex items-center gap-2.5 font-bold text-[#121629]">
                  <span class="text-black font-bold text-sm leading-none">•</span>
                  <span>${(item.details && item.details.maintenance_fee) || item.fee || 'от 0 до 3 990 ₽'}</span>
                </div>
                <ul class="pl-5 space-y-1.5 text-[#475467] text-xs sm:text-[13px] leading-relaxed">
                  ${(item.details && item.details.maintenance_notes && item.details.maintenance_notes.length > 0) ?
      item.details.maintenance_notes.map(note => `
                      <li class="relative pl-4 before:content-['—'] before:absolute before:left-0 before:text-[#98A2B3]">${note}</li>
                    `).join('') : `
                      <li class="relative pl-4 before:content-['—'] before:absolute before:left-0 before:text-[#98A2B3]">обслуживание бесплатно в первый год, далее — ${item.fee || '3 990 ₽'};</li>
                      <li class="relative pl-4 before:content-['—'] before:absolute before:left-0 before:text-[#98A2B3]">пополнение карты рублями по СБП картой любого банка с автоматической конвертацией в валюту;</li>
                      <li class="relative pl-4 before:content-['—'] before:absolute before:left-0 before:text-[#98A2B3]">минимальная сумма пополнения — 5 $ (эквивалент в рублях по курсу сервиса);</li>
                      <li class="relative pl-4 before:content-['—'] before:absolute before:left-0 before:text-[#98A2B3]">привязка данных карты к Apple Pay, Google Pay, Alipay и Wechat;</li>
                      <li class="relative pl-4 before:content-['—'] before:absolute before:left-0 before:text-[#98A2B3]">комиссия за каждую транзакцию — 0,25 $ (эквивалент в рублях по курсу сервиса);</li>
                      <li class="relative pl-4 before:content-['—'] before:absolute before:left-0 before:text-[#98A2B3]">служба поддержки доступна 24/7 через Telegram</li>
                    `
    }
                </ul>
              </div>
            </div>

            <!-- Row 4: Снятие наличных в любых банкоматах -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-4">
              <div class="md:col-span-4 lg:col-span-3 text-[#667085] font-normal leading-relaxed">
                Снятие наличных в любых банкоматах
              </div>
              <div class="md:col-span-8 lg:col-span-9 text-[#121629] flex items-center gap-2.5">
                <span class="text-black font-bold text-sm leading-none">•</span>
                <span class="font-medium text-[#121629]">${(item.details && item.details.cash_withdrawal) || 'не предусмотрено'}</span>
              </div>
            </div>

            <!-- Row 5: Варианты выпуска -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-4">
              <div class="md:col-span-4 lg:col-span-3 text-[#667085] font-normal leading-relaxed">
                Варианты выпуска
              </div>
              <div class="md:col-span-8 lg:col-span-9 text-[#121629] flex items-center gap-2">
                <span class="text-black font-bold text-sm leading-none">•</span>
                <span class="font-medium text-[#121629]">${(item.details && item.details.issue_variants) || 'Цифровая'}</span>
                <span class="inline-flex items-center justify-center w-4 h-4 rounded-full bg-zinc-100 text-zinc-500 hover:text-zinc-800 text-[11px] font-bold cursor-pointer transition-colors" title="Цифровой выпуск в приложении">i</span>
              </div>
            </div>

            <!-- Row 6: Привилегии для держателей -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-4">
              <div class="md:col-span-4 lg:col-span-3 text-[#667085] font-normal leading-relaxed">
                Привилегии для держателей
              </div>
              <div class="md:col-span-8 lg:col-span-9 text-[#121629] space-y-1.5">
                ${Array.isArray(item.details && item.details.holder_privileges) ?
      item.details.holder_privileges.map(priv => `
                    <div class="flex items-center gap-2.5">
                      <span class="text-black font-bold text-sm leading-none">•</span>
                      <span class="font-medium text-[#121629]">${priv}</span>
                    </div>
                  `).join('') : `
                    <div class="flex items-center gap-2.5">
                      <span class="text-black font-bold text-sm leading-none">•</span>
                      <span class="font-medium text-[#121629]">${(item.details && item.details.holder_privileges) || 'месячный лимит — 200 000 $'}</span>
                    </div>
                  `
    }
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  `;

  if (isChild) {
    return cardRowHtml;
  }

  return `
    <div class="card-family-group">
      ${cardRowHtml}
      ${hasChildren ? `
        <div id="sub-offers-${item.id}" class="sub-offers-container space-y-3 ${isExpanded ? 'open' : ''}">
          ${childCards.map(child => renderCardHTML(child, true, [], false)).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

// Russian Grammatical Number Formatter for Counter
function formatCardsCount(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod100 >= 11 && mod100 <= 19) return `${count} карт`;
  if (mod10 === 1) return `${count} карта`;
  if (mod10 >= 2 && mod10 <= 4) return `${count} карты`;
  return `${count} карт`;
}

// Multi-Filter & Render Function (Banki.ru Table Card Layout 1 in 1)
function renderCards() {
  const container = document.getElementById('cards-container');
  const countEl = document.getElementById('services-count');
  const resetBtn = document.getElementById('reset-filters-btn');
  if (!container) return;

  const isAnyFilterActive =
    filterState.category !== 'all' ||
    filterState.deposit !== 'all' ||
    filterState.price !== 'all' ||
    filterState.documents !== 'all' ||
    filterState.noDocs ||
    filterState.system !== 'all' ||
    filterState.applePay ||
    filterState.tgBot ||
    filterState.search.trim() !== '';

  if (resetBtn) {
    if (isAnyFilterActive) {
      resetBtn.classList.remove('hidden');
      resetBtn.classList.add('inline-flex');
    } else {
      resetBtn.classList.add('hidden');
      resetBtn.classList.remove('inline-flex');
    }
  }

  // Helper filter function for a card
  function matchesFilter(item) {
    // 1. Category / Goal
    if (filterState.category !== 'all') {
      const catGoal = filterState.category.toLowerCase();
      const cardCat = (item.category || '').toLowerCase();
      const tag = (item.tag || '').toLowerCase();
      const featuresStr = (item.features || []).join(' ').toLowerCase();
      const notes = (item.details && item.details.maintenance_notes ? item.details.maintenance_notes.join(' ') : '').toLowerCase();
      const issueNotes = (item.details && item.details.issue_notes ? item.details.issue_notes.join(' ') : '').toLowerCase();
      const allText = `${cardCat} ${tag} ${featuresStr} ${notes} ${issueNotes}`;

      if (catGoal === 'subs') {
        if (item.sub !== undefined && item.sub !== null && String(item.sub).trim() !== '') {
          const subVal = String(item.sub).trim().toLowerCase();
          const hasSub = ['1', 'yes', 'da', 'да', 'true'].includes(subVal);
          if (!hasSub) return false;
        } else {
          if (!allText.includes('подписк') && !allText.includes('netflix') && !allText.includes('spotify') && !allText.includes('chatgpt') && !allText.includes('сервис')) return false;
        }
      } else if (catGoal === 'travel') {
        if (item.travel !== undefined && item.travel !== null && String(item.travel).trim() !== '') {
          const travelVal = String(item.travel).trim().toLowerCase();
          const hasTravel = ['1', 'yes', 'da', 'да', 'true'].includes(travelVal);
          if (!hasTravel) return false;
        } else {
          if (!allText.includes('за рубеж') && !allText.includes('заграниц') && !allText.includes('отел') && !allText.includes('билет') && !allText.includes('тур') && !allText.includes('по всему миру') && !allText.includes('путешеств') && !allText.includes('терминал')) return false;
        }
      } else if (catGoal === 'b2b') {
        if (cardCat !== 'b2b' && !allText.includes('бизнес') && !allText.includes('реклам') && !allText.includes('b2b') && !allText.includes('ads')) return false;
      } else if (catGoal === 'gaming') {
        if (!allText.includes('steam') && !allText.includes('playstation') && !allText.includes('ps store') && !allText.includes('игр')) return false;
      } else {
        if (cardCat !== catGoal) return false;
      }
    }

    // 2. Deposit
    if (filterState.deposit === 'rub') {
      const dep = (item.deposit || '').toLowerCase();
      if (!dep.includes('сбп') && !dep.includes('карт') && !dep.includes('руб')) return false;
    } else if (filterState.deposit === 'crypto') {
      const dep = (item.deposit || '').toLowerCase();
      if (!dep.includes('usdt') && !dep.includes('крипт') && !dep.includes('capitalist')) return false;
    }

    // 3. Price Filter
    if (filterState.price !== 'all') {
      const p = getCardPriceNum(item);
      if (filterState.price === 'free' && p !== 0) return false;
      if (filterState.price === 'under1000' && p > 1000) return false;
      if (filterState.price === 'under3000' && p > 3000) return false;
      if (filterState.price === 'under5000' && p > 5000) return false;
      if (filterState.price === 'from5000' && p < 5000) return false;
    }

    // 3. Verification / Documents (No Passport filter)
    if (filterState.noDocs || filterState.documents === 'no' || filterState.documents === 'no_passport') {
      let isNoDocs = false;

      if (item.nodocs !== undefined && item.nodocs !== null && String(item.nodocs).trim() !== '') {
        const ndVal = String(item.nodocs).trim().toLowerCase();
        isNoDocs = ['yes', 'da', 'да', 'true', '1'].includes(ndVal);
      } else {
        const bd = (item.badge || '').toLowerCase();
        const tg = (item.tag || '').toLowerCase();
        const cat = (item.category || '').toLowerCase();
        const bank = (item.bank || '').toLowerCase();
        const feat = (item.features || []).join(' ').toLowerCase();
        const notes = (item.details && item.details.issue_notes ? item.details.issue_notes.join(' ') : '').toLowerCase();

        isNoDocs = bd.includes('без паспорта') ||
          bd.includes('без верификации') ||
          bd.includes('0% p2p') ||
          tg.includes('без паспорта') ||
          feat.includes('без паспорт') ||
          feat.includes('без верификац') ||
          cat === 'bot' ||
          bank.includes('bot') ||
          bank.includes('telegram') ||
          notes.includes('не требуется') ||
          notes.includes('без паспорта');
      }

      if (!isNoDocs) return false;
    } else if (filterState.documents === 'yes' || filterState.documents === 'passport') {
      const bd = (item.badge || '').toLowerCase();
      const tg = (item.tag || '').toLowerCase();
      const feat = (item.features || []).join(' ').toLowerCase();
      if (bd.includes('без паспорта') || bd.includes('без верификации') || tg.includes('без паспорта') || feat.includes('без паспорт')) return false;
    }

    // 4. Payment System
    if (filterState.system === 'visa') {
      if (!item.system || !item.system.toLowerCase().includes('visa')) return false;
    } else if (filterState.system === 'mastercard') {
      if (!item.system || !item.system.toLowerCase().includes('mastercard')) return false;
    }

    // 5. Apple Pay Quick Toggle
    if (filterState.applePay) {
      let isApple = false;
      if (item.apple !== undefined && item.apple !== null && String(item.apple).trim() !== '') {
        const appleVal = String(item.apple).trim().toLowerCase();
        isApple = ['yes', 'da', 'да', 'true', '1'].includes(appleVal);
      } else {
        const bd = (item.badge || '').toLowerCase();
        const tg = (item.tag || '').toLowerCase();
        const cat = (item.category || '').toLowerCase();
        const feat = (item.features || []).join(' ').toLowerCase();
        const maintNotes = (item.details && item.details.maintenance_notes ? item.details.maintenance_notes.join(' ') : '').toLowerCase();

        isApple = bd.includes('apple') ||
          cat === 'apple' ||
          tg.includes('apple') ||
          feat.includes('apple') ||
          maintNotes.includes('apple pay');
      }
      if (!isApple) return false;
    }

    // 6. TG Bot Quick Toggle
    if (filterState.tgBot) {
      let isTgBot = false;
      if (item.tgbot !== undefined && item.tgbot !== null && String(item.tgbot).trim() !== '') {
        const tgVal = String(item.tgbot).trim().toLowerCase();
        isTgBot = ['yes', 'da', 'да', 'true', '1'].includes(tgVal);
      } else {
        const bank = (item.bank || '').toLowerCase();
        const cat = (item.category || '').toLowerCase();
        isTgBot = bank.includes('telegram') || bank.includes('тг') || bank.includes('bot') || cat === 'bot';
      }
      if (!isTgBot) return false;
    }

    // 6. Flexible Search (normalizes spaces e.g. "2990" matches "2 990 ₽")
    const qRaw = filterState.search.toLowerCase().trim();
    if (qRaw) {
      const qClean = qRaw.replace(/\s+/g, '');
      const searchTarget = [
        item.name,
        item.subtitle,
        item.bank,
        item.tag,
        item.badge,
        item.deposit,
        item.fee,
        item.issue_fee,
        ...(item.features || [])
      ].map(v => (v || '').toLowerCase().replace(/\s+/g, '')).join(' ');

      if (!searchTarget.includes(qClean)) return false;
    }

    return true;
  }

  // Group cards into families (parent + children)
  const parentCards = allServices.filter(item => !item.parentId);
  const childCardsMap = {};
  allServices.forEach(item => {
    if (item.parentId) {
      if (!childCardsMap[item.parentId]) childCardsMap[item.parentId] = [];
      childCardsMap[item.parentId].push(item);
    }
  });

  const visibleFamilies = [];
  let totalVisibleCount = 0;

  parentCards.forEach(parent => {
    const children = childCardsMap[parent.id] || [];
    const allFamily = [parent, ...children];
    const matchingMembers = isAnyFilterActive
      ? allFamily.filter(item => matchesFilter(item))
      : allFamily;

    if (matchingMembers.length > 0) {
      totalVisibleCount += matchingMembers.length;

      // Sort matching members within the family according to current sort state
      if (filterState.sort === 'price-asc') {
        matchingMembers.sort((a, b) => getCardPriceNum(a) - getCardPriceNum(b));
      } else if (filterState.sort === 'price-desc') {
        matchingMembers.sort((a, b) => getCardPriceNum(b) - getCardPriceNum(a));
      }

      // Pick the primary card to represent the family
      let primaryCard;
      if (filterState.sort === 'price-asc' || filterState.sort === 'price-desc') {
        primaryCard = matchingMembers[0];
      } else {
        primaryCard = matchingMembers.find(m => m.id === parent.id) || matchingMembers[0];
      }

      // Sub-offers are the remaining matching members
      const subCards = matchingMembers.filter(m => m.id !== primaryCard.id);

      visibleFamilies.push({
        primaryCard,
        subCards,
        rating: parseFloat(primaryCard.rating || 0),
        reviews_count: parseInt(primaryCard.reviews_count || 0)
      });
    }
  });

  // Sort Families
  if (filterState.sort === 'rating') {
    visibleFamilies.sort((a, b) => b.rating - a.rating);
  } else if (filterState.sort === 'reviews') {
    visibleFamilies.sort((a, b) => b.reviews_count - a.reviews_count);
  } else if (filterState.sort === 'price-asc') {
    visibleFamilies.sort((a, b) => getCardPriceNum(a.primaryCard) - getCardPriceNum(b.primaryCard));
  } else if (filterState.sort === 'price-desc') {
    visibleFamilies.sort((a, b) => getCardPriceNum(b.primaryCard) - getCardPriceNum(a.primaryCard));
  }

  if (countEl) {
    countEl.textContent = `Найдено: ${formatCardsCount(totalVisibleCount)}`;
  }

  if (visibleFamilies.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-2xl border border-[#E2E4E9] p-12 text-center shadow-xs">
        <div class="text-4xl mb-3">🔍</div>
        <h3 class="text-lg font-bold text-[#121629] mb-1">Карт по вашему запросу не найдено</h3>
        <p class="text-sm text-zinc-500 max-w-sm mx-auto">Попробуйте ослабить фильтры или сбросить параметры поиска</p>
      </div>
    `;
    return;
  }

  // Render parent cards and their sub-offers (keep sub-offers neatly collapsed by default)
  container.innerHTML = visibleFamilies.map(fam => {
    return renderCardHTML(fam.primaryCard, false, fam.subCards, false);
  }).join('');
}

// Close all open custom dropdown menus
function closeAllDropdowns() {
  document.querySelectorAll('.custom-dropdown-menu').forEach(menu => {
    menu.classList.remove('open', 'align-right');
    menu.style.top = '-9999px';
    menu.style.left = '-9999px';
  });
  document.querySelectorAll('.chip-select-btn.is-open').forEach(btn => {
    btn.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  });
}

// Transform native select elements into custom site popover dropdowns
function setupCustomDropdowns() {
  const selectWrappers = document.querySelectorAll('.chip-select-wrapper');

  selectWrappers.forEach(wrapper => {
    const select = wrapper.querySelector('select.chip-select');
    if (!select) return;

    if (wrapper.querySelector('.chip-select-btn')) return;

    // Remove static arrow SVG if present
    const staticArrow = wrapper.querySelector('.chip-arrow');
    if (staticArrow) staticArrow.remove();

    // Hide native select element
    select.classList.add('hidden');
    select.style.display = 'none';

    // Create custom trigger button
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chip-select-btn';
    btn.id = `btn-${select.id}`;
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-haspopup', 'listbox');

    const labelSpan = document.createElement('span');
    labelSpan.className = 'chip-select-label';
    const selectedOpt = select.options[select.selectedIndex] || select.options[0];
    labelSpan.textContent = selectedOpt ? selectedOpt.text : '';

    const arrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arrowSvg.setAttribute('class', 'chip-arrow w-4 h-4 text-zinc-500 pointer-events-none');
    arrowSvg.setAttribute('fill', 'none');
    arrowSvg.setAttribute('stroke', 'currentColor');
    arrowSvg.setAttribute('viewBox', '0 0 24 24');
    arrowSvg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>';

    btn.appendChild(labelSpan);
    btn.appendChild(arrowSvg);

    // Create custom popover dropdown menu
    const menu = document.createElement('div');
    menu.className = 'custom-dropdown-menu is-fixed';
    menu.id = `menu-${select.id}`;
    menu.setAttribute('role', 'listbox');
    menu.style.position = 'fixed';
    menu.style.zIndex = '999999';

    Array.from(select.options).forEach(opt => {
      const itemBtn = document.createElement('button');
      itemBtn.type = 'button';
      itemBtn.className = `custom-dropdown-item ${opt.selected ? 'selected' : ''}`;
      itemBtn.dataset.value = opt.value;

      const itemText = document.createElement('span');
      itemText.textContent = opt.text;

      const checkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      checkSvg.setAttribute('class', 'check-icon w-4 h-4 text-[#0084FF]');
      checkSvg.setAttribute('fill', 'none');
      checkSvg.setAttribute('stroke', 'currentColor');
      checkSvg.setAttribute('viewBox', '0 0 24 24');
      checkSvg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>';

      itemBtn.appendChild(itemText);
      itemBtn.appendChild(checkSvg);

      itemBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        select.value = opt.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        closeAllDropdowns();
      });

      menu.appendChild(itemBtn);
    });

    // Append button to wrapper, append menu directly to body to avoid overflow clipping
    wrapper.appendChild(btn);
    document.body.appendChild(menu);

    // Click handler for trigger button
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) {
        const btnRect = btn.getBoundingClientRect();
        menu.style.top = `${btnRect.bottom + 6}px`;
        menu.style.minWidth = `${Math.round(btnRect.width)}px`;
        menu.style.width = 'max-content';
        menu.style.maxWidth = `${Math.min(280, window.innerWidth - 32)}px`;

        menu.classList.add('open');
        btn.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');

        const menuRect = menu.getBoundingClientRect();
        let leftPos = btnRect.left;
        if (leftPos + menuRect.width > window.innerWidth - 16) {
          leftPos = Math.max(16, window.innerWidth - menuRect.width - 16);
        }
        menu.style.left = `${leftPos}px`;
      }
    });
  });

  // Global listeners to close dropdowns
  document.removeEventListener('click', closeAllDropdowns);
  document.addEventListener('click', closeAllDropdowns);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDropdowns();
    }
  });

  // Close on window resize or scroll
  window.removeEventListener('resize', closeAllDropdowns);
  window.addEventListener('resize', closeAllDropdowns);

  window.removeEventListener('scroll', closeAllDropdowns, true);
  window.addEventListener('scroll', closeAllDropdowns, true);
}

// Synchronize custom dropdown state with native select state
function syncCustomSelects() {
  const selectWrappers = document.querySelectorAll('.chip-select-wrapper');

  selectWrappers.forEach(wrapper => {
    const select = wrapper.querySelector('select.chip-select');
    const btn = wrapper.querySelector('.chip-select-btn');
    const menu = wrapper.querySelector('.custom-dropdown-menu');

    if (!select || !btn || !menu) return;

    const selectedOption = select.options[select.selectedIndex];
    if (selectedOption) {
      const labelSpan = btn.querySelector('.chip-select-label');
      if (labelSpan) labelSpan.textContent = selectedOption.text;
    }

    // Toggle active-filter class on button
    const isDefault = (select.value === 'all' || select.value === 'popular');
    btn.classList.toggle('active-filter', !isDefault);

    // Update selected class on menu options
    menu.querySelectorAll('.custom-dropdown-item').forEach(item => {
      const isSelected = item.dataset.value === select.value;
      item.classList.toggle('selected', isSelected);
    });
  });
}

// Update Active Filter UI Styling
function updateFilterStyles() {
  const categorySelect = document.getElementById('filter-category');
  const depositSelect = document.getElementById('filter-deposit');
  const priceSelect = document.getElementById('filter-price');
  const noDocsBtn = document.getElementById('filter-nodocs');
  const docsSelect = document.getElementById('filter-documents');
  const systemSelect = document.getElementById('filter-system');
  const sortSelect = document.getElementById('filter-sort');
  const applePayBtn = document.getElementById('filter-applepay');
  const tgBotBtn = document.getElementById('filter-tgbot');

  if (categorySelect) categorySelect.classList.toggle('active-filter', filterState.category !== 'all');
  if (depositSelect) depositSelect.classList.toggle('active-filter', filterState.deposit !== 'all');
  if (priceSelect) priceSelect.classList.toggle('active-filter', filterState.price !== 'all');
  if (noDocsBtn) noDocsBtn.classList.toggle('active', filterState.noDocs);
  if (docsSelect) docsSelect.classList.toggle('active-filter', filterState.documents !== 'all');
  if (systemSelect) systemSelect.classList.toggle('active-filter', filterState.system !== 'all');
  if (sortSelect) sortSelect.classList.toggle('active-filter', filterState.sort !== 'popular');
  if (applePayBtn) applePayBtn.classList.toggle('active', filterState.applePay);
  if (tgBotBtn) tgBotBtn.classList.toggle('active', filterState.tgBot);

  syncCustomSelects();
}

// Reset all filters
function resetAllFilters() {
  filterState.category = 'all';
  filterState.deposit = 'all';
  filterState.price = 'all';
  filterState.documents = 'all';
  filterState.noDocs = false;
  filterState.system = 'all';
  filterState.sort = 'popular';
  filterState.applePay = false;
  filterState.tgBot = false;
  filterState.search = '';

  const categorySelect = document.getElementById('filter-category');
  const depositSelect = document.getElementById('filter-deposit');
  const priceSelect = document.getElementById('filter-price');
  const docsSelect = document.getElementById('filter-documents');
  const systemSelect = document.getElementById('filter-system');
  const sortSelect = document.getElementById('filter-sort');
  const searchInput = document.getElementById('search-input');

  if (categorySelect) categorySelect.value = 'all';
  if (depositSelect) depositSelect.value = 'all';
  if (priceSelect) priceSelect.value = 'all';
  if (docsSelect) docsSelect.value = 'all';
  if (systemSelect) systemSelect.value = 'all';
  if (sortSelect) sortSelect.value = 'popular';
  if (searchInput) searchInput.value = '';

  updateFilterStyles();
  renderCards();
}

// Initialize App & Event Handlers
function initApp() {
  setupCustomDropdowns();

  const categorySelect = document.getElementById('filter-category');
  const depositSelect = document.getElementById('filter-deposit');
  const noDocsBtn = document.getElementById('filter-nodocs');
  const docsSelect = document.getElementById('filter-documents');
  const systemSelect = document.getElementById('filter-system');
  const sortSelect = document.getElementById('filter-sort');
  const applePayBtn = document.getElementById('filter-applepay');
  const tgBotBtn = document.getElementById('filter-tgbot');
  const resetBtn = document.getElementById('reset-filters-btn');
  const searchInput = document.getElementById('search-input');

  if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
      filterState.category = e.target.value;
      updateFilterStyles();
      renderCards();
    });
  }

  if (depositSelect) {
    depositSelect.addEventListener('change', (e) => {
      filterState.deposit = e.target.value;
      updateFilterStyles();
      renderCards();
    });
  }

  const priceSelect = document.getElementById('filter-price');
  if (priceSelect) {
    priceSelect.addEventListener('change', (e) => {
      filterState.price = e.target.value;
      updateFilterStyles();
      renderCards();
    });
  }

  if (noDocsBtn) {
    noDocsBtn.addEventListener('click', () => {
      filterState.noDocs = !filterState.noDocs;
      updateFilterStyles();
      renderCards();
    });
  }

  if (docsSelect) {
    docsSelect.addEventListener('change', (e) => {
      filterState.documents = e.target.value;
      updateFilterStyles();
      renderCards();
    });
  }

  if (systemSelect) {
    systemSelect.addEventListener('change', (e) => {
      filterState.system = e.target.value;
      updateFilterStyles();
      renderCards();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      filterState.sort = e.target.value;
      updateFilterStyles();
      renderCards();
    });
  }

  if (applePayBtn) {
    applePayBtn.addEventListener('click', () => {
      filterState.applePay = !filterState.applePay;
      updateFilterStyles();
      renderCards();
    });
  }

  if (tgBotBtn) {
    tgBotBtn.addEventListener('click', () => {
      filterState.tgBot = !filterState.tgBot;
      updateFilterStyles();
      renderCards();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetAllFilters();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterState.search = e.target.value;
      renderCards();
    });
  }

  fetchSheetData();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// ==========================================================================
// Calculator State & Logic
// ==========================================================================
const ratesState = {
  USD: null,
  EUR: null,
  source: 'Google Sheets',
  lastUpdated: null,
  isLoading: false,
  isFetched: false
};

const calcState = {
  currency: 'USD',
  amount: 20,
  rate: 0,
  selectedCardId: null
};

window.openCalculatorModal = function (selectedCardId = null) {
  const modal = document.getElementById('calc-modal');
  if (!modal) return;

  calcState.selectedCardId = selectedCardId;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  updateCalculatorResults();
};

window.closeCalculatorModal = function () {
  const modal = document.getElementById('calc-modal');
  if (!modal) return;

  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

window.setCalcPreset = function (amount, currency) {
  calcState.amount = amount;
  calcState.currency = currency;

  const amountInput = document.getElementById('calc-amount-input');
  if (amountInput) amountInput.value = amount;

  setCalcCurrency(currency);

  document.querySelectorAll('.calc-preset-btn').forEach(btn => {
    const btnAmt = parseFloat(btn.getAttribute('data-amount'));
    if (Math.abs(btnAmt - amount) < 0.01) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  updateCalculatorResults();
};

window.setCalcCurrency = function (curr) {
  calcState.currency = curr;
  const usdBtn = document.getElementById('calc-curr-usd');
  const eurBtn = document.getElementById('calc-curr-eur');
  const rateSymbol = document.getElementById('calc-rate-symbol');

  if (curr === 'USD') {
    if (usdBtn) { usdBtn.classList.add('bg-[#121629]', 'text-white'); usdBtn.classList.remove('text-zinc-500'); }
    if (eurBtn) { eurBtn.classList.remove('bg-[#121629]', 'text-white'); eurBtn.classList.add('text-zinc-500'); }
    if (rateSymbol) rateSymbol.textContent = '$';
  } else {
    if (eurBtn) { eurBtn.classList.add('bg-[#121629]', 'text-white'); eurBtn.classList.remove('text-zinc-500'); }
    if (usdBtn) { usdBtn.classList.remove('bg-[#121629]', 'text-white'); usdBtn.classList.add('text-zinc-500'); }
    if (rateSymbol) rateSymbol.textContent = '€';
  }

  onCalcInputChange();
};

window.onCalcInputChange = function () {
  const amountInput = document.getElementById('calc-amount-input');
  const rateInput = document.getElementById('calc-rate-input');

  if (amountInput) calcState.amount = parseFloat(amountInput.value) || 0;
  if (rateInput) {
    const rawVal = (rateInput.value || '').toString().replace(',', '.').trim();
    calcState.rate = parseFloat(rawVal) || 0;
  }

  updateCalculatorResults();
};

window.updateCalculatorResults = function () {
  const container = document.getElementById('calc-results-list');
  if (!container) return;

  const amount = calcState.amount;
  const rate = calcState.rate;

  if (!allServices || allServices.length === 0) {
    container.innerHTML = `<div class="p-4 text-center text-xs text-zinc-400">Нет данных для расчета</div>`;
    return;
  }

  // Compute total for each card
  const calculatedCards = allServices.map(card => {
    // Get card-specific exchange rate (with comma support e.g. "95,5") or fallback to global input rate / ratesState
    let cardRate = 0;
    let isServiceRate = false;

    if (rate > 0) {
      // User typed a manual rate override
      cardRate = rate;
      isServiceRate = false;
    } else {
      // Input field is empty ("Курс сервиса") - use card's service rate from Google Sheets
      if (calcState.currency === 'USD' && card.rate_usd) {
        const parsed = parseFloatWithComma(card.rate_usd);
        if (parsed) { cardRate = parsed; isServiceRate = true; }
      } else if (calcState.currency === 'EUR' && card.rate_eur) {
        const parsed = parseFloatWithComma(card.rate_eur);
        if (parsed) { cardRate = parsed; isServiceRate = true; }
      }

      if (!cardRate || cardRate === 0) {
        const globalRateStr = calcState.currency === 'USD' ? ratesState.USD : ratesState.EUR;
        cardRate = parseFloatWithComma(globalRateStr) || (calcState.currency === 'USD' ? 92.5 : 100.5);
        isServiceRate = true;
      }
    }

    const issueFeeRub = getCardPriceNum(card, cardRate);

    // Top-up & transaction fee estimate (from comsa column or fallbacks)
    let topupFeePercent = 0.035;
    let fixedFee = 0.25;

    const parsedComsa = parseComsa(card.comsa);
    if (parsedComsa) {
      topupFeePercent = parsedComsa.topup_fee_percent;
      fixedFee = parsedComsa.fixed_tx_fee;
    } else {
      if (card.topup_fee_percent !== undefined && card.topup_fee_percent !== '' && card.topup_fee_percent !== null) {
        const rawVal = parseFloat(String(card.topup_fee_percent).replace(',', '.'));
        if (!isNaN(rawVal)) {
          topupFeePercent = rawVal > 1 ? rawVal / 100 : rawVal;
        }
      }
      if (card.fixed_tx_fee !== undefined && card.fixed_tx_fee !== '' && card.fixed_tx_fee !== null) {
        const rawFixed = parseFloat(String(card.fixed_tx_fee).replace(',', '.'));
        if (!isNaN(rawFixed)) {
          fixedFee = rawFixed;
        }
      }
    }

    if (topupFeePercent > 1) {
      topupFeePercent = topupFeePercent / 100;
    }

    const baseRub = amount * cardRate;
    const topupFeeRub = Math.round(baseRub * topupFeePercent + (fixedFee * cardRate));
    const firstMonthTotalRub = Math.round(baseRub + topupFeeRub + issueFeeRub);
    const nextMonthsTotalRub = Math.round(baseRub + topupFeeRub);

    return {
      card,
      cardRate,
      isServiceRate,
      issueFeeRub,
      topupFeeRub,
      baseRub: Math.round(baseRub),
      firstMonthTotalRub,
      nextMonthsTotalRub
    };
  });

  // Sort by first month total ascending (cheapest first)
  calculatedCards.sort((a, b) => a.firstMonthTotalRub - b.firstMonthTotalRub);

  const minTotal = calculatedCards.length > 0 ? calculatedCards[0].firstMonthTotalRub : 0;

  container.innerHTML = calculatedCards.map(item => {
    const isSelected = calcState.selectedCardId && (item.card.id === calcState.selectedCardId);
    const isCheapest = item.firstMonthTotalRub === minTotal;

    return `
      <div class="calc-card-item ${isSelected ? 'selected-card' : ''}">
        <div class="flex items-center gap-3 min-w-0 flex-1">
          ${item.card.image ? `
            <img src="${item.card.image}" alt="${item.card.name}" class="w-11 h-7 object-cover rounded-md border border-black/10 shrink-0" />
          ` : `
            <div class="w-11 h-7 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              ${item.card.emoji || '💳'}
            </div>
          `}
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="font-bold text-xs sm:text-sm text-[#121629] truncate">${item.card.name}</span>
              ${isCheapest ? `<span class="calc-badge-cheapest">🔥 Выгодно</span>` : ''}
              ${isSelected ? `<span class="text-[10px] font-bold text-[#0052FF] bg-[#EEF4FF] px-2 py-0.5 rounded">Выбранная карта</span>` : ''}
            </div>
            <div class="text-[11px] text-zinc-500 font-medium truncate mt-0.5">
              Курс: <span class="font-semibold text-zinc-700">${item.cardRate} ₽</span> • Покупка: ${item.baseRub.toLocaleString('ru-RU')} ₽ + Ком-са: ${item.topupFeeRub.toLocaleString('ru-RU')} ₽
              ${item.issueFeeRub > 0 ? ` + Выпуск: ${item.issueFeeRub.toLocaleString('ru-RU')} ₽` : ' (Выпуск 0 ₽)'}
            </div>
          </div>
        </div>

        <div class="text-right shrink-0">
          <div class="text-sm sm:text-base font-extrabold text-[#0052FF]">
            ${item.firstMonthTotalRub.toLocaleString('ru-RU')} ₽
          </div>
          <div class="text-[10px] text-zinc-400 font-medium">
            со 2-го мес: ${item.nextMonthsTotalRub.toLocaleString('ru-RU')} ₽
          </div>
        </div>
      </div>
    `;
  }).join('');
};
