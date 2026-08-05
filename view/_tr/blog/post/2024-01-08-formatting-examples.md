---
title: "Biçimlendirme Örnekleri"
date: "2024-01-08T12:30:00+00:00"
---

## [İçindekiler](https://github.com/nagaozen/markdown-it-toc-done-right)
+++ Tüm bölümleri görmek için genişletin
[toc]
+++
```
[toc]
```

<!--more-->

## Başlıklar

```md
# h1 Başlık
## h2 Başlık
### h3 Başlık
#### h4 Başlık
##### h5 Başlık
###### h6 Başlık
```

## Tipografi
### [Alt Simge](https://github.com/markdown-it/markdown-it-sub) / [Üst Simge](https://github.com/markdown-it/markdown-it-sup)

- 19^.
- H~2~O

```md
- 19^th^
- H~2~O
```

### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Eklenmiş metin++

```md
++Eklenmiş metin++
```

### [Dipnotlar](https://github.com/markdown-it/markdown-it-footnote)

Dipnot 1 bağlantısı[^first].

Dipnot 2 bağlantısı[^second].

Satır içi dipnot^[Satır içi dipnot metni] tanımı.

Tekrarlanan dipnot referansı[^second].

[^first]: Dipnot **biçimlendirme içerebilir**

    ve birden fazla paragraf kullanabilir.

[^second]: Dipnot metni.

```md
Dipnot 1 bağlantısı[^first].

Dipnot 2 bağlantısı[^second].

Satır içi dipnot^[Satır içi dipnot metni] tanımı.

Tekrarlanan dipnot referansı[^second].

[^first]: Dipnot **biçimlendirme içerebilir**

    ve birden fazla paragraf kullanabilir.

[^second]: Dipnot metni.
```

### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

==İşaretlenmiş metin==

```md
==İşaretlenmiş metin==
```

### [Klavye Giriş Öğesi](https://github.com/jGleitz/markdown-it-kbd)

[[↑]][[↑]][[↓]][[↓]][[←]][[→]][[←]][[→]][[B]][[A]]&nbsp;; bazen diziye [[Start]] veya [[Select]] de eklenir.

```md
[[↑]][[↑]][[↓]][[↓]][[←]][[→]][[←]][[→]][[B]][[A]]&nbsp;; bazen [[Start]] veya [[Select]] diziye eklenir.
```

### [Öznitelikler](https://github.com/arve0/markdown-it-attrs)

paragraf *beni biçimlendir*{.u-txtRed} daha fazla metin

```
paragraf *beni biçimlendir*{.u-txtRed} daha fazla metin
```

### Tipografik dönüşümler

Sonucu görmek için typographer seçeneğini etkinleştirin.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Akıllı çift tırnaklar" ve 'tek tırnaklar'

```md
Sonucu görmek için typographer seçeneğini etkinleştirin.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Akıllı çift tırnaklar" ve 'tek tırnaklar'
```

### [Emojiler](https://github.com/markdown-it/markdown-it-emoji)

> Klasik gösterim: :wink: :cry: :laughing: :yum:
>
> Kısayollar (ifadeler): :-) :-( 8-) ;)

```md
> Klasik gösterim: :wink: :cry: :laughing: :yum:
>
> Kısayollar (ifadeler): :-) :-( 8-) ;)
```

twemoji ile çıktının nasıl değiştirileceğini görmek için [buraya](https://github.com/markdown-it/markdown-it-emoji#change-output) bakın.

## Vurgu

**Bu kalın metindir**

__Bu kalın metindir__

*Bu italik metindir*

_Bu italik metindir_

~~Üstü çizili~~

```md
**Bu kalın metindir**

__Bu kalın metindir__

*Bu italik metindir*

_Bu italik metindir_

~~Üstü çizili~~
```

## Alıntılar

> Alıntılar iç içe de kullanılabilir...
>> ...bunun için ardışık büyüktür işaretleri kullanılabilir...
> > > ...veya işaretler arasına boşluk bırakılabilir.

```md
> Alıntılar iç içe de kullanılabilir...
>> ...bunun için ardışık büyüktür işaretleri kullanılabilir...
> > > ...veya işaretler arasına boşluk bırakılabilir.
```

## Listeler

Sırasız

+ Satıra `+`, `-` veya `*` ile başlayarak liste oluşturun
+ Alt listeler 2 boşluk girintilenerek oluşturulur:
  - İşaret karakterini değiştirmek yeni bir liste başlatır:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Çok kolay!

Sıralı

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

1. Ardışık sayılar kullanabilirsiniz...
1. ...veya tüm numaraları `1.` olarak bırakabilirsiniz

Başlangıç numarasını değiştirin:

57. foo
1. bar

[Sırasız Onay Kutusu Listesi](https://github.com/revin/markdown-it-task-lists)

- [ ] Liste Öğesi 1 işaretlenmedi
- [x] Liste Öğesi 2 işaretlendi
- [x] Liste Öğesi 3 işaretlendi
  - [ ] Alt Liste Öğesi 1 işaretlenmedi
  - [x] Alt Liste Öğesi 1 işaretlendi

```md
Sırasız

+ Satıra `+`, `-` veya `*` ile başlayarak liste oluşturun
+ Alt listeler 2 boşluk girintilenerek oluşturulur:
  - İşaret karakterini değiştirmek yeni bir liste başlatır:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Çok kolay!

Sıralı

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

1. Ardışık sayılar kullanabilirsiniz...
1. ...veya tüm numaraları `1.` olarak bırakabilirsiniz

Başlangıç numarasını değiştirin:

57. foo
1. bar

Onay Kutusu Listesi (Sırasız)

- [ ] Liste Öğesi 1 işaretlenmedi
- [x] Liste Öğesi 2 işaretlendi
- [x] Liste Öğesi 3 işaretlendi
  - [ ] Alt Liste Öğesi 1 işaretlenmedi
  - [x] Alt Liste Öğesi 1 işaretlendi
```

## Kod

Satır içi `kod`

Girintili kod

    // Bazı yorumlar
    kodun 1. satırı
    kodun 2. satırı
    kodun 3. satırı

*Adlandırılmış* kod bloğu

```js:hello.js
console.log("Hello World!")
```

Kod bloğu

```
Örnek metin burada...
```

Sözdizimi renklendirme

``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

Sözdizimi renklendirme

``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

## Tablolar

| Seçenek | Açıklama |
| ------ | ----------- |
| data   | Şablonlara aktarılacak verileri sağlayan veri dosyalarının yolu. |
| engine | Şablonları işlemek için kullanılacak motor. Varsayılan olarak Handlebars kullanılır. |
| ext    | Hedef dosyalar için kullanılacak uzantı. |

Sağa hizalı sütunlar

| Seçenek | Açıklama |
| ------:| -----------:|
| data   | Şablonlara aktarılacak verileri sağlayan veri dosyalarının yolu. |
| engine | Şablonları işlemek için kullanılacak motor. Varsayılan olarak Handlebars kullanılır. |
| ext    | Hedef dosyalar için kullanılacak uzantı. |

```md
| Seçenek | Açıklama |
| ------ | ----------- |
| data   | Şablonlara aktarılacak verileri sağlayan veri dosyalarının yolu. |
| engine | Şablonları işlemek için kullanılacak motor. Varsayılan olarak Handlebars kullanılır. |
| ext    | Hedef dosyalar için kullanılacak uzantı. |

Sağa hizalı sütunlar

| Seçenek | Açıklama |
| ------:| -----------:|
| data   | Şablonlara aktarılacak verileri sağlayan veri dosyalarının yolu. |
| engine | Şablonları işlemek için kullanılacak motor. Varsayılan olarak Handlebars kullanılır. |
| ext    | Hedef dosyalar için kullanılacak uzantı. |
```

## Bağlantılar

[bağlantı metni](http://dev.nodeca.com)

[başlıklı bağlantı](http://nodeca.github.io/pica/demo/ "başlık metni!")

[harici olmayan bağlantı metni](/)

Otomatik dönüştürülen bağlantı https://github.com/nodeca/pica (görmek için linkify'ı etkinleştirin)

```md
[bağlantı metni](http://dev.nodeca.com)

[başlıklı bağlantı](http://nodeca.github.io/pica/demo/ "başlık metni!")

[harici olmayan bağlantı metni](/)

Otomatik dönüştürülen bağlantı https://github.com/nodeca/pica (görmek için linkify'ı etkinleştirin)
```

## Görseller

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

```md
![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")
```

Bağlantılar gibi, görseller de dipnot benzeri sözdizimini destekler.

![Alternatif metin][id]

Belgenin ilerleyen kısmında URL şu şekilde tanımlanır:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"

```md
![Alternatif metin][id]

Belgenin ilerleyen kısmında URL şu şekilde tanımlanır:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"
```

## Yatay Çizgiler

___

---

***

```md
___

---

***
```

## Medya/Gömme

Şimdilik [markdown-it-video](https://github.com/vrcd-community/markdown-it-video)'nun en yeni çatallanması tarafından sağlanmaktadır.
Gömme işlemleri için doğrudan HTML de kullanılabilir.

### Yerel Video

@[video](/media/Big-buck-bunny_trailer.webm)

```md
@[video](/media/Big-buck-bunny_trailer.webm)
```

### Yerel Ses

@[audio](/media/Title Screen JP Version - Sonic the Hedgehog.mp3)

```md
@[audio](/media/Title Screen JP Version - Sonic the Hedgehog.mp3)
```

### YouTube Gömme

@[youtube](9bZkp7q19f0)

```md
@[youtube](9bZkp7q19f0)
```

Daha fazla seçenek [burada](https://github.com/vrcd-community/markdown-it-video)…

## Diğer

`markdown-it`, çeşitli [sözdizimi eklentilerini](https://www.npmjs.org/browse/keyword/markdown-it-plugin) destekler.

### [Özel kapsayıcılar](https://github.com/markdown-it/markdown-it-container)

::: warning
*burada ejderhalar var*
:::

```md
:::
*burada ejderhalar var*
:::
```

Not: Bu eklenti, kullanacağınız her kapsayıcı türü için yapılandırmada (`warning` gibi) bir tanım eklenmesini gerektirir.

### [Tanım listeleri](https://github.com/markdown-it/markdown-it-deflist)

Terim 1

:   Tanım 1
tembel devam satırıyla.

<!-- Term 2 with *inline markup* -->
<!---->
<!-- :   Tanım 2 -->
<!---->
<!--         { some code, part of Definition 2 } -->
<!---->
<!--     Tanım 2'nin üçüncü paragrafı. -->

_Kompakt stil:_

Terim 1
  ~ Tanım 1

Terim 2
  ~ Tanım 2a
  ~ Tanım 2b

```md
_Kompakt stil:_

Terim 1
  ~ Tanım 1

Terim 2
  ~ Tanım 2a
  ~ Tanım 2b
```

### [Kısaltmalar](https://github.com/markdown-it/markdown-it-abbr)

Bu, HTML kısaltması örneğidir.

"HTML" dönüştürülür ancak "xxxHTMLyyy" gibi kısmi kullanımlar olduğu gibi bırakılır.

*[HTML]: Hyper Text Markup Language

```md
Bu, HTML kısaltması örneğidir.

"HTML" dönüştürülür ancak "xxxHTMLyyy" gibi kısmi kullanımlar olduğu gibi bırakılır.

*[HTML]: Hyper Text Markup Language
```

### [Özet/Legend](https://github.com/bioruebe/markdown-it-collapsible)

+++ Bana tıkla!
Gizli metin
+++

```md
+++ Bana tıkla!
Gizli metin
+++
```
