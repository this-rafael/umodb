import { InjectionToken, Provider, Type } from '@nestjs/common'

export function genUseValue<T>(subClass: T): { useValue: T } {
  return { useValue: subClass }
}

export function getMockedProvider<T>(
  provide: InjectionToken,
  subClass: T,
): Provider {
  return {
    provide,
    ...genUseValue(subClass),
  }
}

export function getProvider<T, K extends T>(
  abstraction: Type<T> | InjectionToken,
  s: Type<K>,
): Provider<T> {
  return {
    provide: abstraction,
    useClass: s,
  }
}
