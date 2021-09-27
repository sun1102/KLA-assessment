// ngDebounce() decorator use for add debounce time in calling that method

export function ngDebounce(debounceTime: number): any {
    return function(target: Function, key: string, descriptor: any) {
      const originalMethod = descriptor.value;
      let timeoutRef: any = null;
      descriptor.value =  function (...args: any[]) {
        clearTimeout(timeoutRef);
        timeoutRef = setTimeout(() => {
            originalMethod.apply(this, args);
        }, debounceTime);
      };

      return descriptor;
    };
}
