# pxl [![Oluştur](https://github.com/egeesin/pxl/actions/workflows/build.yml/badge.svg)](https://github.com/egeesin/pxl/actions/workflows/build.yml) [![GH Pages'e dağıt](https://github.com/egeesin/pxl/actions/workflows/deploy-gh-pages.yml/badge.svg)](https://github.com/egeesin/pxl/actions/workflows/deploy-gh-pages.yml) [![StackBlitz'te  aç](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/egeesin/pxl) <img class=left src=static/asset/logo.gif width=71px align=right alt="Gösterişli 'pxl' yazılı pikselli logo." />
> 👾 Uygun varsayılanlara ve güzel görünümlere sahip, ayarlanabilir taslak-ımsı bir statik site teması. *(ˈpik-səl)*
<img class=center src=static/screenshot.webp alt="Her iki aydınlık ve karanlık temadaki birden fazla renk şemasının önizlemesini gösteren statik site temasının bir ekran görüntüsü." />

[English 🇬🇧](https://github.com/egeesin/pxl/blob/main/README.md) | Türkçe 🇹🇷

**Not:** Bu proje ağır geliştirme sürecinde, biçimlendirme temelleri ilk büyük sürüm çıkışına kadar değişebilir. Sürüm etiketlerinin arasında stiller/betikler bozulabilir. Sadece ne yaptığınızı biliyorsanız kullanın.

## Özellikler 
- 🥇 Önden [HTML](https://youtu.be/ok-plXXHlWw) ve Anlamsal <a href="https://youtu.be/OEV8gMkCHXQ">CSS</a>; sonra yalnızca esnek anahatlar, erişilebilirlik özellikleri için framework'süz JavaScript (nam-ı diğer [Aşamalı İyileştirme](https://en.wikipedia.org/wiki/Progressive_enhancement))
	- Dikey ritim, birimsel ölçeklendirme, esnek metin kontrastı ile iyileştirilmiş okunabilirlik.
	- [CSS mantıksal özellikleriyle](https://css-tricks.com/css-logical-properties-and-values/) temel çift yönlü metin desteği
	- [Sanitize.css](https://github.com/csstools/sanitize.css) ile CSS sıfırlaması
	- [*Every Layout*](https://every-layout.dev)'tan Anahat İlkelleri
- 🎈 Liquid [taslak diliyle](https://shopify.dev/docs/api/liquid#what_is_a_template_language) yazılmış [11ty](https://11ty.dev) uyumlu taslaklar 
	- [PostHTML](https://github.com/posthtml/posthtml#readme) ve uyumlu eklentileri ile işlenen taslakların düz versiyonu
- 🌗 Aydınlık ve karanlık mod desteği
	- İlk sistem tercihine göre otomatik seçer, [drkmd.js](https://github.com/BetaHuhn/drkmd.js#readme) ile temayı kapa aç yapmanı sağlar
	- Her modun [Solarized](https://github.com/altercation/solarized#readme), [Gruvbox](https://github.com/morhetz/gruvbox), [One Dark UI](https://github.com/atom/one-dark-ui#readme) gibi kendi renk şema tercihleri var.
	- Her renk şemasının [Tinted Theming](https://github.com/tinted-theming/schemes) base16 şemalarından düzenlenmiş ve dönüştürülmüş farklı gölgelendirmesi, katmanları ve 6 + 2 renk tonu var.
- 🎛 Bir sürü tarz niteleyicileri ile cisimler ve bileşenler 
	- Hat/dış hat kalınlığı, köşe yuvarlaklığı, gölge/kapartma efektleri gibi kap makyajlamaları
	- Anasayfa anahattında varsayılan olarak uyumlu kargir yapı anahattı ve gezinim bileşeni
	- Tüm platformlarda sabit ve tam ekranda olabilecek harmanlama ekleme, tanecik/renk eğim efektleri tercihen harici arkaplanlar
	- Zincirleme niteleyicili [BEM](https://getbem.com/naming/) sınıf isimlendirmesi ve kodu hem insanlara hem ağ tarayıcılarına daha okunabilir kılmak için [diğer](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) ince ayarlar 
- 👷 Oluşturmak ([PostCSS](https://github.com/postcss/postcss-cli#usage) + [Lightning CSS](https://github.com/onigoetz/postcss-lightningcss#readme), [PostHTML](https://github.com/posthtml/posthtml-cli#readme)), doğrulama ([html-validate](https://html-validate.org/usage/cli.html), [biome](https://biomejs.dev/analyzer/#import-sorting-via-cli)), eniyileme ([htmlnano](https://htmlnano.netlify.app/), [swc](https://swc.rs/), [svgo](https://github.com/svg/svgo), Lightning CSS, [sharp](https://sharp.pixelplumbing.com/)) ve PNPM betiklerindeki medya dosyaları ve biçimlendirme, stil, betik için dosya izleme işleri ([chokidar](https://github.com/paulmillr/chokidar#readme) aracılığıyla) 
- ⚡️ [11ty](https://www.11ty.dev/docs/watch-serve/#eleventy-dev-server)'den yerel, canlı ve sade geliştirme sunucusu from [11ty](https://www.11ty.dev/docs/watch-serve/#eleventy-dev-server)

## Denemeler
- [GitHub Pages](https://pxl.egeesin.com)
- [PageSpeed Insights](https://pagespeed.web.dev/report?hl=tr&url=https://pxl.egeesin.com)

## Kurulum

### 📦 Kaynaktan Oluştur
**Öngereksinimler**
- [Node.js 18 LTS, 20 LTS veya sonrası](https://nodejs.org/en/download)
- [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [`pnpm`](https://pnpm.io/installation)

**Note:** Windows'ta Node modüllerine bağımlı işlerle çalışmak için [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)'i veya [Windows için Git](https://git-scm.com/download/win)'i kur. Eğer Windows için Git'le ilerlemek istersen, bu yapılandırmayı [ayarla](https://pnpm.io/cli/run#script-shell). `pnpm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"`

Bir terminal emülatörü aç (Windows'ta başlat tuşuna sağ tıklayıp, "Windows PowerShell"i seç ya da macOS'te, `⌘+Boşluk`a basıp "Terminal.app" yaz) ve aşağıdaki komutları takip et:

```sh
# Depoyu klonla ve dizini değiştir
git clone https://github.com/egeesin/pxl && cd pxl

# Install local Node modules of the repository
# Yerel Node modüllerini kur
pnpm i

# İlk yapımı oluştur (pnpm build) ve geliştirici sunucusunu başlat (pnpm watch)
pnpm start

# Sunucu bir kere çalıştığında, bir ağ tarayıcısının adres çubuğuna "http://localhost:3000" veya "http://127.0.0.1:3000" yaz. Geliştirici sunucusunu yerel ağ üzerinden farklı cihazlarda test yapmak için, başka konağa erişmek için terminal kayıtlarını kontrol et. (192.168.1.xxx:3000 gibi)
```

### ☁️  Dağıtım
**Uyarı:** Bu dağıtım tercihlerinden hiçbiri henüz test edilmedi. Eğer ne yaptığınızı biliyorsanız kullanın.

- Üretim dalı: `main`
- Oluşturma komutu: `pnpm build`
- Geliştirme komutu: `pnpm build`
- Kurulum komutu: `pnpm i`
- Yapım dizini: `dist`

[![CloudCannon'a dağıt](https://buttons.cloudcannon.com/deploy.svg)](https://app.cloudcannon.com/register#sites/connect/github/egeesin/pxl)
[![Vercel ile dağıt](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fegeesin%2Fpxl)
[![Netlify'a dağıtma tuşu](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/egeesin/pxl)
[Cloudflare Pages'a dağıt](https://developers.cloudflare.com/pages/framework-guides/deploy-an-eleventy-site/#deploy-with-cloudflare-pages)

### 🐙 Yapım Eserini İndir
1. Ana [depo](https://github.com/egeesin/pxl) sayfasından [**Actions**](https://github.com/egeesin/pxl/actions) sekmesini seç.
2. Listenin en üstünde yeşil tikli en son başarılı iş akışı çalışmasını bul ve tıkla.
3. En aşağı sürükle ve yapım eserlerini (`dist/`) indir.

## Kullanım
*Kurulum* bölümünde bu projeyi çoğalttıktan/çatalladıktan sonra aşağıdaki adımları takip et:

### 🧹 Temizleme Adımları
- [ ] `package.json`'ın içinde "author" (yazar), "repository"  (depo), "funding"in (fonlamanın) içeriğini temizle.
- [ ] `view/media/` ve `view/_content/blog/article/`'ın içindeki dosyaları temizle (Eğer yeni gönderiler için kopyalayacak taklit bir Markdown gönderisine ihtiyacın varsa bir tanesini tut.)
- [ ] (Tercihen) Eğer tema bileşenlerini test etmekle ilgilenmiyorsan `plain/`'i kaldır ve Node ortamını "production" (üretim) olarak ayarla. ("plain" içeren tüm işler oluşturma komutunda atlanmalı!)
- [ ] (Tercihen) Eğer hazır simge setini kullanmıyorsan, `src/icon/`'un içindeki dosyaları da temizle.
- [ ] Daha çok adım eklenecek…

### ✅ Olmazsa Olmazların Kontrol Listesi
- [ ] Başlık, favori simge, yazar, sosyal bağlantılar gibi bütünsel site bilgileri için, `view/_data/site.json`'u düzenle.
- [ ] Gezinim ögeleri için, `view/_data/nav.json`'u düzenle.
- [ ] Gönderi içeriği için Markdown dosyalarını `view/_content/blog/article`a aktar. (örn. `./2024-02-24-gonderi-baslik.md`) Taklit Markdown gönderisindeki gibi Front Matter bilgilerinin bulunduğundan emin ol. Eğer WordPress'ten geçiş yapıyorsanız, yönetici panelinden XML yedeğini alıp toplu Markdown dosyaları halinde [dönüştürün](https://github.com/lonekorean/wordpress-export-to-markdown).

- [ ] (Tercihen) Siteyi Aşamalı Ağ Uygulaması'na (PWA'ya) dönüştürmek için, `view/app.webmanifest.liquid`i düzenle.
- [ ] (Tercihen) CSS stillerinin üzerine yazmak için, `static/style/shame.css`'i düzenle. Aynı zamanda `static/style/index.css`'te `@import` yapmayı unutmadığınız sürece başka bir CSS dosyası oluşturabilir. `@import-glob` da [geçerli](https://github.com/dimitrinicolas/postcss-import-ext-glob).
- [ ] Daha çok adım eklenecek…

### 🎨 Tema Tadilatı
- [ ] [Burada](https://pxl.egeesin.com/plain/) görüldüğü üzere tadilatları keşfedin.
- [ ] Zevkinize göre `view/_data/site.json`'da `rootClasses` ve `bodyClasses` kısımlarını düzenleyin.
- [ ] (Tercihen) Sayfa başına tema tadilatını zorlamak için `appendRootClass` veya `appendBodyClass` gibi Front Matter bilgilerini kullanın.
- [ ] Daha çok adım eklenecek…

### 🖥️ Komut Satırı Arayüzü Betikleri
- `pnpm build`: Üretim/geliştirme dizini oluştur
- `pnpm watch`: Üretim/geliştirme dizini izle ve geliştirme sunucusunu sun
- `pnpm upmod`: Bağımlılıkları ve package.json'u güncelle
- `pnpm debug:11ty`: Eleventy oluşturma işinden hata ayıklama mesajlarını aktar
- `pnpm "/^optimize:.*/"`: "optimize:" ile başlayan betikleri güzel bir çıktıyla paralel bir şekilde çalıştırır.
- `pnpm exec browserslist | pbcopy`: Panonuza en az desteklenen tarayıcı sürümlerinin listesini kopyalar böylece bunu [Can I Use?](https://caniuse.com/ciu/settings#browsers)'a kolayca yeni bir set olarak içe aktarabilirsiniz. (macOS'un kabuk ortamında çalışır, değişik pano aracı kullanmak için "pbcopy" kısmını değiştirin)
**Not:** `package.json`'da daha çok PNPM çalıştırma betiklerine göz atın.

#### Alakalı 3. Parti Komutlar
- `cloc <path-to-directory> --exclude-dir=node_modules,tmp,dist,.git,utility --exclude-ext=svg,png,jpg,jpeg,webp,tif,ico`: Eğer [`cloc`](https://github.com/AlDanial/cloc)'a sahipseniz, girdi dizinindeki toplam kod satırlarını ölçün.

### 🔑 Ortam Değişkeni
- `WEBMENTION_IO_TOKEN`

## Tasarım
İlk başta, pxl günce tutma, portfolyo ve değişik içerik türleri için kişisel bir ağ teması olarak yapıldı. Ama geliştirme devam ettikçe, karışıklığı ve ölçeklenebilirliği halletmek için farklı CSS yöntemleri ve tasarım sistemleri uygulandı.

### CSS Yöntemi

Zaman sırasına göre BEM (`blok--eleman__niteleyici`) adlandırma kuralı, ITCSS (Ters Üçgen CSS) dosya yapısı, BEMIT (BEM + ITCSS) ve Harry Roberts'tan diğer görünmez arayüz ad alanları, BEVM'den zincirlenebilir nitelikler ve İçsel Ağ Tasarımı (Jen Simmons, Heydon Pickering ve Andy Bell'den etkilenilmiştir) pxl'in dayandığı tasarımlardır.

#### Yöntemlerin Üzerine Anlam Çıkarmak
[ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)'den dizin ve öznellik hiyerarşisi, [BEM](https://getbem.com/naming/)'den blok ve elemen adlandırması, [BEVM](https://www.slideshare.net/Jyaasa/bevm-blockelementvariation-modifier))'den zincirlenebilir niteleyiciler, [ABEM]'den camelCase ad gruplar seçili tasarımlar olduğu gibi uygulananlardır.

[BEMIT](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/)'den Harry Roberts'ın ad alanları (objeler, bileşenler, araçlar, tema, kapsam, JS durumları ve hackler) ve İçsel Ağ Tasarımı; kurcalanılması gereken veya bir arada varolmalarının uygun olması ve bu projeyi daha erişilebilir kılmak amacıyla sadece ayrıştırıcı kısımları seçilen, etkilenmiş tasarımlardır.

### Dizin Yapısı

- Kök dizin bu deponun hangi dosyaları hariç tutacağı, lisansı ve README sayfası gibi üstveriler üzerine bilgi içerir.
- `view/` dizini içinde, [11ty](https://11ty.dev) denilen framework bilmez statik site oluşturucusu ile işlenen HTML veya Markdown içeriğinin üzerinde Liquid taslakları, JSON ağ sitesi verisi, dönüştürme/filtreleme betikleri ve CMS medya dosyaları var. Bu dizin, üretim için zorunlu.
- `static/`'in içinde stil sayfaları, betikler, vektör simgeler ve yer tutucu görüntüler var. Stil sayfaları (`static/style/`), PostCSS eklentileri + (bir PostCSS eklentisi olarak) LightninCSS tarafından işlenir ve aynı zamanda CSS'in farklı kapsamlarını sınıflandırmak ve vurgulamak amacıyla alt dizinlere sahiptir.
	- `static/style/index.css` tüm stillerin ana dosyasıdır. `postcss-import` ve `postcss-import-ext-glob` eklentileriyle oluşturulurken, globlarla tanımlanmış karşılığı gelen alt dizinlerin içindeki her bir sınıflandırılmış stil *aktarılır* ve A'dan Z'ye tek bir CSS dosyasında birbirine bağlanır.

	- `static/style/_vendor/` veya `node_modules`'tan edinilmiş herhangi bir diğer 3. parti CSS dosyaları, CSS sıfırlamasından hemen önce içermek için bulunur.
	- `static/style/abstract/` içindeki stiller, mixin'leri, özel özellikleri (değişkenleri), animasyon tanımları ve aydınlık/karanlık modları için çokça renk şemalarını içerir. Bu stiller	biçimlendirmenin içinde ne olduğu farketmeksizin her sayfanın görünüşünü, boşluğunu, tipografisini etkiler.
	- `static/style/base/` önyargılı CSS sıfırlamaları, tema niteleyicilerini, varsayılan HTML stillerini, formlar, satır içi elemanlar, ızgara anahatları ve yeniden kullanılabilen bileşenleri içerir.
	- `static/style/class/` gezinimler, kartlar, kareler, başlıklar ve harici arkaplanlar gibi biraz daha sıkı bileşenler içerir.
	- `static/style/shame.css`, en son seviyede, deneysel, sınıflandırılmamış stillerdir. `shame.css`'teki stil tanımları; yeniden adlandırmalara, silinmeye veya ileride daha alakalı CSS dosyasına taşınmasına meyillidir.
- `static/script/`; gezinim ve *paslı* ızgara bileşeninin belirlenmiş stil niteleyicilerini uygulamak için istemci taraflı fonksiyonları ve etkinlik dinleyicileri vardır. Görüş alanı boyutuna göre veya ekran okuyucularına daha iyi erişilebilirlik sağlamak için önemli elementlerin ARIA niteliklerini güncellemek için bu betik(ler) uygulanır. Üretim için `main.js` ve sadece geliştirme için `test.js`.
- `static/asset/` ağ yazı tipi ve yer tutucu görüntüler gibi gerekli medya dosyalarına sahiptir.
- `static/icon/` Affinity Designer taslak dosyasından (bu depoda henüz yok) dışa aktarılmış SVG vektör dosyalarına sahiptir. Bunlar daha sonra tek bir `<symbol>` bağımsız görüntü sayfası (spritesheet) işlemek içindir.
- `config/`; kaynak dosyalarını kontrol etmeye, izlemeye, oluşturmaya ve eniyilemeye kabiliyeti olan Node modüllerinin yapılandırmalarının tamamının bulunduğu bir yerdir.

- `plain/` dizinindeki *düz* HTML dosyaları, geliştirme ve tekrarlanan biçimlendirmeyi azaltmak ve başlığı/altlığı düzenlemeyi kolaylaştırmak adına PostHTML eklentileri tarafından işlenecek bölümler içindir. Dizin; değişik bileşenlerin, taklit içerikli anahatların, renk tablosunun, tüm HTML elemanlarının eviyesinin temel yapılarını içerir. Bu dizin, Liquid dışında diğer taslak dilleriyle özel tasarımlar yapmak için varolan düz HTML dosyalarını incelemek veya kurcalamak isteyenlere üretim için isteğe bağlıdır.
	- `plain/_include/` önceden bahsettiğim bölümlerdir.
	- `plain/class/`'taki taslaklar yeniden kullanılabilen bileşenlerin, ızgaraların ve anahat ilkellerinin biçimlendirmesini içerir.
	- `plain/example/` renk şema tablosunun örneklerini, tüm sınıfsız HTML5 elementlerini ve simge önizlemesi içerir.

### Tipografi
Çoğu paragraf ve başlıklar gibi satıriçi elemanlar, ayarlanmış bir birimsel ölçeklendirme üzerinden boyutlandırılır. Her elemanın tek dikey boşluk birimi veya birden fazla (`var(--typeScale…)`) bütün sayfa boyunca dikey ritimi yerinde tutma sahiptir.

Varsayılan yazı tipleri altkümeli ve her iki [Inter](https://rsms.me/inter/) ve [Iosevka](https://typeof.net/Iosevka/)'nın OpenType özelliği/biçimsel seti dondurulmuş versiyonudur. Alternatif olarak sistem yazı tipi yığını var ama farklı tarzlar için popüler işletim sistemlerinde çalışması gererekn farklı yazı tipi yığınları da var. Farklı yazı tipi yığınları için `static/style/abstract/01-font.css`e göz at.

### Esnek Tasarım için Medya Kesim Noktaları
Varsayılan olarak mobil öncelikli esnek tasarım yaklaşımı kullanılır ve farklı [insan ergonomiklerine](https://x.com/lukew/status/273453112902172672) uyan farklı ekran boyutlarıyla geliştirilir.
- 🤝 bilek (akıllı saatler, <2inç),
- 🤲 avuç (akıllı telefonlar, *phablet*ler, ≥640px),
- 🦵 diz (dikey moddaki tabletler,, ≥960px),
- 🖥️ masa (yatay moddaki tabletler, dizüstüler, masaüstü PC'ler, ≥1280px) ve
- aşağıdaki gibi abartılmış özel medya özellikleri:
	- 🖼️ duvar (masaüstü PC, tam yüksek çözünürlüklü ekranlar, ≥1600px)
	- 🏬 bina (2K ekranlar, ≥1920px) and,
	- 🦖 devasa (ultra geniş monitörler, 4K ekranlar, ≥2400px)

### Tarayıcı Desteği
%0.5'e veya daha yüksek global kullanıma sahip (Opera Mini ve diğer eskimiş tarayıcılar haricinde) tüm ağ tarayıcıları  desteklidir. `package.json`'daki `browserslist` kısmını inceleyin. Destekli tarayıcıların güncel listesi [burada](https://browserslist.dev/?q=Pj0gLjUlIGFuZCBub3QgZGVhZCBhbmQgbm90IG9wX21pbmkgYWxs) gösterilmiştir.

## Lisans
Bu proje [GNU Genel Kamu Lisansı 3.0](https://www.gnu.org/licenses/gpl-3.0.tr.html) lisanslıdır.
