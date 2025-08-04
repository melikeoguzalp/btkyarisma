
import { LucideIcon, FileCode, Link2, ShieldQuestion, Drama, Lightbulb, Smartphone, Phone, UserCheck, Fish, ServerCrash, KeyRound, Code, ShieldOff, BetweenHorizonalEnd, DatabaseZap, BookOpen, ListTree, Gamepad2, ShieldAlert, BrainCircuit, FileWarning, ShieldCheck, ArrowUpCircle, WifiOff, CopyX, SmartphoneNfc, DownloadCloud, Usb, Users, CalendarClock, Laptop, Lock, MailCheck, Shield, Wifi, FileLock, Webcam, Filter, CloudCog, Rss, Info, Fingerprint, LockKeyhole, SearchCheck } from "lucide-react";

export type InfoCard = {
    title: string;
    content: string;
    icon: LucideIcon;
};

export type InteractiveStory = {
    id: string;
    scenario: string;
    options: { text: string; isCorrect: boolean }[];
    explanation: string;
    dangerType: string;
    icon: LucideIcon;
};

export type GameScenario = {
  id: number;
  type: 'email' | 'sms';
  sender: string;
  subject?: string;
  content: string;
  isPhishing: boolean;
  explanation: string;
};

export type DailyTip = {
    id: string;
    title: string;
    content: string;
    icon: LucideIcon;
};

export type PhishingType = {
    title: string;
    description: string;
    icon: LucideIcon;
};

export type EducationSection = {
    title: string;
    description: string;
    link: string;
    icon: LucideIcon;
}


export const educationData: { [key: string]: { infoCards: InfoCard[], stories: InteractiveStory[], dailyTips: DailyTip[], phishingTypes: PhishingType[], educationSections: EducationSection[] } } = {
    en: {
        infoCards: [
            { title: "Beware of .exe Extensions", content: "Links ending in .exe download an executable file. Do not run them unless you are 100% sure of the source.", icon: FileCode },
            { title: "Never Open Unknown Attachments", content: "Never open attachments in unknown emails; they could be viruses.", icon: FileWarning },
            { title: "Use Up-to-Date Antivirus", content: "Using current antivirus software is the first line of defense against malware.", icon: ShieldCheck },
            { title: "Don't Delay Updates", content: "Software updates patch security vulnerabilities; do not postpone them.", icon: ArrowUpCircle },
            { title: "Avoid Unknown Wi-Fi Networks", content: "Connecting to unknown Wi-Fi networks can lead to your data being stolen.", icon: WifiOff },
            { title: "Use Strong Passwords", content: "Using complex and long passwords protects your accounts.", icon: KeyRound },
            { title: "Don't Reuse Passwords", content: "Using the same password on multiple sites is a security risk.", icon: CopyX },
            { title: "Enable Two-Factor Authentication (2FA)", content: "2FA significantly increases security.", icon: SmartphoneNfc },
            { title: "Download from Official Sources", content: "Do not download programs from unknown sources; only use official sites.", icon: DownloadCloud },
            { title: "Be Cautious with USB Drives", content: "Only use USB drives from sources you trust.", icon: Usb },
            { title: "Beware of Social Engineering", content: "Be careful of social engineering attacks; do not share your personal information.", icon: Users },
            { title: "Change Passwords Regularly", content: "Change your passwords periodically.", icon: CalendarClock },
            { title: "Avoid Public Computers", content: "Do not enter your private information on public computers.", icon: Laptop },
            { title: "Check for 'https://'", content: "Ensure website addresses start with 'https://' for a secure connection.", icon: Lock },
            { title: "Check Phishing Email Links", content: "Before clicking links in phishing emails, check the URL.", icon: MailCheck },
            { title: "Verify Sender's Address", content: "Compare the sender's name with the actual email address.", icon: UserCheck },
            { title: "Keep Your Firewall Active", content: "Keep the firewall on your computer active.", icon: Shield },
            { title: "Remove Untrusted Extensions", content: "Remove untrusted extensions from your browser.", icon: Filter },
            { title: "Risks of File Sharing Sites", content: "Downloading files from torrent and similar file-sharing sites is risky.", icon: FileWarning },
            { title: "Don't Leave Devices Unattended", content: "Never leave your device unlocked in public places.", icon: LockKeyhole },
            { title: "Backup Your Files", content: "Do not delete important files without backing them up.", icon: CloudCog },
            { title: "Avoid Cracked Software", content: "Using cracked or pirated software is a security vulnerability.", icon: ShieldOff },
            { title: "Use Official App Stores", content: "For mobile apps, only use official stores (Google Play, App Store).", icon: Smartphone },
            { title: "Disable Unnecessary Services", content: "Turn off unnecessary services on your computer to reduce the attack surface.", icon: ServerCrash },
            { title: "Risks of Root/Jailbreak", content: "Rooting or jailbreaking your device increases security risks.", icon: Smartphone },
            { title: "Scan for Viruses", content: "If your computer has a suspicious file, perform a virus scan.", icon: ShieldQuestion },
            { title: "Change Wi-Fi Password Regularly", content: "Change your Wi-Fi password regularly.", icon: Wifi },
            { title: "Secure Online Payments", content: "Pay attention to secure connections when entering credit card information on websites.", icon: Lock },
            { title: "Use 2FA on Cloud Services", content: "Use two-factor authentication on cloud services.", icon: CloudCog },
            { title: "Use Email Spam Filters", content: "Actively use email spam filters.", icon: Filter },
            { title: "MAC Address Filtering", content: "You can protect frequently used devices with MAC address filtering.", icon: Fingerprint },
            { title: "Use VPN on Public Wi-Fi", content: "Increase your security by using a VPN on public Wi-Fi.", icon: ShieldCheck },
            { title: "Limit Personal Info on Social Media", content: "Limit the personal information on your social media profiles.", icon: Users },
            { title: "Check File Sizes", content: "Check the file size when downloading software; be wary of abnormal differences.", icon: FileCode },
            { title: "Preview Shortened Links", content: "You can preview the real address behind link shorteners to see the destination.", icon: Link2 },
            { title: "Keep Your Phone's OS Updated", content: "Keep your phone's operating system up to date.", icon: Smartphone },
            { title: "Encrypt Important Files", content: "Protect your important files by encrypting them.", icon: FileLock },
            { title: "Use a Screen Lock", content: "Use a screen lock to prevent unauthorized access to your device.", icon: Smartphone },
            { title: "Don't Use Admin Accounts Daily", content: "Do not use an administrator account for daily tasks on your OS.", icon: UserCheck },
            { title: "Check for Background Malware", content: "If your computer slows down, it might have malware running in the background; check it.", icon: Laptop },
            { title: "Shop on Trusted Sites", content: "When shopping online, shop from reliable sites.", icon: Lock },
            { title: "Monitor Children's Internet Use", content: "Control and apply filters to your children's internet usage.", icon: Users },
            { title: "Don't Click Suspicious Links", content: "Do not click on suspicious links; it could be a scam.", icon: Link2 },
            { title: "Secure Your Email Account", content: "Use a strong password and 2FA to enhance your email account security.", icon: MailCheck },
            { title: "Manage Bluetooth in Public", content: "Do not leave Bluetooth devices on in public areas.", icon: Smartphone },
            { title: "Review App Permissions", content: "Carefully review permissions when installing programs.", icon: ShieldQuestion },
            { title: "Backup Photos and Documents", content: "Regularly back up your photos and documents.", icon: CloudCog },
            { title: "Separate Work and Personal Accounts", content: "Keep your work and personal accounts separate.", icon: Users },
            { title: "Update Recovery Information", content: "Frequently update your password recovery information.", icon: Info },
            { title: "Remove Unknown Apps", content: "Uninstall unknown applications from your computer or phone.", icon: Smartphone },
        ],
        stories: [
            { id: "story_1", scenario: "You received an email from 'e-devlet-destek@edevlet-gov-tr.org' with the subject 'Update your e-Devlet password immediately!'. The content says you must update your password within 24 hours or your account will be suspended.", dangerType: "Phishing via Fake Domain", icon: Link2, options: [{ text: "Click the link to update.", isCorrect: false },{ text: "Delete the email and log in via the official site.", isCorrect: true }], explanation: "The official e-Devlet domain is turkiye.gov.tr. The sender's domain is fake and designed to steal your credentials." },
            { id: "story_2", scenario: "An email from 'guvenlik@ziraat-guvenlik.com' states that your bank account is suspended due to unusual login attempts and asks you to click a link to verify.", dangerType: "Phishing via Impersonation", icon: Link2, options: [{ text: "Click the link and enter my details.", isCorrect: false },{ text: "Contact the bank through its official app or number.", isCorrect: true }], explanation: "The domain is fake. Ziraat Bank's official domain is ziraatbank.com.tr. This link leads to a fake site to steal your information." },
            { id: "story_3", scenario: "You get an SMS: 'Your package could not be delivered. Please confirm your address here: http://kargo-dogrula.net'", dangerType: "Smishing (SMS Phishing)", icon: Smartphone, options: [{ text: "Click the link to confirm.", isCorrect: false },{ text: "Ignore the SMS and use the official tracking number.", isCorrect: true }], explanation: "Official cargo companies use known domains (e.g., ups.com.tr). This fake link could install malware on your device." },
            { id: "story_4", scenario: "You receive an email claiming your Instagram account will be deleted in 24 hours for copyright violation. It asks you to fill out a form at 'http://instagram-verify-help.net'.", dangerType: "Social Media Phishing", icon: Link2, options: [{ text: "Fill out the form to appeal.", isCorrect: false },{ text: "Report the email and check my account via the app.", isCorrect: true }], explanation: "Instagram's official domain is instagram.com. The link leads to a fake login page designed to steal your account." },
            { id: "story_5", scenario: "An email says you've won a 1000 TL gift card from Migros and asks you to click 'http://mıgros-kampanya.org' to claim it.", dangerType: "Scam Offer (Look-alike Domain)", icon: Link2, options: [{ text: "Click to get my gift card.", isCorrect: false },{ text: "Delete the email. It's too good to be true.", isCorrect: true }], explanation: "The domain uses a fake character ('ı' instead of 'i'). The official site is migros.com.tr. This is a common trick." },
            { id: "story_6", scenario: "You receive a WhatsApp message: 'Your WhatsApp subscription has expired. Click to renew: http://whatsapp-guncelle.app'", dangerType: "Scam/Malware Link", icon: Link2, options: [{ text: "Click the link to renew.", isCorrect: false },{ text: "Delete the message.", isCorrect: true }], explanation: "WhatsApp is free and does not expire. The link could force you to download a malicious APK file." },
            { id: "story_7", scenario: "You receive an email from 'microsoftsupport@update-secure.net' with an attachment named 'security_update.exe', stating your computer is at risk.", dangerType: "Malware via Attachment", icon: FileCode, options: [{ text: "Run the attachment to secure my PC.", isCorrect: false },{ text: "Delete the email immediately.", isCorrect: true }], explanation: "Official software updates are never sent as email attachments. An .exe file is an executable that is likely a virus." },
            { id: "story_8", scenario: "An email arrives with a file named 'vergi_icin_dilekce.pdf.exe', claiming to be a petition from the tax office.", dangerType: "Malicious File (Double Extension)", icon: FileCode, options: [{ text: "Open the 'PDF' to see the petition.", isCorrect: false },{ text: "Recognize the .exe and delete it.", isCorrect: true }], explanation: "This is a classic trick. The file is not a PDF, but an executable (.exe) disguised with a fake '.pdf' name to appear safe." },
            { id: "story_9", scenario: "You find a file named 'sgk_hizmet_dokumu2025.docm' in your downloads, appearing to be a social security statement.", dangerType: "Malware (Malicious Macro)", icon: FileCode, options: [{ text: "Open it and enable macros if prompted.", isCorrect: false },{ text: "Delete the file as .docm can contain harmful macros.", isCorrect: true }], explanation: "'.docm' files can contain macros, which are scripts that can automatically run and install malware on your computer." },
            { id: "story_10", scenario: "An attachment named 'mehmet_resim.jpg.exe' is in an email from an unknown sender.", dangerType: "Malware (Disguised Executable)", icon: FileCode, options: [{ text: "Open the file to see the picture of Mehmet.", isCorrect: false },{ text: "Delete the email, it's a virus.", isCorrect: true }], explanation: "This is another double extension trick. It looks like a JPG image, but it's an executable (.exe) file that will run a virus." },
        ],
        dailyTips: [
             { id: "tip1", title: "How to Report SMS Spam", content: "You can report spam SMS messages to the authorities by forwarding the message to a specific number. In Turkey, you can use the 'e-Devlet' or 'IYS' services.", icon: Lightbulb },
            { id: "tip2", title: "Use Unique Passwords", content: "Avoid using the same password for multiple websites. If one site is breached, all your accounts become vulnerable. Use a password manager to help.", icon: Lightbulb },
            { id: "tip3", title: "Enable Two-Factor Authentication (2FA)", content: "2FA adds an extra layer of security. Even if someone steals your password, they won't be able to log in without your phone.", icon: Lightbulb }
        ],
        phishingTypes: [
             { title: "Phishing", description: "Phishing is a fraudulent attempt to obtain sensitive information such as usernames, passwords, and credit card details by disguising as a trustworthy entity in an electronic communication.", icon: Fish },
             { title: "Spear Phishing", description: "This is a highly targeted form of phishing where attackers research their victims and craft personalized emails. The message appears to be from a trusted source, making it more convincing and harder to detect.", icon: UserCheck },
            { title: "Smishing (SMS Phishing)", description: "Smishing uses malicious text messages to trick users into clicking links, downloading malware, or revealing sensitive information. These messages often create a sense of urgency, like a fake package delivery notice.", icon: Smartphone },
            { title: "Vishing (Voice Phishing)", description: "Vishing involves phone calls where attackers impersonate a trusted entity, such as a bank or government agency, to deceive individuals into providing personal or financial details over the phone.", icon: Phone },
            { title: "Malware", description: "Malware is any software intentionally designed to cause disruption to a computer, server, client, or computer network, leak private information, gain unauthorized access to information or systems, or deprive users access to information.", icon: ShieldOff },
            { title: "Ransomware", description: "Ransomware is a type of malware that threatens to publish the victim's personal data or perpetually block access to it unless a ransom is paid. It encrypts your files and demands money for the decryption key.", icon: KeyRound },
            { title: "DDoS Attack", description: "A Distributed Denial-of-Service (DDoS) attack is a malicious attempt to disrupt the normal traffic of a targeted server, service or network by overwhelming the target or its surrounding infrastructure with a flood of Internet traffic.", icon: ServerCrash },
            { title: "Man-in-the-Middle (MitM) Attack", description: "An MitM attack is when an attacker secretly relays and possibly alters the communications between two parties who believe they are directly communicating with each other. This is common on public Wi-Fi networks.", icon: BetweenHorizonalEnd },
            { title: "SQL Injection", description: "A SQL injection attack consists of insertion of a SQL query via the input data from the client to the application. A successful SQL injection exploit can read sensitive data from the database.", icon: DatabaseZap },
            { title: "Credential Stuffing", description: "This is a type of cyberattack where stolen account credentials (usernames and passwords) are used to gain unauthorized access to user accounts through large-scale automated login requests.", icon: KeyRound },
        ],
        educationSections: [
             { title: 'Interactive Stories', description: 'Learn from real-life scenarios.', link: '/education/stories', icon: BookOpen },
            { title: 'Quick Info', description: 'Get security tips in seconds.', link: '/education/info', icon: ListTree },
            { title: 'Phishing Game', description: 'Test your skills against AI-generated scenarios.', link: '/education/game', icon: Gamepad2 },
            { title: 'Attack Types', description: 'Understand common phishing methods.', link: '/education/types', icon: ShieldAlert },
            { title: 'Getting Manipulated', description: 'Learn to recognize psychological tactics.', link: '/education/manipulation', icon: BrainCircuit },
            { title: 'Be Careful', description: 'Learn how to check links and files.', link: '/education/attention', icon: SearchCheck },
        ]
    },
    tr: {
        infoCards: [
            { title: ".exe Uzantılarına Dikkat", content: ".exe ile biten linkler çalıştırılabilir dosya indirir, kaynağı kesin değilse açmayın.", icon: FileCode },
            { title: "Bilinmeyen Ekleri Açmayın", content: "Bilinmeyen e-postalardaki ekleri asla açmayın, virüs olabilir.", icon: FileWarning },
            { title: "Güncel Antivirüs Kullanın", content: "Güncel antivirüs programı kullanmak zararlılara karşı ilk savunmadır.", icon: ShieldCheck },
            { title: "Güncellemeleri Ertelemeyin", content: "Yazılım güncellemeleri güvenlik açıklarını kapatır, ertelemeyin.", icon: ArrowUpCircle },
            { title: "Bilinmeyen Wi-Fi Ağlarından Kaçının", content: "Bilinmeyen Wi-Fi ağlarına bağlanmak verilerinizin çalınmasına yol açabilir.", icon: WifiOff },
            { title: "Karmaşık Parolalar Kullanın", content: "Karmaşık ve uzun parolalar kullanmak hesabınızı korur.", icon: KeyRound },
            { title: "Parolaları Tekrar Kullanmayın", content: "Aynı parolayı birden fazla sitede kullanmak güvenlik riskidir.", icon: CopyX },
            { title: "İki Faktörlü Kimlik Doğrulamayı (2FA) Etkinleştirin", content: "İki faktörlü kimlik doğrulama (2FA) güvenliği önemli ölçüde artırır.", icon: SmartphoneNfc },
            { title: "Resmi Kaynaklardan İndirin", content: "Bilinmeyen kaynaklardan program indirmeyin, sadece resmi sitelerden indirin.", icon: DownloadCloud },
            { title: "USB Belleklere Dikkat", content: "USB bellekleri sadece emin olduğunuz kaynaklardan kullanın.", icon: Usb },
            { title: "Sosyal Mühendisliğe Karşı Dikkatli Olun", content: "Sosyal mühendislik saldırılarına karşı dikkatli olun, kişisel bilgilerinizi paylaşmayın.", icon: Users },
            { title: "Parolalarınızı Düzenli Değiştirin", content: "Şifrelerinizi düzenli olarak değiştirin.", icon: CalendarClock },
            { title: "Halka Açık Bilgisayarlardan Kaçının", content: "Public bilgisayarlarda özel bilgilerinizi girmeyin.", icon: Laptop },
            { title: "'https://' Kontrolü Yapın", content: "Web sitelerinin adresinin başında 'https://' olmasına dikkat edin.", icon: Lock },
            { title: "Oltalama E-postalarını Kontrol Edin", content: "Phishing (oltalama) e-postalarına karşı linklere tıklamadan önce URL’yi kontrol edin.", icon: MailCheck },
            { title: "Gönderen Adresini Doğrulayın", content: "E-posta gönderen adresi ile gerçek adresi karşılaştırın.", icon: UserCheck },
            { title: "Güvenlik Duvarını Aktif Tutun", content: "Bilgisayarınızda güvenlik duvarını aktif tutun.", icon: Shield },
            { title: "Güvenilmeyen Tarayıcı Uzantılarını Kaldırın", content: "Tarayıcıda güvenilmeyen uzantıları kaldırın.", icon: Filter },
            { title: "Dosya Paylaşım Siteleri Riskleri", content: "Torrent ve benzeri dosya paylaşım sitelerinden dosya indirmek risklidir.", icon: FileWarning },
            { title: "Cihazlarınızı Kilitleyin", content: "Cihazınızı halka açık yerlerde asla açık bırakmayın.", icon: LockKeyhole },
            { title: "Dosyalarınızı Yedekleyin", content: "Yedekleme yapmadan önemli dosyalarınızı silmeyin.", icon: CloudCog },
            { title: "Korsan Yazılımdan Kaçının", content: "Yazılımları crackli veya korsan kullanmak güvenlik açığıdır.", icon: ShieldOff },
            { title: "Resmi Uygulama Mağazalarını Kullanın", content: "Mobil uygulamalarda sadece resmi mağazaları kullanın (Google Play, App Store).", icon: Smartphone },
            { title: "Gereksiz Servisleri Kapatın", content: "Bilgisayarınızda gereksiz servisleri kapatın, saldırı yüzeyi küçülür.", icon: ServerCrash },
            { title: "Root/Jailbreak Riskleri", content: "Root veya jailbreak işlemi güvenlik riskini artırır.", icon: Smartphone },
            { title: "Virüs Taraması Yapın", content: "Bilgisayarınızda şüpheli dosya varsa virüs taraması yapın.", icon: ShieldQuestion },
            { title: "Wi-Fi Şifrenizi Değiştirin", content: "Wi-Fi şifrenizi düzenli değiştirin.", icon: Wifi },
            { title: "Güvenli Online Ödeme", content: "Web sitelerinde kredi kartı bilgisi girerken güvenli bağlantıya dikkat edin.", icon: Lock },
            { title: "Bulut Servislerinde 2FA Kullanın", content: "Bulut servislerinde iki faktörlü kimlik doğrulama kullanın.", icon: CloudCog },
            { title: "Spam Filtrelerini Kullanın", content: "E-posta spam filtrelerini aktif kullanın.", icon: Filter },
            { title: "MAC Adresi Filtreleme", content: "Sık kullanılan cihazlarınızı MAC adresi filtreleme ile koruyabilirsiniz.", icon: Fingerprint },
            { title: "Halka Açık Wi-Fi'de VPN Kullanın", content: "Açık Wi-Fi’da VPN kullanarak güvenliğinizi artırabilirsiniz.", icon: ShieldCheck },
            { title: "Sosyal Medyada Bilgilerinizi Sınırlayın", content: "Sosyal medya profillerinde kişisel bilgilerinizi sınırlayın.", icon: Users },
            { title: "Dosya Boyutlarını Kontrol Edin", content: "Yazılım indirme işlemlerinde dosya boyutunu kontrol edin, anormal fark varsa dikkat!", icon: FileCode },
            { title: "Kısaltılmış Linkleri Kontrol Edin", content: "Link kısaltıcıların arkasındaki gerçek adresi görmek için önizleme yapabilirsiniz.", icon: Link2 },
            { title: "Telefonunuzu Güncel Tutun", content: "Telefonunuzun işletim sistemini güncel tutun.", icon: Smartphone },
            { title: "Dosyalarınızı Şifreleyin", content: "Önemli dosyalarınızı şifreleyerek koruyun.", icon: FileLock },
            { title: "Ekran Kilidi Kullanın", content: "Cihazınıza yetkisiz erişimi önlemek için ekran kilidini aktif kullanın.", icon: Smartphone },
            { title: "Yönetici Hesabını Günlük Kullanmayın", content: "İşletim sisteminde kullanıcı hesabını yönetici olarak kullanmayın.", icon: UserCheck },
            { title: "Yavaşlayan Bilgisayarı Kontrol Edin", content: "Bilgisayarınız yavaşladığında arka planda zararlı yazılım olabilir, kontrol edin.", icon: Laptop },
            { title: "Güvenilir Sitelerden Alışveriş Yapın", content: "Online alışveriş yaparken güvenilir sitelerden alışveriş yapın.", icon: Lock },
            { title: "Çocukların İnternet Kullanımını Kontrol Edin", content: "Çocuklarınızın internet kullanımını kontrol edin ve filtre uygulayın.", icon: Users },
            { title: "Şüpheli Linklere Tıklamayın", content: "Şüpheli linklere tıklamayın, dolandırıcılık olabilir.", icon: Link2 },
            { title: "E-posta Hesabınızı Güvenceye Alın", content: "E-posta hesabınızın güvenliğini artırmak için güçlü parola ve 2FA kullanın.", icon: MailCheck },
            { title: "Bluetooth'u Halka Açık Alanlarda Kapatın", content: "Bluetooth cihazlarını halka açık alanlarda açık bırakmayın.", icon: Smartphone },
            { title: "Uygulama İzinlerini İnceleyin", content: "Program yüklerken izinleri dikkatlice inceleyin.", icon: ShieldQuestion },
            { title: "Fotoğraf ve Belgelerinizi Yedekleyin", content: "Fotoğraf ve belgelerinizi düzenli yedekleyin.", icon: CloudCog },
            { title: "İş ve Kişisel Hesapları Ayırın", content: "İş ve kişisel hesapları ayrı tutun.", icon: Users },
            { title: "Kurtarma Bilgilerinizi Güncelleyin", content: "Sık sık parola kurtarma bilgilerinizi güncelleyin.", icon: Info },
            { title: "Bilinmeyen Uygulamaları Kaldırın", content: "Bilgisayarınızda veya telefonda bilinmeyen uygulamaları kaldırın.", icon: Smartphone },
        ],
        stories: [
            { id: "story_1", scenario: "Kimden: 'e-devlet-destek@edevlet-gov-tr.org', Konu: 'e-Devlet şifrenizi hemen güncelleyin!'. İçerik: 'Hesabınızın güvenliği için 24 saat içinde şifrenizi güncellemeniz gerekmektedir. Aksi takdirde hesabınız askıya alınacaktır.'", dangerType: "Sahte Alan Adı ile Oltalama", icon: Link2, options: [{ text: "Linki tıklayıp güncellerim.", isCorrect: false },{ text: "E-postayı siler, resmi siteden giriş yaparım.", isCorrect: true }], explanation: "Resmi e-Devlet alan adı turkiye.gov.tr'dir. Gönderen adresi sahtedir ve kimlik bilgilerinizi çalmak için tasarlanmıştır." },
            { id: "story_2", scenario: "'guvenlik@ziraat-guvenlik.com' adresinden gelen bir e-posta, olağandışı giriş denemeleri nedeniyle banka hesabınızın askıya alındığını belirtiyor ve doğrulama için bir bağlantıya tıklamanızı istiyor.", dangerType: "Taklitçilik Yoluyla Oltalama", icon: Link2, options: [{ text: "Linke tıklar ve bilgilerimi girerim.", isCorrect: false },{ text: "Resmi uygulama veya telefon numarasından bankayla iletişime geçerim.", isCorrect: true }], explanation: "Alan adı sahte. Ziraat Bankası'nın resmi alan adı ziraatbank.com.tr'dir. Bu link, bilgilerinizi çalmak için sahte bir siteye yönlendirir." },
            { id: "story_3", scenario: "Bir SMS aldınız: 'Kargonuz teslim edilemedi. Adres teyidi için hemen giriş yapın: http://kargo-dogrula.net'", dangerType: "Smishing (SMS ile Oltalama)", icon: Smartphone, options: [{ text: "Linke tıklayarak teyit ederim.", isCorrect: false },{ text: "SMS'i görmezden gelir, resmi takip numarasını kullanırım.", isCorrect: true }], explanation: "Resmi kargo şirketleri bilinen alan adları kullanır (örn. ups.com.tr). Bu sahte link, cihazınıza kötü amaçlı yazılım yükleyebilir." },
            { id: "story_4", scenario: "Bir e-posta, Instagram hesabınızın telif hakkı ihlali nedeniyle 24 saat içinde silineceğini iddia ediyor. 'http://instagram-verify-help.net' adresindeki bir formu doldurmanızı istiyor.", dangerType: "Sosyal Medya Oltalaması", icon: Link2, options: [{ text: "İtiraz etmek için formu doldururum.", isCorrect: false },{ text: "E-postayı bildirir ve hesabımı uygulama üzerinden kontrol ederim.", isCorrect: true }], explanation: "Instagram'ın resmi alan adı instagram.com'dur. Link, hesabınızı çalmak için tasarlanmış sahte bir giriş sayfasına yönlendirir." },
            { id: "story_5", scenario: "Bir e-posta, Migros'tan 1000 TL'lik bir hediye çeki kazandığınızı söylüyor ve almak için 'http://mıgros-kampanya.org' adresine tıklamanızı istiyor.", dangerType: "Sahte Teklif (Benzer Alan Adı)", icon: Link2, options: [{ text: "Hediye çekimi almak için tıklarım.", isCorrect: false },{ text: "E-postayı silerim. Bu gerçek olamayacak kadar iyi.", isCorrect: true }], explanation: "Alan adında sahte bir karakter ('ı' yerine 'i') kullanılmıştır. Resmi site migros.com.tr'dir. Bu yaygın bir hiledir." },
            { id: "story_6", scenario: "Bir WhatsApp mesajı aldınız: 'WhatsApp kullanım süreniz doldu. Yenilemek için tıklayın: http://whatsapp-guncelle.app'", dangerType: "Aldatmaca/Kötü Amaçlı Yazılım Linki", icon: Link2, options: [{ text: "Yenilemek için linke tıklarım.", isCorrect: false },{ text: "Mesajı silerim.", isCorrect: true }], explanation: "WhatsApp ücretsizdir ve süresi dolmaz. Link sizi kötü amaçlı bir APK dosyası indirmeye zorlayabilir." },
            { id: "story_7", scenario: "Bilgisayarınızın risk altında olduğunu belirten ve 'security_update.exe' adlı bir ek içeren 'microsoftsupport@update-secure.net' adresinden bir e-posta aldınız.", dangerType: "Ek Üzerinden Kötü Amaçlı Yazılım", icon: FileCode, options: [{ text: "Bilgisayarımı güvence altına almak için eki çalıştırırım.", isCorrect: false },{ text: "E-postayı derhal silerim.", isCorrect: true }], explanation: "Resmi yazılım güncellemeleri asla e-posta eki olarak gönderilmez. .exe dosyası, büyük olasılıkla bir virüs olan çalıştırılabilir bir dosyadır." },
            { id: "story_8", scenario: "Vergi dairesinden bir dilekçe olduğunu iddia eden 'vergi_icin_dilekce.pdf.exe' adlı bir dosya içeren bir e-posta aldınız.", dangerType: "Kötü Amaçlı Dosya (Çift Uzantı)", icon: FileCode, options: [{ text: "Dilekçeyi görmek için 'PDF'yi açarım.", isCorrect: false },{ text: ".exe uzantısını fark edip silerim.", isCorrect: true }], explanation: "Bu klasik bir hiledir. Dosya bir PDF değil, güvenli görünmesi için sahte bir '.pdf' adıyla gizlenmiş çalıştırılabilir bir dosyadır (.exe)." },
            { id: "story_9", scenario: "İndirilenler klasörünüzde, bir sosyal güvenlik dökümü gibi görünen 'sgk_hizmet_dokumu2025.docm' adlı bir dosya buldunuz.", dangerType: "Kötü Amaçlı Yazılım (Zararlı Makro)", icon: FileCode, options: [{ text: "Açarım ve istenirse makroları etkinleştiririm.", isCorrect: false },{ text: ".docm zararlı makrolar içerebileceği için dosyayı silerim.", isCorrect: true }], explanation: "'.docm' dosyaları, otomatik olarak çalışıp bilgisayarınıza kötü amaçlı yazılım yükleyebilen komut dosyaları olan makrolar içerebilir." },
            { id: "story_10", scenario: "Bilinmeyen bir göndericiden gelen bir e-postada 'mehmet_resim.jpg.exe' adlı bir ek var.", dangerType: "Kötü Amaçlı Yazılım (Gizlenmiş Çalıştırılabilir Dosya)", icon: FileCode, options: [{ text: "Mehmet'in resmini görmek için dosyayı açarım.", isCorrect: false },{ text: "E-postayı silerim, bu bir virüs.", isCorrect: true }], explanation: "Bu başka bir çift uzantı hilesidir. Bir JPG resmi gibi görünür, ancak bir virüs çalıştıracak olan çalıştırılabilir bir (.exe) dosyasıdır." },
        ],
        dailyTips: [
            { id: "tip1", title: "SMS Spam Nasıl Şikayet Edilir?", content: "İstenmeyen SMS'leri yetkililere bildirebilirsiniz. Türkiye'de, İstenmeyen SMS Şikayet Sistemi'ne e-Devlet üzerinden veya Ticari Elektronik İleti Yönetim Sistemi (İYS) üzerinden şikayette bulunabilirsiniz.", icon: Lightbulb },
            { id: "tip2", title: "Her Yerde Farklı Şifre Kullanın", content: "Birden fazla web sitesi için aynı şifreyi kullanmaktan kaçının. Bir site saldırıya uğrarsa, tüm hesaplarınız savunmasız kalır. Parola yöneticisi kullanın.", icon: Lightbulb },
            { id: "tip3", title: "İki Faktörlü Kimlik Doğrulamayı (2FA) Etkinleştirin", content: "2FA, ekstra bir güvenlik katmanı ekler. Birisi şifrenizi çalsa bile, telefonunuz olmadan giriş yapamazlar.", icon: Lightbulb }
        ],
        phishingTypes: [
            { title: "Oltalama (Phishing)", description: "Oltalama, elektronik bir iletişimde güvenilir bir kurum gibi davranarak kullanıcı adları, şifreler ve kredi kartı bilgileri gibi hassas bilgileri elde etmeye yönelik sahtekarlık girişimidir.", icon: Fish },
            { title: "Hedefli Oltalama (Spear Phishing)", description: "Bu, saldırganların kurbanlarını araştırdığı ve kişiselleştirilmiş e-postalar hazırladığı, son derece hedefli bir oltalama türüdür. Mesaj, güvenilir bir kaynaktan geliyormuş gibi görünür, bu da onu daha inandırıcı ve tespit edilmesi daha zor hale getirir.", icon: UserCheck },
            { title: "Smishing (SMS Oltalama)", description: "Smishing, kullanıcıları sahte linklere tıklamaya, kötü amaçlı yazılım indirmeye veya hassas bilgileri ifşa etmeye yönlendirmek için kötü niyetli metin mesajları kullanır. Bu mesajlar genellikle sahte bir paket teslimat bildirimi gibi bir aciliyet duygusu yaratır.", icon: Smartphone },
            { title: "Vishing (Sesli Oltalama)", description: "Vishing, saldırganların kişileri telefon üzerinden kişisel veya finansal bilgilerini vermeleri için kandırmak amacıyla bir banka veya devlet kurumu gibi güvenilir bir kurumu taklit ettiği telefon görüşmelerini içerir.", icon: Phone },
            { title: "Kötü Amaçlı Yazılım (Malware)", description: "Kötü amaçlı yazılım, bir bilgisayara, sunucuya, istemciye veya bilgisayar ağına zarar vermek, özel bilgileri sızdırmak, bilgi veya sistemlere yetkisiz erişim sağlamak veya kullanıcıları bilgiye erişimden mahrum bırakmak amacıyla kasıtlı olarak tasarlanmış herhangi bir yazılımdır.", icon: ShieldOff },
            { title: "Fidye Yazılımı (Ransomware)", description: "Fidye yazılımı, fidye ödenmediği takdirde kurbanın kişisel verilerini yayınlamakla veya bu verilere erişimi kalıcı olarak engellemekle tehdit eden bir tür kötü amaçlı yazılımdır. Dosyalarınızı şifreler ve şifre çözme anahtarı için para talep eder.", icon: KeyRound },
            { title: "DDoS Saldırısı", description: "Dağıtılmış Hizmet Engelleme (DDoS) saldırısı, hedeflenen bir sunucuyu, hizmeti veya ağı, hedefi veya çevresindeki altyapıyı bir internet trafiği seliyle boğarak normal trafiği bozmaya yönelik kötü niyetli bir girişimdir.", icon: ServerCrash },
            { title: "Ortadaki Adam (MitM) Saldırısı", description: "Bir MitM saldırısı, bir saldırganın, birbirleriyle doğrudan iletişim kurduklarına inanan iki taraf arasındaki iletişimi gizlice aktarması ve muhtemelen değiştirmesidir. Bu, halka açık Wi-Fi ağlarında yaygındır.", icon: BetweenHorizonalEnd },
            { title: "SQL Enjeksiyonu", description: "Bir SQL enjeksiyonu saldırısı, istemciden uygulamaya gelen girdi verileri aracılığıyla bir SQL sorgusunun eklenmesinden oluşur. Başarılı bir SQL enjeksiyonu, veritabanından hassas verileri okuyabilir.", icon: DatabaseZap },
            { title: "Kimlik Bilgisi Doldurma (Credential Stuffing)", description: "Bu, çalınan hesap kimlik bilgilerinin (kullanıcı adları ve şifreler), büyük ölçekli otomatik oturum açma istekleri yoluyla kullanıcı hesaplarına yetkisiz erişim sağlamak için kullanıldığı bir siber saldırı türüdür.", icon: KeyRound },
        ],
        educationSections: [
             { title: 'Etkileşimli Hikayeler', description: 'Gerçek hayat senaryolarından öğrenin.', link: '/education/stories', icon: BookOpen },
            { title: 'Hızlı Bilgi', description: 'Saniyeler içinde güvenlik ipuçları alın.', link: '/education/info', icon: ListTree },
            { title: 'Phishing Oyunu', description: 'Yeteneklerinizi yapay zekaya karşı test edin.', link: '/education/game', icon: Gamepad2 },
            { title: 'Saldırı Türleri', description: 'Yaygın oltalama yöntemlerini anlayın.', link: '/education/types', icon: ShieldAlert },
            { title: 'Manipüle Olma', description: 'Psikolojik taktikleri tanımayı öğrenin.', link: '/education/manipulation', icon: BrainCircuit },
            { title: 'Dikkat Et', description: 'Linkleri ve dosyaları kontrol etmeyi öğrenin.', link: '/education/attention', icon: SearchCheck },
        ]
    },
};

    