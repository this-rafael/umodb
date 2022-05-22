import { Injectable, InjectionToken, Provider, Type } from '@nestjs/common'

export const Decorators = {
  Inject: Injectable,
}

export const Generate = {
  useValue<T>(subClass: T): { useValue: T } {
    return {
      useValue: subClass,
    }
  },

  mockedProvider<T>(provide: InjectionToken, subClass: T): Provider {
    return {
      provide,
      ...Generate.useValue(subClass),
    }
  },

  provider<T, K extends T>(
    abstraction: Type<T> | InjectionToken,
    s: Type<K>,
  ): Provider<T> {
    return {
      provide: abstraction,
      useClass: s,
    }
  },
}

export type Matchers<L> = {
  [key: string | symbol]: L
}

@Decorators.Inject()
export class StrategyAnalyzer<L> {
  constructor(private readonly matchers: Matchers<L>) {}

  analyze(context: string | symbol): L {
    const matcher = this.matchers[context]
    if (matcher) {
      return matcher
    }
    throw new Error('Strategy not found')
  }
}
