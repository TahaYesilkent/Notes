Ders Notları Yönetim Sistemi
Bu proje, öğrencilerin ders notlarını dijital ortamda verimli bir şekilde yönetebilmeleri için geliştirilmiş tam işlevli bir web uygulamasıdır. Kullanıcılar yeni notlar ekleyebilir, mevcut notları güncelleyebilir, zengin açıklamalar ve ilgili dosyalarla notlarını destekleyebilir, notlarını arşive taşıyarak düzenli tutabilir veya ihtiyaç duyduklarında arşivden geri yükleyebilirler. Uygulama, hem frontend hem de backend tarafında modern ve güncel teknolojiler kullanılarak geliştirilmiştir.

Projenin Amacı
Bu projenin temel amacı, öğrencilere ders notlarını kolayca organize edebilecekleri, yönetebilecekleri ve her an erişebilecekleri kullanıcı dostu bir platform sunmaktır. Fiziksel not dağınıklığını ortadan kaldırarak dijital bir çözüm sunan bu sistem, öğrencilerin ders çalışma süreçlerini daha verimli hale getirmeyi hedefler. Not ekleme, düzenleme, arşivleme ve dosya yükleme gibi temel özelliklerle birlikte, kullanıcı güvenliği ve veri bütünlüğü de ön planda tutulmuştur.

Teknolojiler
Frontend
Frontend tarafında React ve TailwindCSS kullanılarak responsive, kullanıcı dostu ve sade bir arayüz oluşturulmuştur.

React: Modern, bileşen tabanlı kullanıcı arayüzleri oluşturmak için kullanılan popüler bir JavaScript kütüphanesi.

TailwindCSS: Hızlı ve esnek UI geliştirmeyi sağlayan bir "utility-first" CSS çerçevesi.

Backend
Backend tarafında ASP.NET Core Web API kullanılarak güvenli ve performanslı bir REST API mimarisi kurulmuştur.

ASP.NET Core Web API: Çapraz platform desteği sunan, yüksek performanslı web API'leri oluşturmak için Microsoft'un açık kaynaklı çerçevesi.

JWT (JSON Web Token): Güvenli kimlik doğrulama ve yetkilendirme işlemleri için endüstri standardı bir yöntem.

Veritabanı: SQLite (geliştirme ve küçük ölçekli projeler için) veya MSSQL (üretim ortamları için) tercih edilebilir.

Dosya Yönetimi: Yüklenen dosyalar için wwwroot/uploads klasörü kullanılmaktadır.

Özellikler
Kayıt ve Giriş Sistemi: JWT ile korunan güvenli kullanıcı kayıt ve giriş akışı.

Not Erişimi: Kullanıcılar yalnızca kendi oluşturdukları notlara erişebilirler.

Not Oluşturma: Başlık, açıklama ve opsiyonel dosya yükleme alanları ile yeni notlar oluşturulabilir.

Not Yönetimi: Mevcut notlar güncellenebilir, silinmeden arşive taşınabilir (soft delete) veya kalıcı olarak silinebilir (hard delete).

Arşivleme: Arşivdeki notlar görüntülenebilir ve ihtiyaç halinde geri yüklenebilir.

Dosya Yükleme: Notlara ait PDF, Word veya TXT gibi çeşitli formatlarda dosyalar yüklenebilir ve indirilebilir.

Not Detayları: Notun başlığı, açıklaması ve ekli dosya bağlantıları özel bir sayfada detaylı olarak gösterilir.

Mobil Uyumluluk: Tüm kullanıcı arayüzü mobil cihazlara duyarlıdır ve tüm bileşenler Tailwind CSS ile stilize edilmiştir.

Uygulama Sayfaları
Login: Kullanıcı girişi yapılır.

Register: Yeni kullanıcı oluşturulur.

Dashboard: Tüm aktif notlar listelenir, düzenleme ve silme işlemleri yapılabilir.

Note Add: Yeni bir not eklenir.

Note Edit: Mevcut bir not güncellenir.

Note Details: Notun detayları görüntülenir ve arşive taşıma işlemi yapılabilir.

Archive: Arşivdeki notlar görüntülenir, kalıcı silme veya geri yükleme yapılabilir.

Profile: (Geliştirilmedi) Bu sayfa daha sonra kullanıcı bilgilerini (ad, soyad, şehir, doğum tarihi, şifre değişimi vb.) içerecek şekilde geliştirilecektir.

Backend (ASP.NET Core)
JWT Kimlik Doğrulama: Tamamen JWT tabanlı kimlik doğrulama sistemi.

Yapılandırma: Token süresi, anahtar ve diğer JWT parametreleri appsettings.json üzerinden kolayca yönetilebilir.

Swagger Desteği: API dökümantasyonu ve test için Swagger (OpenAPI) desteği aktiftir.

Dosya Yükleme: Dosya yükleme işlemleri multipart/form-data formatında güvenli bir şekilde yapılır.

Yetkilendirme: Tüm API uç noktaları yetkilendirme ([Authorize]) gerektirir, böylece yalnızca yetkili kullanıcılar erişebilir.

Soft Delete: Silinen notlar veritabanından tamamen silinmez, soft delete yöntemiyle arşive taşınır ve daha sonra geri yüklenebilir.

Dosya Yolları: Yüklenen dosyaların yolları wwwroot/uploads klasöründe tutulur.

Gelişmiş İşlemler: Yükleme (Upload), geri yükleme (Restore), arşivleme (Archive) ve kalıcı silme (Hard Delete) gibi gelişmiş işlemler desteklenmektedir.

Frontend (React + TailwindCSS)
Sayfa Yönlendirme: React Router ile dinamik ve SPA (Single Page Application) yapısına uygun sayfa yönlendirmeleri yapılır.

Kullanıcı Bildirimleri: SuccessModal ve ErrorModal bileşenleri ile kullanıcıya başarılı veya hatalı işlemler hakkında bilgilendirme yapılır.

Onay Kutuları: Modal bileşeni, silme ve arşive taşıma gibi kritik işlemler için kullanıcı onayı almak amacıyla kullanılır.

Responsive Tasarım: Tüm sayfalar responsive yapıdadır, farklı ekran boyutlarına otomatik olarak uyum sağlar.

Kullanıcı Deneyimi: hover, transition efektleri, yüklenme animasyonları, fade-in, shadow, scale gibi Tailwind animasyonları ile kullanıcı deneyimi artırılmıştır.

Dosya Yükleme Validasyonu: Dosya yükleme alanı sadece belirli uzantılara (örneğin .pdf, .doc, .docx, .txt) sahip dosyaları kabul eder.

Kurulum ve Çalıştırma Adımları
Bu projeyi yerel makinenizde kurmak ve çalıştırmak için aşağıdaki adımları izleyin:

Projeyi Klonlayın:

Bash

git clone https://github.com/kullaniciAdi/ders-notlari-app.git
cd ders-notlari-app
Backend Kurulumu ve Çalıştırma:

src/Backend/DersNotlariApp.Api dizinine gidin.

ASP.NET Core Web API projesini tercih ettiğiniz IDE'de (örneğin Visual Studio veya VS Code) açın.

appsettings.json dosyası içinde veritabanı bağlantı dizesini (ConnectionStrings) ve JWT ayarlarını (JwtSettings) kendi ortamınıza göre yapılandırın.

Proje dizininde terminali açın ve bağımlılıkları yükleyin:

Bash

dotnet restore
Projenizi başlatın:

Bash

dotnet run
Varsayılan olarak API, https://localhost:7001 (veya benzer bir port) üzerinde çalışacaktır. Swagger UI'a https://localhost:7001/swagger adresinden erişebilirsiniz.

Frontend Kurulumu ve Çalıştırma:

src/Frontend/ders-notlari-app-ui dizinine gidin.

Bağımlılıkları yükleyin:

Bash

npm install
React uygulamasını başlatın:

Bash

npm run dev
Varsayılan olarak frontend uygulaması http://localhost:5173 (veya farklı bir port) üzerinde çalışacaktır.

Not: Dosya yükleme klasörünün (wwwroot/uploads) düzgün çalışabilmesi için, backend projesinin wwwroot dizini altında uploads klasörünün mevcut olduğundan emin olun. Gerekirse bu dizini manuel olarak oluşturabilirsiniz.

API Uç Noktalarının Açıklamaları
Aşağıda projenin temel API uç noktaları ve işlevleri listelenmiştir. Detaylı istek/cevap modelleri için Swagger UI'a başvurabilirsiniz.

Kimlik Doğrulama (Authentication)
POST /api/Auth/register:

Açıklama: Yeni bir kullanıcı kaydı oluşturur.

Gerekli: username, password.

Yanıt: Başarılı kayıt durumunda kullanıcı bilgileri veya hata mesajı.

POST /api/Auth/login:

Açıklama: Mevcut bir kullanıcının kimliğini doğrular ve bir JWT döner.

Gerekli: username, password.

Yanıt: Başarılı giriş durumunda JWT ve kullanıcı bilgileri.

Notlar (Notes)
Tüm not API uç noktaları yetkilendirme ([Authorize]) gerektirir. İsteğin Authorization başlığında geçerli bir JWT taşınması zorunludur.

GET /api/Notes:

Açıklama: Yetkili kullanıcının tüm aktif (arşivde olmayan) notlarını listeler.

Yanıt: Not listesi.

GET /api/Notes/{id}:

Açıklama: Belirtilen ID'ye sahip notun detaylarını getirir.

Parametre: id (GUID) - Notun benzersiz tanımlayıcısı.

Yanıt: Not detayları.

POST /api/Notes:

Açıklama: Yeni bir not oluşturur. Başlık, açıklama ve opsiyonel olarak bir dosya alabilir.

Gerekli: Title, Description (isteğe bağlı), File (isteğe bağlı - multipart/form-data).

Yanıt: Oluşturulan notun detayları.

PUT /api/Notes/{id}:

Açıklama: Belirtilen ID'ye sahip notu günceller.

Parametre: id (GUID) - Güncellenecek notun ID'si.

Gerekli: Title, Description (isteğe bağlı), File (isteğe bağlı - multipart/form-data).

Yanıt: Güncellenen notun detayları.

POST /api/Notes/{id}/archive:

Açıklama: Belirtilen ID'ye sahip notu arşive taşır (soft delete).

Parametre: id (GUID) - Arşivlenecek notun ID'si.

Yanıt: Başarılı işlem mesajı.

DELETE /api/Notes/{id}/hardDelete:

Açıklama: Belirtilen ID'ye sahip notu veritabanından kalıcı olarak siler.

Parametre: id (GUID) - Kalıcı olarak silinecek notun ID'si.

Yanıt: Başarılı işlem mesajı.

Arşiv (Archive)
Tüm arşiv API uç noktaları yetkilendirme ([Authorize]) gerektirir.

GET /api/Archive:

Açıklama: Yetkili kullanıcının arşivlenmiş tüm notlarını listeler.

Yanıt: Arşivlenmiş not listesi.

POST /api/Archive/{id}/restore:

Açıklama: Belirtilen ID'ye sahip arşivlenmiş notu aktif notlara geri yükler.

Parametre: id (GUID) - Geri yüklenecek notun ID'si.

Yanıt: Başarılı işlem mesajı.

Dosyalar (Files)
GET /api/Files/download/{fileName}:

Açıklama: Belirtilen dosya adıyla wwwroot/uploads klasöründen bir dosyayı indirir.

Parametre: fileName (string) - İndirilecek dosyanın adı.

Yanıt: Dosya içeriği.

Geliştirici Notları
Bu proje, temel bir eğitim amaçlı not yönetim sistemi örneğidir. Üretim ortamında kullanıma sunulmadan önce güvenlik, hız, hata yönetimi ve ölçeklenebilirlik gibi alanlarda birçok iyileştirme yapılabilir.

Şu an için kullanıcılar yalnızca kendi verilerine erişebilir.

İlerleyen sürümlerde e-posta doğrulama, parola sıfırlama, rol tabanlı yetkilendirme ve kullanıcı profili düzenleme gibi özellikler eklenebilir.
