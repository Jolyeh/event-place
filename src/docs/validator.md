# Validateur de chaînes – Liste des fonctions

- **contains(str, seed [, options])**  
  Vérifie si la chaîne contient la sous-chaîne `seed`  
  options par défaut : `{ ignoreCase: false, minOccurrences: 1 }`  
  • `ignoreCase` : ignorer la casse (défaut : false)  
  • `minOccurrences` : nombre minimum d'occurrences (défaut : 1)

- **equals(str, comparison)**  
  Vérifie si la chaîne est strictement égale à `comparison`

- **isAbaRouting(str)**  
  Vérifie si la chaîne est un numéro de routage ABA (États-Unis – banque/chèque)

- **isAfter(str [, options])**  
  Vérifie si la date représentée est postérieure à une date donnée  
  options par défaut : `{ comparisonDate: Date().toString() }`

- **isAlpha(str [, locale, options])**  
  Vérifie que la chaîne ne contient que des lettres (a-zA-Z)  
  locale par défaut : `'en-US'` (liste complète : `validator.isAlphaLocales`)  
  options : `{ ignore: string | RegExp }`

- **isAlphanumeric(str [, locale, options])**  
  Vérifie que la chaîne ne contient que lettres et chiffres (a-zA-Z0-9)  
  locale par défaut : `'en-US'` (liste complète : `validator.isAlphanumericLocales`)  
  options : `{ ignore: string | RegExp }`

- **isAscii(str)**  
  Vérifie que la chaîne ne contient que des caractères ASCII

- **isBase32(str [, options])**  
  Vérifie si la chaîne est encodée en base32  
  options par défaut : `{ crockford: false }`

- **isBase58(str)**  
  Vérifie si la chaîne est encodée en base58

- **isBase64(str [, options])**  
  Vérifie si la chaîne est encodée en base64  
  options par défaut : `{ urlSafe: false, padding: true }`

- **isBefore(str [, options])**  
  Vérifie si la date représentée est antérieure à une date donnée  
  options par défaut : `{ comparisonDate: Date().toString() }`

- **isBIC(str)**  
  Vérifie si la chaîne est un code BIC / SWIFT

- **isBoolean(str [, options])**  
  Vérifie si la chaîne représente une valeur booléenne  
  options par défaut : `{ loose: false }`

- **isBtcAddress(str)**  
  Vérifie si la chaîne est une adresse Bitcoin valide

- **isByteLength(str [, options])**  
  Vérifie si la longueur en octets UTF-8 est dans un intervalle  
  options par défaut : `{ min: 0, max: undefined }`

- **isCreditCard(str [, options])**  
  Vérifie si la chaîne est un numéro de carte bancaire valide  
  options : `{ provider?: 'amex' | 'dinersclub' | 'discover' | 'jcb' | 'mastercard' | 'unionpay' | 'visa' }`

- **isCurrency(str [, options])**  
  Vérifie si la chaîne représente un montant monétaire valide  
  (très nombreuses options : symbole, séparateurs, négatifs, décimales, etc.)

- **isDataURI(str)**  
  Vérifie si la chaîne est au format data URI

- **isDate(str [, options])**  
  Vérifie si la chaîne représente une date valide  
  options : `{ format?, strictMode?, delimiters? }`

- **isDecimal(str [, options])**  
  Vérifie si la chaîne représente un nombre décimal  
  options : `{ force_decimal?, decimal_digits?, locale? }`

- **isDivisibleBy(str, number)**  
  Vérifie si le nombre représenté est divisible par un autre nombre

- **isEAN(str)**  
  Vérifie si la chaîne est un code EAN (European Article Number)

- **isEmail(str [, options])**  
  Vérifie si la chaîne est une adresse email valide  
  (très nombreuses options : display name, TLD obligatoire, blacklist hôte, etc.)

- **isEmpty(str [, options])**  
  Vérifie si la chaîne est vide  
  options par défaut : `{ ignore_whitespace: false }`

- **isEthereumAddress(str)**  
  Vérifie si la chaîne est une adresse Ethereum (sans validation checksum)

- **isFloat(str [, options])**  
  Vérifie si la chaîne représente un nombre à virgule  
  options : `{ min?, max?, gt?, lt?, locale? }`

- **isFQDN(str [, options])**  
  Vérifie si la chaîne est un nom de domaine pleinement qualifié  
  options : `{ require_tld, allow_underscores, allow_trailing_dot, allow_wildcard, ... }`

- **isFreightContainerID(str)**  
  Alias de `isISO6346` – Vérifie un identifiant de conteneur ISO 6346

- **isFullWidth(str)**  
  Vérifie si la chaîne contient des caractères pleine largeur (full-width)

- **isHalfWidth(str)**  
  Vérifie si la chaîne contient des caractères demi-largeur (half-width)

- **isHash(str, algorithm)**  
  Vérifie si la chaîne est un hash du type demandé  
  Algorithmes supportés : crc32, md5, sha1, sha256, sha512, etc.

- **isHexadecimal(str)**  
  Vérifie si la chaîne est un nombre hexadécimal

- **isHexColor(str [, options])**  
  Vérifie si la chaîne est une couleur hexadécimale  
  options par défaut : `{ require_hashtag: false }`

- **isHSL(str)**  
  Vérifie si la chaîne est une couleur HSL (format CSS Level 4)

- **isIBAN(str [, options])**  
  Vérifie si la chaîne est un numéro IBAN valide  
  options : `{ whitelist?: string[], blacklist?: string[] }` (codes pays)

- **isIdentityCard(str [, locale])**  
  Vérifie un numéro de carte d’identité nationale  
  locale : `'any'` ou code pays spécifique

- **isIMEI(str [, options])**  
  Vérifie si la chaîne est un numéro IMEI valide  
  options : `{ allow_hyphens?: boolean }`

- **isIn(str, values)**  
  Vérifie si la chaîne fait partie d’un tableau de valeurs autorisées

- **isInt(str [, options])**  
  Vérifie si la chaîne représente un entier  
  options : `{ min?, max?, gt?, lt?, allow_leading_zeroes? }`

- **isIP(str [, options])**  
  Vérifie si la chaîne est une adresse IP (v4 ou v6)  
  options : `{ version?: 4 | 6 | '4' | '6' }`

- **isIPRange(str [, version])**  
  Vérifie si la chaîne est une plage d’adresses IP (notation CIDR)

- **isISBN(str [, options])**  
  Vérifie si la chaîne est un numéro ISBN  
  options : `{ version?: '10' | '13' }`

- **isISIN(str)**  
  Vérifie si la chaîne est un code ISIN (valeurs mobilières)

- **isISO6346(str)**  
  Vérifie un identifiant de conteneur maritime ISO 6346

- **isISO6391(str)**  
  Vérifie un code de langue ISO 639-1

- **isISO8601(str [, options])**  
  Vérifie une date au format ISO 8601  
  options : `{ strict?, strictSeparator? }`

- **isISO15924(str)**  
  Vérifie un code de script ISO 15924

- **isISO31661Alpha2(str)**  
  Vérifie un code pays ISO 3166-1 alpha-2

- **isISO31661Alpha3(str)**  
  Vérifie un code pays ISO 3166-1 alpha-3

- **isISO31661Numeric(str)**  
  Vérifie un code pays ISO 3166-1 numérique

- **isISO4217(str)**  
  Vérifie un code de devise ISO 4217

- **isISRC(str)**  
  Vérifie un code ISRC (enregistrement musical)

- **isISSN(str [, options])**  
  Vérifie un numéro ISSN  
  options : `{ case_sensitive?, require_hyphen? }`

- **isJSON(str [, options])**  
  Vérifie si la chaîne est un JSON valide  
  options : `{ allow_primitives?: boolean }`

- **isJWT(str)**  
  Vérifie si la chaîne est un token JWT valide

- **isLatLong(str [, options])**  
  Vérifie des coordonnées latitude,longitude  
  options : `{ checkDMS?: boolean }`

- **isLength(str [, options])**  
  Vérifie si la longueur de la chaîne est dans un intervalle  
  options : `{ min?, max?, discreteLengths? }`

- **isLicensePlate(str, locale)**  
  Vérifie le format d’une plaque d’immatriculation selon le pays

- **isLocale(str)**  
  Vérifie si la chaîne est un identifiant de locale valide

- **isLowercase(str)**  
  Vérifie que la chaîne est entièrement en minuscules

- **isLuhnNumber(str)**  
  Vérifie que la chaîne passe l’algorithme de Luhn

- **isMACAddress(str [, options])**  
  Vérifie si la chaîne est une adresse MAC  
  options : `{ no_separators?, eui?: 48 | 64 }`

- **isMagnetURI(str)**  
  Vérifie si la chaîne est un lien magnet valide

- **isMailtoURI(str [, options])**  
  Vérifie si la chaîne est un lien mailto valide

- **isMD5(str)**  
  Vérifie si la chaîne est un hash MD5

- **isMimeType(str)**  
  Vérifie si la chaîne est un type MIME valide

- **isMobilePhone(str [, locale [, options]])**  
  Vérifie si la chaîne est un numéro de téléphone mobile  
  locale : `'any'` ou liste de locales / tableau  
  options : `{ strictMode?: boolean }`

- **isMongoId(str)**  
  Vérifie si la chaîne est un ObjectId MongoDB valide

- **isMultibyte(str)**  
  Vérifie si la chaîne contient au moins un caractère multibyte

- **isNumeric(str [, options])**  
  Vérifie que la chaîne ne contient que des chiffres  
  options : `{ no_symbols?, locale? }`

- **isOctal(str)**  
  Vérifie si la chaîne est un nombre octal valide

- **isPassportNumber(str, countryCode)**  
  Vérifie un numéro de passeport selon le pays

- **isPort(str)**  
  Vérifie si la chaîne est un numéro de port valide (0-65535)

- **isPostalCode(str, locale)**  
  Vérifie un code postal selon le pays  
  locale : `'any'` ou code pays

- **isRFC3339(str)**  
  Vérifie une date au format RFC 3339

- **isRgbColor(str [, options])**  
  Vérifie une couleur rgb ou rgba  
  options : `{ includePercentValues?, allowSpaces? }`

- **isSemVer(str)**  
  Vérifie une version Semantic Versioning (SemVer)

- **isSurrogatePair(str)**  
  Vérifie si la chaîne contient des paires de substitution (surrogate pairs)

- **isUppercase(str)**  
  Vérifie que la chaîne est entièrement en majuscules

- **isSlug(str)**  
  Vérifie si la chaîne est un slug valide

- **isStrongPassword(str [, options])**  
  Vérifie la robustesse d’un mot de passe  
  (options incluent longueur minimale, symboles, score, etc.)

- **isTime(str [, options])**  
  Vérifie si la chaîne représente une heure valide  
  options : `{ hourFormat?, mode? }`

- **isTaxID(str, locale)**  
  Vérifie un numéro d’identification fiscale (TIN) selon le pays

- **isURL(str [, options])**  
  Vérifie si la chaîne est une URL valide  
  (très nombreuses options : protocoles, TLD obligatoire, auth interdite, etc.)

- **isULID(str)**  
  Vérifie si la chaîne est un ULID valide

- **isUUID(str [, version])**  
  Vérifie un UUID (versions 1 à 8, nil, max, all, loose)

- **isVariableWidth(str)**  
  Vérifie si la chaîne mélange caractères full-width et half-width

- **isVAT(str, countryCode)**  
  Vérifie un numéro de TVA selon le pays (ISO 3166-1 alpha-2)

- **isWhitelisted(str, chars)**  
  Vérifie que la chaîne ne contient que des caractères présents dans `chars`

- **matches(str, pattern [, modifiers])**  
  Vérifie si la chaîne correspond à un motif (RegExp ou chaîne + flags)