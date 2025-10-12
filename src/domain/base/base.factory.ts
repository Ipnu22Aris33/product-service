import { BaseEntity, BaseEntityProps } from '@domain/base/base.entity';
import { UidVO } from '@domain/value-objects';

/**
 * BaseFactory is an abstract class used as a foundation for creating instances of domain entities.
 *
 * @template T - Defines a generic structure for the factory, entity, and props properties.
 *
 * Structure T must have:
 * - `factoryProps`: Properties required to instantiate a domain layer entity.
 * - `entityProps`: A combination of `BaseEntityProps` and `factoryProps`.
 * - `entity`: Represents an entity type derived from `BaseEntity`.
 */
export abstract class BaseFactory<
  T extends {
    factoryProps: object;
    entityProps: BaseEntityProps & T['factoryProps'];
    entity: BaseEntity<T['entityProps']>;
  },
> {
  /**
   * The entity class that will be instantiated.
   * Must be implemented by subclasses to specify a concrete entity.
   */
  protected abstract entityClass: {
    create(props: T['entityProps']): T['entity'];
  };

  /**
   * Returns default values for the entity properties.
   * Can be overridden by subclasses if some properties have default values.
   *
   * @returns Partial<T['entityProps']> - Default values for the factory properties.
   */
  protected getDefaults(): Partial<T['entityProps']> {
    return {};
  }

  /**
   * Creates a new instance of a domain entity.
   *
   * @param param0 - Parameters containing:
   *  - `domainProps`: Domain properties required to create the entity.
   *  - `actor` (optional): UID of the actor creating the entity.
   *
   * @returns {T['entity']} - A new instance of the entity specified by `entityClass`.
   */
  create(p: { props: T['factoryProps']; actor?: UidVO }): T['entity'] {
    const now = new Date();

    // Merge default values and provided domain properties
    const mergedDomainProps = { ...this.getDefaults(), ...p.props };

    // Create full properties for the entity
    const fullProps: T['entityProps'] = {
      ...mergedDomainProps,
      uid: UidVO.generate(),
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      createdBy: p.actor,
      updatedBy: p.actor,
      deletedBy: null,
    };

    // Return the entity instance
    return this.entityClass.create(fullProps);
  }
}
