declare module '*.avif' {
  const value: string;
  export = value;
}

declare module '*?raw' {
  const value: string;
  export = value;
}

declare module '*?arraybuffer' {
  const value: ArrayBuffer;
  export = value;
}
