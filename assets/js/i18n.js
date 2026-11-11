/* ==========================================================================
   Athens View Maldives – language switcher (English · Русский · Italiano · Deutsch · 中文)

   How it works: the pages are written in English. This file swaps any piece of text whose exact English wording
   is listed in the table below, including text the scripts add later (room cards, booking summary…).
   Text that is not in the table simply stays in English – so you can add translations gradually.

   TO ADD / FIX A TRANSLATION: add or edit a row  [ "English text exactly as on the page", ru, it, de, zh ].
   NOTE: these translations were written by an AI assistant – please have a native speaker review them.
   ========================================================================== */
(function () {
  'use strict';
  var AV = window.AV || (window.AV = {});

  var LANGS = [['en', 'English', 'en-GB'], ['ru', 'Русский', 'ru-RU'], ['it', 'Italiano', 'it-IT'], ['de', 'Deutsch', 'de-DE'], ['zh', '中文', 'zh-CN']];
  var COL = { ru: 1, it: 2, de: 3, zh: 4 };

  /*  English | Русский | Italiano | Deutsch | 中文  */
  var T = [
    /* header, footer, shared */
    ["Skip to content", "Перейти к содержанию", "Vai al contenuto", "Zum Inhalt springen", "跳到主要内容"],
    ["Home", "Главная", "Home", "Startseite", "首页"],
    ["Rooms", "Номера", "Camere", "Zimmer", "客房"],
    ["Excursions", "Экскурсии", "Escursioni", "Ausflüge", "海岛游览"],
    ["Dining & Terrace", "Ресторан и терраса", "Ristorante e terrazza", "Restaurant & Terrasse", "餐饮与露台"],
    ["Location", "Как добраться", "Dove siamo", "Lage", "位置"],
    ["Contact", "Контакты", "Contatti", "Kontakt", "联系我们"],
    ["Book Your Stay", "Забронировать", "Prenota il soggiorno", "Jetzt buchen", "立即预订"],
    ["Book your stay", "Забронировать", "Prenota il soggiorno", "Jetzt buchen", "立即预订"],
    ["Book", "Бронь", "Prenota", "Buchen", "预订"],
    ["Book Now", "Забронировать", "Prenota ora", "Jetzt buchen", "立即预订"],
    ["WhatsApp Inquiry", "Запрос в WhatsApp", "Scrivici su WhatsApp", "WhatsApp-Anfrage", "WhatsApp 咨询"],
    ["WhatsApp", "WhatsApp", "WhatsApp", "WhatsApp", "WhatsApp"],
    ["WhatsApp Direct", "WhatsApp напрямую", "WhatsApp diretto", "WhatsApp direkt", "WhatsApp 直连"],
    ["WhatsApp us", "Напишите в WhatsApp", "Scrivici su WhatsApp", "Schreiben Sie uns per WhatsApp", "通过 WhatsApp 联系我们"],
    ["Island Address", "Адрес на острове", "Indirizzo sull’isola", "Adresse auf der Insel", "岛上地址"],
    ["Direct Inquiries", "Прямые запросы", "Richieste dirette", "Direktanfragen", "直接咨询"],
    ["(Reception)", "(ресепшн)", "(reception)", "(Rezeption)", "（前台）"],
    ["Island Chronicle", "Островной вестник", "Cronaca dell’isola", "Inselbrief", "海岛通讯"],
    ["Join", "Подписаться", "Iscriviti", "Anmelden", "订阅"],
    ["Your email address", "Ваш e-mail", "Il tuo indirizzo e-mail", "Ihre E-Mail-Adresse", "您的电子邮箱"],
    ["Privacy Policy", "Политика конфиденциальности", "Informativa sulla privacy", "Datenschutz", "隐私政策"],
    ["Transfer Info", "Информация о трансфере", "Info trasferimenti", "Transfer-Infos", "接送信息"],
    ["Guest FAQ", "Вопросы гостей", "FAQ per gli ospiti", "Gäste-FAQ", "住客常见问题"],
    ["35 min speedboat from Velana Int’l", "35 минут на скоростном катере от аэропорта Велана", "35 min in motoscafo da Velana Int’l", "35 Min. Speedboat ab Velana Int’l", "距 Velana 国际机场快艇约 35 分钟"],
    ["Athens View Maldives. Handcrafted island hospitality in K. Guraidhoo.", "Athens View Maldives. Островное гостеприимство ручной работы на о. Гурайду.", "Athens View Maldives. Ospitalità artigianale a K. Guraidhoo.", "Athens View Maldives. Handgemachte Inselgastfreundschaft auf K. Guraidhoo.", "Athens View Maldives。古莱杜岛上用心打造的海岛待客之道。"],
    ["A refined coastal sanctuary in K. Guraidhoo, Kaafu Atoll. Modern barefoot luxury harmonized with authentic Maldivian hospitality.", "Изысканное прибрежное убежище на о. Гурайду, атолл Каафу. Современная роскошь босиком и настоящее мальдивское гостеприимство.", "Un raffinato rifugio sul mare a K. Guraidhoo, atollo di Kaafu. Lusso moderno a piedi nudi e autentica ospitalità maldiviana.", "Ein stilvolles Küstenrefugium auf K. Guraidhoo im Kaafu-Atoll. Moderner Barfuß-Luxus trifft echte maledivische Gastfreundschaft.", "位于 Kaafu 环礁古莱杜岛的精致海滨度假屋。现代赤足奢华，融合地道的马尔代夫待客之道。"],
    ["Follow our feed", "Наш Instagram", "Seguici su Instagram", "Folgen Sie uns", "关注我们的动态"],
    ["Island Chronicles", "Хроники острова", "Cronache dell’isola", "Inselchronik", "海岛纪事"],
    ["Frequently asked questions", "Частые вопросы", "Domande frequenti", "Häufige Fragen", "常见问题"],

    /* home */
    ["Boutique Sanctuary • K. Guraidhoo", "Бутик-отель • о. Гурайду", "Rifugio boutique • K. Guraidhoo", "Boutique-Refugium • K. Guraidhoo", "精品度假屋 • 古莱杜岛"],
    ["Experience Paradise at", "Райский отдых в", "Il paradiso ti aspetta a", "Erleben Sie das Paradies im", "体验天堂般的"],
    ["Explore Rooms", "Смотреть номера", "Scopri le camere", "Zimmer ansehen", "浏览客房"],
    ["View Excursions", "Смотреть экскурсии", "Vedi le escursioni", "Ausflüge ansehen", "查看游览"],
    ["Loved by island travellers", "Любимо путешественниками", "Amato dai viaggiatori", "Beliebt bei Inselreisenden", "深受岛屿旅客喜爱"],
    ["Check-in", "Заезд", "Check-in", "Anreise", "入住"],
    ["Check-out", "Выезд", "Check-out", "Abreise", "退房"],
    ["Guests", "Гости", "Ospiti", "Gäste", "住客"],
    ["Room", "Номер", "Camera", "Zimmer", "房型"],
    ["All Rooms", "Все номера", "Tutte le camere", "Alle Zimmer", "全部客房"],
    ["Check Rates", "Узнать цены", "Verifica le tariffe", "Preise prüfen", "查看房价"],
    ["Best Rate Guarantee", "Гарантия лучшей цены", "Miglior tariffa garantita", "Bestpreisgarantie", "最优价格保证"],
    ["Direct Speedboat Transfers", "Прямой трансфер на скоростном катере", "Trasferimento diretto in motoscafo", "Direkter Speedboat-Transfer", "快艇直达接送"],
    ["Zero Booking Fees", "Без комиссии за бронирование", "Nessuna commissione di prenotazione", "Keine Buchungsgebühren", "零预订费"],
    ["Guest Rating", "Оценка гостей", "Valutazione degli ospiti", "Gästebewertung", "住客评分"],
    ["Why Athens View", "Почему Athens View", "Perché Athens View", "Warum Athens View", "为什么选择 Athens View"],
    ["Authentic Warmth, Elevated Comfort", "Искренняя теплота, высокий комфорт", "Calore autentico, comfort elevato", "Echte Herzlichkeit, gehobener Komfort", "真挚热情，品质舒适"],
    ["Curated Rooms & Suites", "Тщательно подобранные номера и сюиты", "Camere e suite selezionate", "Ausgewählte Zimmer & Suiten", "精选客房与套房"],
    ["Signature Island Excursions", "Фирменные экскурсии по островам", "Escursioni esclusive tra le isole", "Unsere Insel-Ausflüge", "特色海岛游览"],
    ["Rooftop Ocean Terrace & Dining", "Терраса на крыше с видом на океан и ресторан", "Terrazza sul tetto con vista oceano e ristorante", "Dachterrasse mit Meerblick & Restaurant", "屋顶海景露台与餐厅"],
    ["Guest Facilities & Services", "Удобства и услуги для гостей", "Servizi e strutture per gli ospiti", "Gästeservice & Ausstattung", "宾客设施与服务"],
    ["Guest facilities & services", "Удобства и услуги для гостей", "Servizi e strutture per gli ospiti", "Gästeservice & Ausstattung", "宾客设施与服务"],
    ["Guest reviews", "Отзывы гостей", "Recensioni degli ospiti", "Gästebewertungen", "住客评价"],
    ["What our guests say", "Что говорят наши гости", "Cosa dicono i nostri ospiti", "Das sagen unsere Gäste", "住客怎么说"],
    ["Packages", "Пакеты", "Pacchetti", "Pakete", "优惠套餐"],
    ["Stay + explore, one price", "Проживание + экскурсии по одной цене", "Soggiorno + esplorazione, un unico prezzo", "Übernachten + entdecken zu einem Preis", "住宿加游览，一价全包"],
    ["Choose this package", "Выбрать этот пакет", "Scegli questo pacchetto", "Dieses Paket wählen", "选择此套餐"],
    ["Island Escape", "Островной побег", "Fuga sull’isola", "Insel-Auszeit", "海岛逃离"],
    ["The perfect first taste of Guraidhoo.", "Идеальное первое знакомство с Гурайду.", "Il primo assaggio perfetto di Guraidhoo.", "Der perfekte erste Eindruck von Guraidhoo.", "初识古莱杜岛的完美之选。"],
    ["Sunset Romance", "Романтика заката", "Romanticismo al tramonto", "Romantik bei Sonnenuntergang", "日落浪漫之旅"],
    ["Two nights, one golden-hour dhoni cruise.", "Две ночи и одна круиз на дони в золотой час.", "Due notti e una crociera in dhoni all’ora d’oro.", "Zwei Nächte und eine Dhoni-Fahrt zur goldenen Stunde.", "两晚住宿，加一次黄金时刻的传统帆船出海。"],
    ["Family Adventure", "Семейное приключение", "Avventura in famiglia", "Familienabenteuer", "家庭探险"],
    ["Space for four, sandbank picnic and sharks.", "Место для четверых, пикник на песчаной косе и акулы.", "Spazio per quattro, picnic sulla sandbank e squali.", "Platz für vier, Sandbank-Picknick und Haie.", "四人空间、沙洲野餐与鲨鱼同游。"],
    ["Round-trip speedboat transfer", "Трансфер на скоростном катере туда и обратно", "Trasferimento in motoscafo andata e ritorno", "Speedboat-Transfer hin und zurück", "往返快艇接送"],

    /* rooms & excursions */
    ["Deluxe Ocean View Double", "Делюкс с видом на океан (двухместный)", "Doppia Deluxe vista oceano", "Deluxe-Doppelzimmer mit Meerblick", "豪华海景双人房"],
    ["Deluxe Ocean Double", "Делюкс с видом на океан", "Doppia Deluxe vista oceano", "Deluxe-Doppelzimmer Meerblick", "豪华海景双人房"],
    ["Family Island Suite", "Семейный островной люкс", "Suite Family Island", "Familien-Inselsuite", "家庭海岛套房"],
    ["Room Details", "О номере", "Dettagli camera", "Zimmerdetails", "客房详情"],
    ["Book This Room", "Забронировать номер", "Prenota questa camera", "Dieses Zimmer buchen", "预订此房型"],
    ["Ask on WhatsApp", "Спросить в WhatsApp", "Chiedi su WhatsApp", "Per WhatsApp fragen", "通过 WhatsApp 咨询"],
    ["Add to My Booking", "Добавить к бронированию", "Aggiungi alla prenotazione", "Zur Buchung hinzufügen", "加入我的预订"],
    ["What's included", "Что включено", "Cosa è incluso", "Inklusive", "包含内容"],
    ["Most Popular", "Самый популярный", "Il più popolare", "Am beliebtesten", "最受欢迎"],
    ["Spacious Comfort", "Простор и комфорт", "Comfort spazioso", "Großzügiger Komfort", "宽敞舒适"],
    ["Peak season", "Пиковый сезон", "Altissima stagione", "Hochsaison (Spitze)", "旺季高峰"],
    ["High season", "Высокий сезон", "Alta stagione", "Hauptsaison", "旺季"],
    ["Green season", "Зелёный сезон", "Stagione verde", "Grüne Saison", "绿色淡季"],
    ["from", "от", "da", "ab", "低至"],
    ["/ night", "/ ночь", "/ notte", "/ Nacht", "/ 晚"],
    ["/ person", "/ чел.", "/ persona", "/ Person", "/ 人"],
    ["Not available for these dates – try other dates or the other room.", "На эти даты мест нет – попробуйте другие даты или другой номер.", "Non disponibile per queste date – prova altre date o l’altra camera.", "Für diese Daten nicht verfügbar – bitte andere Daten oder das andere Zimmer wählen.", "所选日期已订满，请更换日期或房型。"],
    ["Unforgettable Ocean Encounters", "Незабываемые встречи с океаном", "Incontri indimenticabili con l’oceano", "Unvergessliche Begegnungen mit dem Ozean", "难忘的海洋邂逅"],
    ["All Excursions", "Все экскурсии", "Tutte le escursioni", "Alle Ausflüge", "全部游览"],
    ["Snorkeling", "Снорклинг", "Snorkeling", "Schnorcheln", "浮潜"],
    ["Diving", "Дайвинг", "Immersioni", "Tauchen", "潜水"],
    ["Cruises", "Круизы", "Crociere", "Kreuzfahrten", "出海游船"],
    ["Sandbank", "Песчаная коса", "Sandbank", "Sandbank", "沙洲"],
    ["Nurse Shark Snorkeling", "Снорклинг с нянечными акулами", "Snorkeling con gli squali nutrice", "Schnorcheln mit Ammenhaien", "与护士鲨一起浮潜"],
    ["Deserted Sandbank Picnic", "Пикник на необитаемой песчаной косе", "Picnic su una sandbank deserta", "Picknick auf einer einsamen Sandbank", "无人沙洲野餐"],
    ["Shipwreck Exploration", "Исследование затонувшего корабля", "Esplorazione del relitto", "Schiffswrack-Erkundung", "沉船探秘"],
    ["Sunset Dolphin Cruise", "Закатный круиз с дельфинами", "Crociera al tramonto con i delfini", "Delfin-Kreuzfahrt zum Sonnenuntergang", "日落海豚之旅"],
    ["Turtle Reef Snorkeling", "Снорклинг с черепахами на рифе", "Snorkeling sul reef con le tartarughe", "Schnorcheln am Schildkrötenriff", "海龟礁浮潜"],
    ["Little luxuries, island style", "Маленькие радости в островном стиле", "Piccoli lussi in stile isola", "Kleine Extras im Inselstil", "小小奢华，海岛风情"],
    ["Every stay includes", "В каждое проживание входит", "Ogni soggiorno include", "Jeder Aufenthalt beinhaltet", "每次入住均包含"],
    ["All rates include breakfast, tax & green fee", "Во все цены включены завтрак, налоги и экосбор", "Tutte le tariffe includono colazione, tasse e green tax", "Alle Preise inkl. Frühstück, Steuern und Green Fee", "所有房价含早餐、税费及绿色税"],
    ["Free Snorkel Gear & Paddleboards", "Бесплатное снаряжение для снорклинга и сапборды", "Attrezzatura da snorkeling e paddleboard gratuite", "Kostenlose Schnorchelausrüstung & Paddleboards", "免费浮潜装备与桨板"],

    /* dining */
    ["Dine above the lagoon", "Ужин над лагуной", "Cena sopra la laguna", "Dinieren über der Lagune", "在潟湖之上用餐"],
    ["Reserve a terrace table", "Забронировать столик на террасе", "Prenota un tavolo in terrazza", "Terrassentisch reservieren", "预订露台餐位"],
    ["Menu highlights", "Лучшее из меню", "Piatti in evidenza", "Menü-Highlights", "招牌菜单"],
    ["From the kitchen", "С нашей кухни", "Dalla cucina", "Aus der Küche", "来自厨房"],
    ["Date", "Дата", "Data", "Datum", "日期"],
    ["Time", "Время", "Ora", "Uhrzeit", "时间"],
    ["Breakfast", "Завтрак", "Colazione", "Frühstück", "早餐"],
    ["Lunch", "Обед", "Pranzo", "Mittagessen", "午餐"],
    ["Sunset dinner", "Ужин на закате", "Cena al tramonto", "Abendessen bei Sonnenuntergang", "日落晚餐"],
    ["Dietary notes", "Пожелания по питанию", "Note alimentari", "Ernährungshinweise", "饮食要求"],

    /* location */
    ["Transfers", "Трансферы", "Trasferimenti", "Transfers", "接送"],
    ["Getting here in 3 steps", "Как добраться за 3 шага", "Come arrivare in 3 passi", "In 3 Schritten zu uns", "三步抵达"],
    ["Land at Velana (MLE)", "Прилёт в аэропорт Велана (MLE)", "Atterra a Velana (MLE)", "Landung in Velana (MLE)", "抵达 Velana 机场 (MLE)"],
    ["Speedboat to Guraidhoo", "Скоростной катер до Гурайду", "Motoscafo per Guraidhoo", "Speedboat nach Guraidhoo", "乘快艇前往古莱杜岛"],
    ["Walk to Athens View", "Пешком до Athens View", "A piedi fino ad Athens View", "Zu Fuß zu Athens View", "步行至 Athens View"],
    ["Find us in Guraidhoo", "Найдите нас на Гурайду", "Trovaci a Guraidhoo", "So finden Sie uns auf Guraidhoo", "在古莱杜岛找到我们"],
    ["Connect directly", "Связаться напрямую", "Contattaci direttamente", "Direkt in Kontakt treten", "直接联系"],
    ["Open in Google Maps", "Открыть в Google Maps", "Apri in Google Maps", "In Google Maps öffnen", "在谷歌地图中打开"],
    ["Plan your trip", "Планируйте поездку", "Pianifica il viaggio", "Reise planen", "规划行程"],
    ["Best time to visit", "Лучшее время для поездки", "Quando visitarci", "Beste Reisezeit", "最佳旅行时间"],
    ["Dry season · Dec – Apr", "Сухой сезон · дек – апр", "Stagione secca · dic – apr", "Trockenzeit · Dez – Apr", "旱季 · 12月 – 4月"],
    ["Sunny skies, calm seas and the clearest water for snorkelling. The busiest and most popular time, so book early.", "Солнечное небо, спокойное море и самая прозрачная вода для снорклинга. Самое популярное время – бронируйте заранее.", "Cielo sereno, mare calmo e l’acqua più limpida per lo snorkeling. È il periodo più richiesto: prenota in anticipo.", "Sonne, ruhige See und kristallklares Wasser zum Schnorcheln. Die beliebteste Zeit – bitte frühzeitig buchen.", "阳光明媚、海面平静、水质清澈，最适合浮潜。这是最热门的时段，请尽早预订。"],
    ["Green season · May – Nov", "Зелёный сезон · май – ноя", "Stagione verde · mag – nov", "Grüne Saison · Mai – Nov", "绿色淡季 · 5月 – 11月"],
    ["Warm sea, short tropical showers and a quieter island, with lower rates. Stronger swell makes it surfers’ season.", "Тёплое море, короткие тропические ливни, более спокойный остров и сниженные цены. Сильная волна – сезон сёрфинга.", "Mare caldo, brevi rovesci tropicali, un’isola più tranquilla e tariffe ridotte. Con più onda è la stagione dei surfisti.", "Warmes Meer, kurze tropische Schauer, eine ruhigere Insel und günstigere Preise. Stärkere Dünung – Saison für Surfer.", "海水温暖，偶有短暂热带阵雨，岛上更清静，房价更低。浪涌较大，正是冲浪季。"],
    ["Air °C · Sea °C · Rain per month (mm)", "Воздух °C · Море °C · Осадки за месяц (мм)", "Aria °C · Mare °C · Pioggia al mese (mm)", "Luft °C · Meer °C · Regen pro Monat (mm)", "气温 °C · 海水 °C · 月降雨量（毫米）"],
    ["Dry season", "Сухой сезон", "Stagione secca", "Trockenzeit", "旱季"],
    ["Approximate long-term averages for the Kaafu Atoll – conditions vary from year to year.", "Приблизительные многолетние данные для атолла Каафу – погода меняется от года к году.", "Medie approssimative a lungo termine per l’atollo di Kaafu – le condizioni variano di anno in anno.", "Ungefähre langjährige Mittelwerte für das Kaafu-Atoll – die Bedingungen variieren von Jahr zu Jahr.", "Kaafu 环礁的长期平均数据（约数），各年情况会有所不同。"],
    ["Jan", "Янв", "Gen", "Jan", "1月"], ["Feb", "Фев", "Feb", "Feb", "2月"], ["Mar", "Мар", "Mar", "Mär", "3月"], ["Apr", "Апр", "Apr", "Apr", "4月"],
    ["May", "Май", "Mag", "Mai", "5月"], ["Jun", "Июн", "Giu", "Jun", "6月"], ["Jul", "Июл", "Lug", "Jul", "7月"], ["Aug", "Авг", "Ago", "Aug", "8月"],
    ["Sep", "Сен", "Set", "Sep", "9月"], ["Oct", "Окт", "Ott", "Okt", "10月"], ["Nov", "Ноя", "Nov", "Nov", "11月"], ["Dec", "Дек", "Dic", "Dez", "12月"],
    ["Your booking requests on this device", "Ваши заявки на этом устройстве", "Le tue richieste su questo dispositivo", "Ihre Buchungsanfragen auf diesem Gerät", "此设备上的预订请求"],
    ["Saved in this browser so you can find your reference offline. Not synced anywhere.", "Сохранено в этом браузере, чтобы вы могли найти номер заявки без интернета. Нигде не синхронизируется.", "Salvate in questo browser per ritrovare il riferimento anche offline. Non vengono sincronizzate.", "In diesem Browser gespeichert, damit Sie Ihre Referenz auch offline finden. Es wird nichts synchronisiert.", "保存在本浏览器中，离线也能查看预订编号，不会同步到其他地方。"],

    /* contact */
    ["We’d love to hear from you", "Мы будем рады услышать вас", "Ci farebbe piacere sentirti", "Wir freuen uns auf Ihre Nachricht", "期待您的来信"],
    ["Quick message inquiry", "Быстрое сообщение", "Messaggio rapido", "Kurznachricht", "快速留言咨询"],
    ["Name", "Имя", "Nome", "Name", "姓名"],
    ["Your name", "Ваше имя", "Il tuo nome", "Ihr Name", "您的姓名"],
    ["Message", "Сообщение", "Messaggio", "Nachricht", "留言"],
    ["Send Island Inquiry", "Отправить запрос", "Invia la richiesta", "Anfrage senden", "发送咨询"],
    ["Travel dates (optional)", "Даты поездки (по желанию)", "Date del viaggio (facoltativo)", "Reisedaten (optional)", "出行日期（选填）"],
    ["Replies within minutes", "Ответим в течение нескольких минут", "Risposta in pochi minuti", "Antwort innerhalb weniger Minuten", "几分钟内回复"],

    /* booking */
    ["Your stay", "Ваше проживание", "Il tuo soggiorno", "Ihr Aufenthalt", "您的住宿"],
    ["Add excursions", "Добавить экскурсии", "Aggiungi escursioni", "Ausflüge hinzufügen", "添加游览项目"],
    ["Guest details", "Данные гостя", "Dati dell’ospite", "Angaben zum Gast", "住客信息"],
    ["Full name *", "Полное имя *", "Nome e cognome *", "Vollständiger Name *", "姓名 *"],
    ["Email *", "E-mail *", "E-mail *", "E-Mail *", "电子邮箱 *"],
    ["WhatsApp / phone *", "WhatsApp / телефон *", "WhatsApp / telefono *", "WhatsApp / Telefon *", "WhatsApp / 电话 *"],
    ["Country", "Страна", "Paese", "Land", "国家/地区"],
    ["Flight / arrival time", "Рейс / время прилёта", "Volo / orario di arrivo", "Flug / Ankunftszeit", "航班 / 到达时间"],
    ["Special requests", "Особые пожелания", "Richieste speciali", "Besondere Wünsche", "特殊要求"],
    ["Estimated total", "Ориентировочная сумма", "Totale stimato", "Geschätzter Gesamtpreis", "预估总价"],
    ["Total", "Итого", "Totale", "Gesamt", "合计"],
    ["Airport speedboat transfer", "Трансфер из аэропорта на скоростном катере", "Trasferimento in motoscafo dall’aeroporto", "Speedboat-Transfer vom Flughafen", "机场快艇接送"],
    ["Round trip (arrival + departure)", "Туда и обратно (прибытие + отъезд)", "Andata e ritorno (arrivo + partenza)", "Hin und zurück (Ankunft + Abreise)", "往返（抵达 + 离开）"],
    ["Arrival only", "Только прибытие", "Solo arrivo", "Nur Ankunft", "仅抵达"],
    ["Departure only", "Только отъезд", "Solo partenza", "Nur Abreise", "仅离开"],
    ["I’ll arrange my own transfer", "Организую трансфер сам", "Organizzo io il trasferimento", "Ich organisiere den Transfer selbst", "我自行安排接送"],
    ["Request booking", "Отправить заявку", "Richiedi la prenotazione", "Buchung anfragen", "提交预订请求"],
    ["Request this booking", "Отправить заявку", "Richiedi questa prenotazione", "Diese Buchung anfragen", "提交预订请求"],
    ["Your request is ready!", "Ваша заявка готова!", "La tua richiesta è pronta!", "Ihre Anfrage ist fertig!", "您的预订请求已准备好！"],
    ["One last step:", "Остался последний шаг:", "Ultimo passaggio:", "Noch ein letzter Schritt:", "最后一步："],
    ["Reference", "Номер заявки", "Riferimento", "Referenz", "预订编号"],
    ["Send via WhatsApp", "Отправить через WhatsApp", "Invia via WhatsApp", "Per WhatsApp senden", "通过 WhatsApp 发送"],
    ["Send by email", "Отправить по e-mail", "Invia via e-mail", "Per E-Mail senden", "通过邮件发送"],
    ["Copy", "Копировать", "Copia", "Kopieren", "复制"],
    ["Print", "Печать", "Stampa", "Drucken", "打印"],
    ["← Edit my booking", "← Изменить бронирование", "← Modifica la prenotazione", "← Buchung bearbeiten", "← 修改预订"],
    ["(optional)", "(по желанию)", "(facoltativo)", "(optional)", "（选填）"],
    ["A copy was also emailed to our reception.", "Копия также отправлена на e-mail нашей стойки регистрации.", "Una copia è stata inviata anche via e-mail alla nostra reception.", "Eine Kopie wurde auch per E-Mail an unsere Rezeption gesendet.", "副本也已通过邮件发送给我们的前台。"],
    ["Remove", "Убрать", "Rimuovi", "Entfernen", "移除"],
    ["Booked", "Занято", "Occupato", "Belegt", "已订满"],

    /* misc / app */
    /* packages, steps, how to get here */
    ["Stay + explore, all in one package", "Проживание + экскурсии в одном пакете", "Soggiorno + esplorazione in un unico pacchetto", "Übernachten + entdecken in einem Paket", "住宿加游览，一个套餐搞定"],
    ["Contact us for this package", "Связаться по этому пакету", "Contattaci per questo pacchetto", "Kontakt für dieses Paket", "咨询此套餐"],
    ["or email us", "или напишите на e-mail", "oppure scrivici via e-mail", "oder per E-Mail", "或发送邮件给我们"],
    ["How to get a package", "Как получить пакет", "Come ottenere un pacchetto", "So erhalten Sie ein Paket", "如何预订套餐"],
    ["Choose", "Выберите", "Scegli", "Auswählen", "选择"],
    ["Pick the package that fits your trip.", "Выберите пакет, подходящий для вашей поездки.", "Scegli il pacchetto più adatto al tuo viaggio.", "Wählen Sie das Paket, das zu Ihrer Reise passt.", "选择适合您行程的套餐。"],
    ["Message us", "Напишите нам", "Scrivici", "Schreiben Sie uns", "联系我们"],
    ["Tell us your dates and guests on WhatsApp or email.", "Сообщите даты и число гостей в WhatsApp или по e-mail.", "Indicaci date e ospiti su WhatsApp o via e-mail.", "Nennen Sie uns Daten und Gästezahl per WhatsApp oder E-Mail.", "通过 WhatsApp 或邮件告诉我们日期和人数。"],
    ["We confirm", "Мы подтверждаем", "Confermiamo", "Wir bestätigen", "我们确认"],
    ["We check availability and confirm the details.", "Мы проверим наличие мест и подтвердим детали.", "Verifichiamo la disponibilità e confermiamo i dettagli.", "Wir prüfen die Verfügbarkeit und bestätigen die Details.", "我们核实空房并确认细节。"],
    ["You pay", "Вы оплачиваете", "Paghi", "Sie zahlen", "您付款"],
    ["We send the payment options to secure your booking.", "Мы пришлём варианты оплаты, чтобы закрепить бронь.", "Ti inviamo le opzioni di pagamento per confermare la prenotazione.", "Wir senden Ihnen die Zahlungsmöglichkeiten, um die Buchung zu sichern.", "我们会发送付款方式以确保您的预订。"],
    ["You arrive", "Вы приезжаете", "Arrivi", "Sie reisen an", "您抵达"],
    ["We meet you at the jetty and welcome you to Guraidhoo.", "Мы встретим вас у причала и поприветствуем на Гурайду.", "Ti accogliamo al molo e ti diamo il benvenuto a Guraidhoo.", "Wir empfangen Sie am Steg und heißen Sie auf Guraidhoo willkommen.", "我们在码头迎接您，欢迎来到古莱杜岛。"],
    ["Plan your arrival", "Спланируйте прибытие", "Pianifica l’arrivo", "Anreise planen", "规划抵达"],
    ["How to get here", "Как добраться", "Come arrivare", "So kommen Sie zu uns", "如何抵达"],
    ["Arrive at Velana International Airport and collect your bags.", "Прилетите в международный аэропорт Велана и заберите багаж.", "Arriva all’aeroporto internazionale di Velana e ritira i bagagli.", "Landen Sie am Velana International Airport und holen Sie Ihr Gepäck ab.", "抵达 Velana 国际机场并领取行李。"],
    ["Take the speedboat from the airport jetty to Guraidhoo harbour.", "Сядьте на скоростной катер от причала аэропорта до гавани Гурайду.", "Prendi il motoscafo dal molo dell’aeroporto al porto di Guraidhoo.", "Nehmen Sie das Speedboat vom Flughafensteg zum Hafen von Guraidhoo.", "从机场码头乘快艇前往古莱杜岛港口。"],
    ["Our team meets you at the harbour; the guest house is about 650 m (an 8-minute walk) away.", "Наша команда встретит вас в гавани; до гостевого дома около 650 м (примерно 8 минут пешком).", "Il nostro team ti accoglie al porto; la guest house dista circa 650 m (circa 8 minuti a piedi).", "Unser Team empfängt Sie am Hafen; das Gästehaus ist etwa 650 m (ca. 8 Minuten zu Fuß) entfernt.", "我们的团队在港口迎接您，民宿距离约650米，步行约8分钟。"],
    ["Full directions & transfer info", "Подробный маршрут и информация о трансфере", "Indicazioni complete e info sui trasferimenti", "Vollständige Anreise & Transfer-Infos", "完整路线与接送信息"],
    ["Book Direct With Us", "Бронируйте напрямую у нас", "Prenota direttamente con noi", "Direkt bei uns buchen", "直接向我们预订"],
    /* sign-up offer */
    ["Welcome offer", "Приветственное предложение", "Offerta di benvenuto", "Willkommensangebot", "欢迎优惠"],
    ["Email or phone / WhatsApp", "E-mail или телефон / WhatsApp", "E-mail o telefono / WhatsApp", "E-Mail oder Telefon / WhatsApp", "邮箱或电话 / WhatsApp"],
    ["you@example.com or +44 7…", "you@example.com или +44 7…", "tu@esempio.com o +44 7…", "sie@beispiel.de oder +44 7…", "you@example.com 或 +44 7…"],
    ["I agree that Athens View may contact me by email, SMS or WhatsApp with this offer, booking reminders and occasional updates. I can unsubscribe at any time.", "Я согласен(на), что Athens View может связываться со мной по e-mail, SMS или WhatsApp по поводу этого предложения, напоминаний о бронировании и новостей. Я могу отписаться в любое время.", "Accetto che Athens View mi contatti via e-mail, SMS o WhatsApp per questa offerta, promemoria di prenotazione e aggiornamenti occasionali. Posso annullare l’iscrizione in qualsiasi momento.", "Ich bin einverstanden, dass Athens View mich per E-Mail, SMS oder WhatsApp zu diesem Angebot, Buchungserinnerungen und gelegentlichen Neuigkeiten kontaktiert. Ich kann mich jederzeit abmelden.", "我同意 Athens View 通过邮件、短信或 WhatsApp 向我发送此优惠、预订提醒和不定期的资讯。我可以随时退订。"],
    ["Get my code", "Получить код", "Ottieni il mio codice", "Meinen Code erhalten", "获取我的优惠码"],
    ["Offer terms", "Условия предложения", "Termini dell’offerta", "Angebotsbedingungen", "优惠条款"],
    ["Your code", "Ваш код", "Il tuo codice", "Ihr Code", "您的优惠码"],
    ["You’re in", "Готово", "Ci sei", "Sie sind dabei", "订阅成功"],
    ["Plan my stay", "Спланировать поездку", "Pianifica il soggiorno", "Aufenthalt planen", "规划我的行程"],
    ["Close", "Закрыть", "Chiudi", "Schließen", "关闭"],
    ["Please enter a valid email address or phone number.", "Введите корректный e-mail или номер телефона.", "Inserisci un indirizzo e-mail o un numero di telefono valido.", "Bitte geben Sie eine gültige E-Mail-Adresse oder Telefonnummer ein.", "请输入有效的邮箱或电话号码。"],
    ["Please tick the box to agree to be contacted.", "Отметьте галочкой согласие на связь с вами.", "Spunta la casella per accettare di essere contattato.", "Bitte setzen Sie das Häkchen, um der Kontaktaufnahme zuzustimmen.", "请勾选同意被联系。"],
    ["Discount code (optional)", "Промокод (по желанию)", "Codice sconto (facoltativo)", "Rabattcode (optional)", "优惠码（选填）"],
    ["Install the Athens View app", "Установить приложение Athens View", "Installa l’app Athens View", "Athens View App installieren", "安装 Athens View 应用"],
    ["You are offline – showing saved pages", "Нет сети – показаны сохранённые страницы", "Sei offline – pagine salvate", "Sie sind offline – gespeicherte Seiten", "当前离线，显示已保存的页面"],
    ["This page drifted out to sea", "Эта страница уплыла в море", "Questa pagina è andata alla deriva", "Diese Seite ist aufs Meer hinausgetrieben", "这个页面漂到海上去了"]
  ];

  var dict = { ru: {}, it: {}, de: {}, zh: {} };
  T.forEach(function (row) { Object.keys(COL).forEach(function (l) { dict[l][row[0]] = row[COL[l]]; }); });

  /* patterns for text that contains numbers */
  function plural(l, n, forms) { return l === 'ru' ? (n % 10 === 1 && n % 100 !== 11 ? forms[0] : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? forms[1] : forms[2])) : (n === 1 ? forms[0] : forms[1]); }
  var PATTERNS = [
    [/^(\d+) Guests?$/, function (l, m) {
      var n = +m[1];
      return l === 'ru' ? n + ' ' + plural('ru', n, ['гость', 'гостя', 'гостей']) : l === 'it' ? n + ' ' + plural('it', n, ['ospite', 'ospiti']) : l === 'de' ? n + ' ' + plural('de', n, ['Gast', 'Gäste']) : n + ' 位住客';
    }],
    [/^(\d+) Photos$/, function (l, m) { return l === 'ru' ? m[1] + ' фото' : l === 'it' ? m[1] + ' foto' : l === 'de' ? m[1] + ' Fotos' : m[1] + ' 张照片'; }],
    [/^Save (\d+)%$/, function (l, m) { return l === 'ru' ? 'Скидка ' + m[1] + '%' : l === 'it' ? 'Risparmia il ' + m[1] + '%' : l === 'de' ? m[1] + ' % sparen' : '立省 ' + m[1] + '%'; }],
    [/^([\d.]+★) Guest Rating$/, function (l, m) { return m[1] + ' ' + dict[l]['Guest Rating']; }],
    [/^(\d+) nights · (.+)$/, function (l, m) {
      var w = { ru: 'ноч.', it: 'notti', de: 'Nächte', zh: '晚' }[l];
      return (l === 'zh' ? m[1] + ' ' + w : m[1] + ' ' + w) + ' · ' + (dict[l][m[2]] || m[2]);
    }],
    [/^package · (\d+) nights · (\d+)% off$/, function (l, m) {
      return { ru: 'пакет · ' + m[1] + ' ноч. · скидка ' + m[2] + '%', it: 'pacchetto · ' + m[1] + ' notti · sconto del ' + m[2] + '%', de: 'Paket · ' + m[1] + ' Nächte · ' + m[2] + ' % Rabatt', zh: '套餐 · ' + m[1] + ' 晚 · 优惠 ' + m[2] + '%' }[l];
    }],
    [/^\(needs at least (\d+) nights\)$/, function (l, m) {
      return { ru: '(нужно не менее ' + m[1] + ' ноч.)', it: '(servono almeno ' + m[1] + ' notti)', de: '(mindestens ' + m[1] + ' Nächte nötig)', zh: '（至少需入住 ' + m[1] + ' 晚）' }[l];
    }],
    [/^Availability · (.+)$/, function (l, m) {
      var r = dict[l][m[1]] || m[1]; return { ru: 'Доступность · ', it: 'Disponibilità · ', de: 'Verfügbarkeit · ', zh: '空房情况 · ' }[l] + r;
    }],
    [/^Sorry – (.+?) is already booked for some of these nights\.(?: (.+))?$/, function (l, m) {
      var room = dict[l][m[1]] || m[1], rest = m[2] || '', alt = rest.match(/^(.+) is free for your dates\.$/), altN = alt ? (dict[l][alt[1]] || alt[1]) : '';
      var T2 = {
        ru: ['К сожалению, «' + room + '» занят на часть этих ночей.', altN ? ' «' + altN + '» свободен на ваши даты.' : ' Попробуйте другие даты.'],
        it: ['Spiacenti – «' + room + '» è già prenotata per alcune di queste notti.', altN ? ' «' + altN + '» è libera per le tue date.' : ' Prova altre date.'],
        de: ['Leider ist „' + room + '“ für einige dieser Nächte bereits belegt.', altN ? ' „' + altN + '“ ist für Ihre Daten frei.' : ' Bitte andere Daten wählen.'],
        zh: ['抱歉，' + room + ' 在部分日期已订满。', altN ? altN + ' 在您所选日期仍有空房。' : '请尝试其他日期。']
      }[l];
      return T2[0] + T2[1];
    }],
    [/^★ ([\d.]+) on Google(?: · (\d+) reviews)?$/, function (l, m) {
      var on = { ru: 'в Google', it: 'su Google', de: 'bei Google', zh: '谷歌评分' }[l], rv = { ru: 'отзывов', it: 'recensioni', de: 'Bewertungen', zh: '条评价' }[l];
      return '★ ' + m[1] + ' ' + on + (m[2] ? ' · ' + m[2] + ' ' + rv : '');
    }],
    [/^(\d+)% off your first direct stay$/, function (l, m) {
      return { ru: 'Скидка ' + m[1] + '% на первое прямое бронирование', it: m[1] + '% di sconto sul primo soggiorno diretto', de: m[1] + ' % Rabatt auf Ihren ersten Direktaufenthalt', zh: '首次直接预订立减 ' + m[1] + '%' }[l];
    }],
    [/^Leave your email or WhatsApp number and we’ll show you your code straight away\. Valid until (.+)\.$/, function (l, m) {
      return { ru: 'Оставьте e-mail или номер WhatsApp – мы сразу покажем ваш код. Действует до ' + m[1] + '.', it: 'Lascia la tua e-mail o il tuo numero WhatsApp e ti mostreremo subito il codice. Valido fino al ' + m[1] + '.', de: 'Hinterlassen Sie Ihre E-Mail oder WhatsApp-Nummer – wir zeigen Ihnen sofort Ihren Code. Gültig bis ' + m[1] + '.', zh: '留下您的邮箱或 WhatsApp 号码，我们立即显示您的优惠码。有效期至 ' + m[1] + '。' }[l];
    }],
    [/^(?:Thank you! We’ve saved your details and will send a welcome message soon\. )?Quote this code when you book – valid until (.+)\.$/, function (l, m) {
      var saved = /^Thank you!/.test(m.input), pre = saved ? { ru: 'Спасибо! Мы сохранили ваши данные и скоро пришлём приветственное сообщение. ', it: 'Grazie! Abbiamo salvato i tuoi dati e ti invieremo presto un messaggio di benvenuto. ', de: 'Vielen Dank! Wir haben Ihre Angaben gespeichert und senden Ihnen bald eine Willkommensnachricht. ', zh: '谢谢！我们已保存您的信息，稍后会发送欢迎消息。' }[l] : '';
      return pre + { ru: 'Укажите этот код при бронировании – действует до ' + m[1] + '.', it: 'Indica questo codice quando prenoti – valido fino al ' + m[1] + '.', de: 'Nennen Sie diesen Code bei der Buchung – gültig bis ' + m[1] + '.', zh: '预订时请出示此优惠码，有效期至 ' + m[1] + '。' }[l];
    }],
    [/^Sleeps (\d+)$/, function (l, m) { return l === 'ru' ? 'Вмещает ' + m[1] : l === 'it' ? 'Ospita ' + m[1] : l === 'de' ? 'Für ' + m[1] + ' Gäste' : '可住 ' + m[1] + ' 人'; }]
  ];

  var lang = 'en', orig = new WeakMap(), shown = new WeakMap(), attrOrig = new WeakMap();
  function lookup(key) {
    if (lang === 'en' || !key) return null;
    if (dict[lang][key]) return dict[lang][key];
    for (var i = 0; i < PATTERNS.length; i++) { var m = key.match(PATTERNS[i][0]); if (m) return PATTERNS[i][1](lang, m); }
    return null;
  }

  function doText(n) {
    var cur = n.nodeValue, o = (orig.has(n) && shown.get(n) === cur) ? orig.get(n) : cur;
    var t = lookup(o.replace(/\s+/g, ' ').trim());
    if (t) {
      var v = o.match(/^\s*/)[0] + t + o.match(/\s*$/)[0];
      orig.set(n, o); shown.set(n, v); if (n.nodeValue !== v) n.nodeValue = v;
    } else if (orig.has(n)) {
      if (shown.get(n) === cur) n.nodeValue = orig.get(n);
      orig.delete(n); shown.delete(n);
    }
  }
  function doAttrs(el) {
    ['placeholder', 'aria-label'].forEach(function (a) {
      if (!el.hasAttribute(a)) return;
      var store = attrOrig.get(el) || {}, cur = el.getAttribute(a), o = (store[a] && store[a].shown === cur) ? store[a].orig : cur;
      var t = lookup(o.replace(/\s+/g, ' ').trim());
      if (t) { store[a] = { orig: o, shown: t }; attrOrig.set(el, store); if (cur !== t) el.setAttribute(a, t); }
      else if (store[a]) { if (store[a].shown === cur) el.setAttribute(a, store[a].orig); delete store[a]; }
    });
  }
  var SKIP = /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|PRE|CODE)$/;
  function skip(n) {
    var p = n.parentNode; if (!p || p.nodeType !== 1) return true;
    return SKIP.test(p.tagName) || (p.classList && p.classList.contains('material-symbols-outlined')) || !!(p.closest && p.closest('[data-no-i18n]'));
  }
  function walk(root) {
    if (root.nodeType === 3) { if (!skip(root)) doText(root); return; }
    if (root.nodeType !== 1 || SKIP.test(root.tagName)) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n, list = [];
    while ((n = w.nextNode())) { if (!skip(n)) list.push(n); }
    list.forEach(doText);
    if (root.hasAttribute) doAttrs(root);
    root.querySelectorAll('[placeholder],[aria-label]').forEach(doAttrs);
  }

  var obs = null;
  function startObserver() {
    if (obs || !window.MutationObserver) return;
    obs = new MutationObserver(function (muts) {
      if (lang === 'en') return;
      muts.forEach(function (m) { m.addedNodes.forEach(function (n) { walk(n); }); });
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  function setLang(l, save) {
    if (!dict[l] && l !== 'en') l = 'en';
    lang = l; AV.lang = l;
    AV.locale = (LANGS.filter(function (x) { return x[0] === l; })[0] || LANGS[0])[2];
    document.documentElement.lang = l;
    if (save) { try { localStorage.setItem('av_lang', l); } catch (e) {} }
    walk(document.body);
    [].forEach.call(document.querySelectorAll('select.av-lang'), function (s) { s.value = l; });
    document.dispatchEvent(new CustomEvent('av:lang', { detail: l }));
  }

  function build(cls, id) {
    var s = document.createElement('select'); s.className = 'av-lang ' + cls; s.setAttribute('aria-label', 'Language'); s.setAttribute('data-no-i18n', '');
    /* the header selector shows short codes to save space; the mobile menu shows full names */
    var short = cls === 'av-lang-desk', codes = { en: 'EN', ru: 'RU', it: 'IT', de: 'DE', zh: '中文' };
    s.innerHTML = LANGS.map(function (x) { return '<option value="' + x[0] + '" lang="' + x[0] + '" title="' + x[1] + '">' + (short ? codes[x[0]] : x[1]) + '</option>'; }).join('');
    if (short) s.setAttribute('title', 'Language');
    s.addEventListener('change', function () { setLang(s.value, true); });
    return s;
  }
  function init() {
    var right = document.querySelector('header div.gap-space-sm.shrink-0'), mob = document.getElementById('mobile-menu');
    if (right) right.insertBefore(build('av-lang-desk'), right.firstChild);
    if (mob) mob.insertBefore(build('av-lang-mob'), mob.firstChild);
    var want = 'en';
    try { want = new URLSearchParams(location.search).get('lang') || localStorage.getItem('av_lang') || 'en'; } catch (e) {}
    startObserver();
    /* sync the selects even for English */
    setLang(want, !!new URLSearchParams(location.search).get('lang'));
    AV.i18n = { set: function (l) { setLang(l, true); }, get: function () { return lang; }, dict: dict };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
