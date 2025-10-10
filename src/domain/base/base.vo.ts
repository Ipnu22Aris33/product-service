/**
 * Kelas dasar untuk semua Value Object di domain.
 * 
 * Value Object (VO) merepresentasikan konsep yang memiliki **nilai**, 
 * bukan identitas. Dua VO dianggap sama jika nilai mereka sama.
 * 
 * Contoh: `EmailVO`, `UidVO`, `PriceVO`, dll.
 * 
 * @template TValue - Tipe data nilai yang dikandung oleh Value Object.
 */
export abstract class BaseVO<TValue> {
  /**
   * Nilai yang diwakili oleh Value Object.
   * Bersifat immutable (tidak dapat diubah setelah dibuat).
   */
  protected readonly value: TValue;

  /**
   * Membuat instance baru dari Value Object.
   * 
   * @param value - Nilai murni yang akan dibungkus oleh Value Object.
   */
  protected constructor(value: TValue) {
    this.value = value;
  }

  /**
   * Mengambil nilai mentah dari Value Object.
   * 
   * @returns {TValue} - Nilai asli yang dibungkus oleh Value Object.
   * 
   * @example
   * ```ts
   * const uid = UidVO.create('abc-123');
   * console.log(uid.getValue()); // 'abc-123'
   * ```
   */
  getValue(): TValue {
    return this.value;
  }

  /**
   * Membandingkan dua Value Object berdasarkan nilainya.
   * Dua VO dianggap sama jika nilai internal (`value`) mereka identik.
   * 
   * @param other - Value Object lain untuk dibandingkan.
   * @returns {boolean} - `true` jika nilai sama, `false` jika berbeda.
   * 
   * @example
   * ```ts
   * const id1 = UidVO.create('abc');
   * const id2 = UidVO.create('abc');
   * console.log(id1.equals(id2)); // true
   * ```
   */
  equals(other: BaseVO<TValue>): boolean {
    if (!other) return false;
    return this.value === other.getValue();
  }
}
