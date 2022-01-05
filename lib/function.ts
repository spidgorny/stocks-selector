/// https://gist.github.com/sachinKumarGautam/6f6ce23fb70eec5d03e16b504b63ae2d

export function debounce(fn: Function, time = 300) {
  let timeoutId: NodeJS.Timeout | null;
  return wrapper;

  function wrapper(...args: any) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn(...args);
    }, time);
  }
}
