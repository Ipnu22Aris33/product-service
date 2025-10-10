import { UidVO } from '@domain/value-objects';

/**
 * Properti dasar yang wajib dimiliki oleh setiap entitas domain.
 * 
 * Berisi informasi identitas (`uid`), waktu pembuatan/pembaruan/penghapusan,
 * serta informasi aktor yang melakukan aksi tersebut.
 */
export interface BaseEntityProps {
  uid: UidVO;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy?: UidVO | null;
  updatedBy?: UidVO | null;
  deletedBy?: UidVO | null;
}

/**
 * Kelas dasar untuk semua entitas domain.
 * 
 * `BaseEntity` menyediakan:
 * - Properti meta seperti UID dan timestamps.
 * - Metode untuk memperbarui status (`touch`, `softDelete`, `restore`).
 * - Getter untuk mengakses nilai properti internal secara aman.
 * 
 * @template TProps - Struktur properti yang mewarisi dari `BaseEntityProps`.
 */
export abstract class BaseEntity<TProps extends BaseEntityProps> {
  /**
   * Properti internal entitas.
   * Hanya dapat diubah melalui metode yang disediakan oleh kelas.
   */
  protected props: TProps;

  /**
   * Membuat instance entitas baru.
   * 
   * @param props - Properti lengkap dari entitas, termasuk metadata.
   */
  constructor(props: TProps) {
    this.props = props;
  }

  // ---------- MUTATORS ----------

  /**
   * Memperbarui nilai `updatedAt` menjadi waktu saat ini
   * dan (opsional) menetapkan `updatedBy` berdasarkan aktor yang melakukan perubahan.
   * 
   * @param actor - Aktor yang memperbarui entitas (opsional).
   */
  touch(actor?: UidVO) {
    const now = new Date()
    if (this.props.updatedAt && this.props.updatedAt.getTime() === now.getTime()) return;
    this.props.updatedAt = now;
    if (actor) this.props.updatedBy = actor;
    console.log('touch triggered')
  }

  /**
   * Melakukan soft delete pada entitas.
   * Artinya entitas tidak dihapus permanen, hanya diberi tanda waktu dan aktor penghapus.
   * 
   * @param actor - Aktor yang menghapus entitas (opsional).
   */
  softDelete(actor?: UidVO) {
    this.props.deletedAt = new Date();
    if (actor) this.props.deletedBy = actor;
    this.touch(actor);
  }

  /**
   * Mengembalikan entitas yang telah di-soft delete menjadi aktif kembali.
   * Menghapus nilai `deletedAt` dan `deletedBy`.
   * 
   * @param actor - Aktor yang melakukan pemulihan (opsional).
   */
  restore(actor?: UidVO) {
    this.props.deletedAt = null;
    this.props.deletedBy = null;
    this.touch(actor);
  }

  // ---------- GETTERS ----------

  /**
   * Mengembalikan seluruh properti entitas.
   * 
   * @returns {TProps} - Properti entitas.
   */
  getProps(): TProps {
    return this.props;
  }

  /**
   * Mendapatkan nilai UID entitas.
   * 
   * @returns {string} - Nilai UID.
   */
  getUidValue(): string {
    return this.props.uid.getValue();
  }

  /**
   * Mendapatkan UID aktor yang membuat entitas.
   * 
   * @returns {string | null} - UID pembuat atau `null` jika tidak ada.
   */
  getCreatedByValue(): string | null {
    return this.props.createdBy?.getValue() || null;
  }

  /**
   * Mendapatkan UID aktor yang terakhir memperbarui entitas.
   * 
   * @returns {string | null} - UID pembaru atau `null` jika tidak ada.
   */
  getUpdatedByValue(): string | null {
    return this.props.updatedBy?.getValue() || null;
  }

  /**
   * Mendapatkan UID aktor yang menghapus entitas.
   * 
   * @returns {string | null} - UID penghapus atau `null` jika tidak ada.
   */
  getDeletedByValue(): string | null {
    return this.props.deletedBy?.getValue() || null;
  }

  /**
   * Mendapatkan tanggal pembuatan entitas.
   * 
   * @returns {Date} - Tanggal pembuatan.
   */
  getCreatedAtValue(): Date {
    return this.props.createdAt;
  }

  /**
   * Mendapatkan tanggal terakhir entitas diperbarui.
   * 
   * @returns {Date} - Tanggal pembaruan.
   */
  getUpdatedAtValue(): Date {
    return this.props.updatedAt;
  }

  /**
   * Mendapatkan tanggal penghapusan (jika sudah di-soft delete).
   * 
   * @returns {Date | null | undefined} - Tanggal penghapusan atau `null` jika belum dihapus.
   */
  getDeletedAtValue(): Date | null  {
    return this.props.deletedAt;
  }
}
