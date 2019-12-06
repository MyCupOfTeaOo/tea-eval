/* eslint-disable no-new-func */

export function safeFunc(expr: string, args: any[] = []) {
  return new Function(...args, expr);
}

export function createFunc(
  expr: string,
  args: any[] = [],
  ctx: { [key: string]: any } = {}
): Function {
  return safeFunc(expr, args).bind(ctx);
}
