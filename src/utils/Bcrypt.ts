import * as bcrypt from 'bcrypt';

export function encodePassword(rawPassword: string): string {
  // ?? genSaltSync() fonksiyonu bcrypt algoritması için kullanılan rastgele tuz (salt) oluşturur.
  // ?? Bu tuz her şifre için benzersiz bir değer oluşturur.
  // ?? Bu sayede aynı şifreye sahip kullanıcılar için farklı hash değerleri oluşturulur.
  // ?? Benzersiz şifreler ve güvenliği artırmak için kullanılıyor.
  const SALT = bcrypt.genSaltSync();

  // ?? hashSync() methodundaki Sync eki bu işlevlerin senkron olarak çalışmasını sağlar.
  // ?? async ve await kullanmak yerine 'Sync' eki olan method kullanılabilir.
  return bcrypt.hashSync(rawPassword, SALT);
}

// ?? Kullanıcının girmiş olduğu şifre ile veri tabanında hash olarak tutulan şifre karşılaştırılıyor.
export function comparePasswords(
  rawPassword: string,
  hashPassword: string,
): boolean {
  return bcrypt.compareSync(rawPassword, hashPassword);
}
